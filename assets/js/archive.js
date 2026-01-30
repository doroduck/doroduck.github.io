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

    function applyFilter() {
      var q = normalize(input.value);
      var m = normalize(monthSelect.value);
      var shown = 0;

      items.forEach(function (li) {
        var title = normalize(li.getAttribute('data-title'));
        var month = normalize(li.getAttribute('data-month'));
        var ok = true;

        if (m && month !== m) ok = false;
        if (q && title.indexOf(q) === -1) ok = false;

        li.style.display = ok ? '' : 'none';
        if (ok) shown += 1;
      });

      if (q || m) {
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
