(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function () {
    var input = document.getElementById('archiveSearch');
    var monthSelect = document.getElementById('archiveMonth');
    var items = Array.prototype.slice.call(document.querySelectorAll('.archive-item'));
    var results = document.getElementById('archiveResults');

    if (!input || !monthSelect || !items.length) return;

    function normalize(s) {
      return (s || '').toString().toLowerCase().trim();
    }

    function splitTerms(q) {
      var s = normalize(q);
      if (!s) return [];
      // 支持多关键词：空格分隔（中文没空格则就是一个词）
      return s.split(/\s+/).filter(Boolean);
    }

    function applyFilter() {
      var qRaw = input.value;
      var terms = splitTerms(qRaw);
      var m = normalize(monthSelect.value);
      var shown = 0;

      items.forEach(function (li) {
        var title = normalize(li.getAttribute('data-title'));
        var content = normalize(li.getAttribute('data-content'));
        var month = normalize(li.getAttribute('data-month'));
        var ok = true;

        if (m && month !== m) ok = false;

        if (terms.length) {
          // 所有关键词都要命中（命中标题或正文均可）
          for (var i = 0; i < terms.length; i++) {
            var t = terms[i];
            if (title.indexOf(t) === -1 && content.indexOf(t) === -1) {
              ok = false;
              break;
            }
          }
        }

        li.style.display = ok ? '' : 'none';
        if (ok) shown += 1;
      });

      if (terms.length || m) {
        results.textContent = '当前显示 ' + shown + ' 篇文章';
      } else {
        results.textContent = '';
      }

      // 同时隐藏空的月份分组
      Array.prototype.slice
        .call(document.querySelectorAll('.archive-month-title'))
        .forEach(function (h2) {
          var ul = h2.nextElementSibling;
          if (!ul || ul.tagName.toLowerCase() !== 'ul') return;
          var anyVisible = Array.prototype.slice
            .call(ul.querySelectorAll('.archive-item'))
            .some(function (li) {
              return li.style.display !== 'none';
            });
          h2.style.display = anyVisible ? '' : 'none';
          ul.style.display = anyVisible ? '' : 'none';
        });
    }

    input.addEventListener('input', applyFilter);
    monthSelect.addEventListener('change', applyFilter);

    applyFilter();
  });
})();
