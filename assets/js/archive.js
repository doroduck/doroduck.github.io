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

    // 可选的全文索引（由 Jekyll 生成 search.json）
    var indexByUrl = Object.create(null);

    function normalize(s) {
      return (s || '').toString().toLowerCase().trim();
    }

    function splitTerms(q) {
      var s = normalize(q);
      if (!s) return [];
      // 支持多关键词：空格分隔（中文没空格则就是一个词）
      return s.split(/\s+/).filter(Boolean);
    }

    function countOccurrences(haystack, needle) {
      if (!haystack || !needle) return 0;
      var count = 0;
      var idx = 0;
      while (true) {
        idx = haystack.indexOf(needle, idx);
        if (idx === -1) break;
        count += 1;
        idx += needle.length;
      }
      return count;
    }

    function scoreDoc(terms, title, content) {
      var t = normalize(title);
      var c = normalize(content);
      var score = 0;

      for (var i = 0; i < terms.length; i++) {
        var term = terms[i];

        var inTitle = t.indexOf(term) !== -1;
        var inContent = c.indexOf(term) !== -1;
        if (!inTitle && !inContent) continue;

        // 标题命中权重更高
        if (inTitle) {
          score += 200;
          if (t.indexOf(term) === 0) score += 80; // 前缀命中加分
          score += countOccurrences(t, term) * 40;
        }

        if (inContent) {
          score += 60;
          score += countOccurrences(c, term) * 10;
        }
      }

      // 轻微偏好短标题（更像精确匹配）
      if (t && t.length) score += Math.max(0, 20 - Math.min(20, t.length / 6));
      return score;
    }

    function sortItemsInPlace(terms) {
      if (!terms || !terms.length) return;

      // 按每个月份的 <ul> 内进行排序，保持“按月分组”结构
      var uls = Array.prototype.slice.call(document.querySelectorAll('.archive-list'));
      uls.forEach(function (ul) {
        var children = Array.prototype.slice.call(ul.querySelectorAll('.archive-item'));
        if (!children.length) return;

        children.sort(function (a, b) {
          var aHidden = a.style.display === 'none';
          var bHidden = b.style.display === 'none';
          if (aHidden !== bHidden) return aHidden ? 1 : -1; // 可见的排在前

          if (aHidden && bHidden) return 0;

          var aDoc = getDoc(a);
          var bDoc = getDoc(b);
          var aScore = scoreDoc(terms, aDoc.title, aDoc.content);
          var bScore = scoreDoc(terms, bDoc.title, bDoc.content);

          if (aScore !== bScore) return bScore - aScore;

          // 分数相同按日期新到旧
          var ad = (a.getAttribute('data-date') || '').toString();
          var bd = (b.getAttribute('data-date') || '').toString();
          if (ad === bd) return 0;
          return ad < bd ? 1 : -1;
        });

        children.forEach(function (li) {
          ul.appendChild(li);
        });
      });
    }

    function getDoc(li) {
      var url = li.getAttribute('data-url');
      if (url && indexByUrl[url]) return indexByUrl[url];
      // 回退：至少保证标题可搜
      return {
        title: li.getAttribute('data-title') || '',
        content: ''
      };
    }

    function applyFilter() {
      var qRaw = input.value;
      var terms = splitTerms(qRaw);
      var m = normalize(monthSelect.value);
      var shown = 0;

      items.forEach(function (li) {
        var doc = getDoc(li);
        var title = normalize(doc.title);
        var content = normalize(doc.content);
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
        results.textContent = '当前显示 ' + shown + ' 篇文章' + (terms.length ? '（按相关性排序）' : '');
      } else {
        results.textContent = '';
      }

      if (terms.length) {
        sortItemsInPlace(terms);
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

    function loadIndexThenInit() {
      var url = (window.__SEARCH_INDEX_URL__ || '/search.json').toString();
      // 如果是相对路径，转成绝对 URL（避免 baseurl/路径问题）
      var absUrl = url.indexOf('http') === 0 ? url : new URL(url, window.location.origin).toString();

      fetch(absUrl, { cache: 'no-store' })
        .then(function (r) {
          if (!r.ok) throw new Error('index http ' + r.status);
          return r.json();
        })
        .then(function (arr) {
          if (!Array.isArray(arr)) return;
          arr.forEach(function (p) {
            if (!p || !p.url) return;
            indexByUrl[p.url] = {
              title: p.title || '',
              content: p.content || ''
            };
          });
        })
        .catch(function () {
          // 索引失败就回退到标题检索，不阻断页面
        })
        .finally(function () {
          applyFilter();
        });
    }

    loadIndexThenInit();
  });
})();
