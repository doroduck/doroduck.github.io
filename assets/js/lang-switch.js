(function () {
  function ready(fn) {
    if (document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  function sameOrigin(url) {
    try {
      var u = new URL(url, window.location.origin);
      return u.origin === window.location.origin;
    } catch (e) {
      return false;
    }
  }

  function toPath(url) {
    try {
      var u = new URL(url, window.location.origin);
      return u.pathname;
    } catch (e) {
      return url;
    }
  }

  function swapLang(path, targetLang) {
    if (!path) return path;
    var p = path;
    if (targetLang === 'ja') {
      if (p.indexOf('/ja/') === 0) return p;
      if (p === '/') return '/ja/';
      return '/ja' + p;
    }

    // zh
    if (p.indexOf('/ja/') === 0) {
      var out = p.replace(/^\/ja\//, '/');
      return out || '/';
    }
    if (p === '/ja') return '/';
    return p;
  }

  function buildSwitcher(cfg) {
    var wrap = document.createElement('span');
    wrap.className = 'lang-switch';

    var zh = document.createElement('a');
    zh.href = cfg.zh || '/';
    zh.textContent = '中';

    var sep = document.createElement('span');
    sep.className = 'lang-sep';
    sep.textContent = '｜';

    var ja = document.createElement('a');
    ja.href = cfg.ja || '/ja/';
    ja.textContent = '日';

    if (cfg.current === 'ja') {
      ja.setAttribute('aria-current', 'page');
    } else {
      zh.setAttribute('aria-current', 'page');
    }

    wrap.appendChild(zh);
    wrap.appendChild(sep);
    wrap.appendChild(ja);
    return wrap;
  }

  ready(function () {
    var cfg = window.__LANG__ || { current: 'zh', zh: '/', ja: '/ja/' };

    // 1) 插入“中｜日”切换器
    var nav = document.querySelector('.site-nav');
    var target = nav || document.querySelector('.site-header .wrapper') || document.querySelector('.site-header') || document.body;
    if (target) target.appendChild(buildSwitcher(cfg));

    // 2) 自动改写导航链接（让日文页面的导航跳到 /ja/...）
    var targetLang = cfg.current === 'ja' ? 'ja' : 'zh';
    var links = Array.prototype.slice.call(document.querySelectorAll('.site-nav a'));

    links.forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      if (!sameOrigin(href) && href.indexOf('/') !== 0) return;

      var path = toPath(href);
      var newPath = swapLang(path, targetLang);

      // 保留原始 href 的 origin（如果是绝对链接）
      if (href.indexOf('http') === 0) {
        var u = new URL(href);
        u.pathname = newPath;
        a.setAttribute('href', u.toString());
      } else {
        a.setAttribute('href', newPath);
      }
    });
  });
})();
