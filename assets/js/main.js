/* =============================================================================
 *  逻辑 · main.js
 *  负责：读取 content.js → 渲染页面 → 中英切换 / 深浅色 / 滚动动效。
 *  正常情况下你不需要改这个文件，改 content.js 就够了。
 * ========================================================================== */
(function () {
  "use strict";

  var DATA = window.PORTFOLIO;
  if (!DATA) { console.error("找不到 content.js 中的 PORTFOLIO 数据"); return; }

  /* —— 界面固定文案（中英），与作品内容分开，避免污染 content.js —— */
  var UI = {
    nav: {
      work:    { zh: "作品", en: "Work" },
      about:   { zh: "关于", en: "About" },
      resume:  { zh: "简历", en: "Résumé" },
      contact: { zh: "联系", en: "Contact" },
    },
    hero: { cue: { zh: "向下浏览", en: "Scroll" } },
    project: {
      problem:  { zh: "问题", en: "Problem" },
      decision: { zh: "决策", en: "Decision" },
      result:   { zh: "结果", en: "Result" },
    },
  };

  var langs = (DATA.site && DATA.site.languages) || ["zh"];
  var lang = pickInitialLang();

  /* ---------- 工具 ---------- */
  function pickInitialLang() {
    var saved = safeGet("lang");
    if (saved && langs.indexOf(saved) !== -1) return saved;
    var def = (DATA.site && DATA.site.defaultLang) || langs[0];
    return langs.indexOf(def) !== -1 ? def : langs[0];
  }
  function safeGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function safeSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  // 取出多语言字段当前语言的值；支持字符串或 {zh,en}
  function t(field) {
    if (field == null) return "";
    if (typeof field === "string") return field;
    return field[lang] != null ? field[lang] : (field.zh != null ? field.zh : "");
  }

  // 按点路径取值，先查 DATA 再查 UI
  function resolve(path) {
    return dig(DATA, path) || dig(UI, path);
  }
  function dig(obj, path) {
    var parts = path.split(".");
    var cur = obj;
    for (var i = 0; i < parts.length; i++) {
      if (cur == null) return null;
      cur = cur[parts[i]];
    }
    return cur;
  }

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- 渲染：data-bind 文本 ---------- */
  function renderBindings() {
    var nodes = document.querySelectorAll("[data-bind]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-bind");
      nodes[i].textContent = t(resolve(key));
    }
  }

  /* ---------- 渲染：精选作品 ---------- */
  function renderProjects() {
    var wrap = document.getElementById("workList");
    if (!wrap) return;
    wrap.innerHTML = "";
    (DATA.projects || []).forEach(function (p) {
      var card = el("article", "project");
      card.setAttribute("data-reveal", "");

      // 媒体
      var media = el("div", "project__media");
      if (p.cover) {
        var img = el("img");
        img.src = p.cover;
        img.alt = t(p.title);
        img.loading = "lazy";
        media.appendChild(img);
      } else {
        var ph = el("div", "project__placeholder", t(p.title) || "—");
        media.appendChild(ph);
      }

      // 文字
      var body = el("div", "project__info");
      var meta = el("div", "project__meta");
      if (p.year) meta.appendChild(el("span", null, p.year));
      if (p.year && p.tag) meta.appendChild(el("span", "dot"));
      if (p.tag) meta.appendChild(el("span", null, t(p.tag)));
      body.appendChild(meta);

      body.appendChild(el("h3", "project__title", t(p.title)));
      if (p.role) body.appendChild(el("p", "project__role", t(p.role)));

      [["problem", p.problem], ["decision", p.decision], ["result", p.result]]
        .forEach(function (pair) {
          if (!pair[1]) return;
          var block = el("div", "project__block");
          block.appendChild(el("span", "project__label", t(UI.project[pair[0]])));
          block.appendChild(el("p", "project__text", t(pair[1])));
          body.appendChild(block);
        });

      card.appendChild(media);
      card.appendChild(body);
      wrap.appendChild(card);
    });
  }

  /* ---------- 渲染：关于 ---------- */
  function renderAbout() {
    var facts = document.getElementById("aboutFacts");
    if (facts) {
      facts.innerHTML = "";
      var dl = el("dl", "about__facts-list");
      (DATA.about.facts || []).forEach(function (f) {
        var item = el("div", "about__fact");
        item.appendChild(el("dt", null, t(f.k)));
        item.appendChild(el("dd", null, t(f.v)));
        facts.appendChild(item);
      });
    }
    var body = document.getElementById("aboutBody");
    if (body) {
      body.innerHTML = "";
      var paras = (DATA.about.paragraphs && DATA.about.paragraphs[lang]) ||
                  (DATA.about.paragraphs && DATA.about.paragraphs.zh) || [];
      paras.forEach(function (txt) { body.appendChild(el("p", null, txt)); });
    }
  }

  /* ---------- 渲染：工作方式 ---------- */
  function renderApproach() {
    var wrap = document.getElementById("approachList");
    if (!wrap) return;
    wrap.innerHTML = "";
    (DATA.approach.items || []).forEach(function (it, idx) {
      var item = el("div", "approach__item");
      item.setAttribute("data-reveal", "");
      var n = (idx + 1) < 10 ? "0" + (idx + 1) : "" + (idx + 1);
      item.appendChild(el("span", "approach__num", n));
      item.appendChild(el("h3", null, t(it.title)));
      item.appendChild(el("p", null, t(it.desc)));
      wrap.appendChild(item);
    });
  }

  /* ---------- 渲染：联系 ---------- */
  function renderContact() {
    var email = document.getElementById("contactEmail");
    if (email && DATA.contact.email) {
      email.textContent = DATA.contact.email;
      email.href = "mailto:" + DATA.contact.email;
    }
    var links = document.getElementById("contactLinks");
    if (links) {
      links.innerHTML = "";
      (DATA.contact.links || []).forEach(function (l) {
        if (!l.label || !l.url || l.url === "#") return;
        var a = el("a", null, l.label);
        a.href = l.url; a.target = "_blank"; a.rel = "noopener";
        links.appendChild(a);
      });
    }
  }

  /* ---------- 标题 / 文档语言 ---------- */
  function applyDocMeta() {
    document.documentElement.lang = (lang === "zh") ? "zh-CN" : "en";
    var title = DATA.site && DATA.site.title;
    if (title) document.title = t(title);
  }

  /* ---------- 整页渲染 ---------- */
  function renderAll() {
    applyDocMeta();
    renderBindings();
    renderProjects();
    renderAbout();
    renderApproach();
    renderContact();
    observeReveal();
    var lt = document.getElementById("langToggle");
    if (lt) lt.textContent = nextLangLabel();
  }

  /* ---------- 语言切换 ---------- */
  function nextLangLabel() {
    var idx = langs.indexOf(lang);
    var next = langs[(idx + 1) % langs.length];
    return next.toUpperCase();
  }
  function setupLangToggle() {
    var btn = document.getElementById("langToggle");
    if (!btn) return;
    if (langs.length < 2) { btn.style.display = "none"; return; }
    btn.addEventListener("click", function () {
      var idx = langs.indexOf(lang);
      lang = langs[(idx + 1) % langs.length];
      safeSet("lang", lang);
      renderAll();
    });
  }

  /* ---------- 深浅色切换 ---------- */
  function setupThemeToggle() {
    var btn = document.getElementById("themeToggle");
    if (!btn) return;
    var saved = safeGet("theme");
    if (saved === "light" || saved === "dark") {
      document.documentElement.setAttribute("data-theme", saved);
    }
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      var sysDark = window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      var nowDark = cur ? (cur === "dark") : sysDark;
      var next = nowDark ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      safeSet("theme", next);
    });
  }

  /* ---------- 滚动渐显 ---------- */
  var io = null;
  function observeReveal() {
    var items = document.querySelectorAll(".reveal, [data-reveal]");
    if (!("IntersectionObserver" in window)) {
      // 老浏览器：直接显示，保证内容可见（兼容性兜底）
      for (var j = 0; j < items.length; j++) items[j].classList.add("is-in");
      return;
    }
    if (!io) {
      io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    }
    for (var i = 0; i < items.length; i++) {
      if (!items[i].classList.contains("is-in")) io.observe(items[i]);
    }
  }

  /* ---------- 滚动进度条 + 导航阴影 ---------- */
  function setupScroll() {
    var bar = document.getElementById("scrollProgress");
    var nav = document.getElementById("nav");
    var ticking = false;
    function update() {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      var p = max > 0 ? (h.scrollTop || document.body.scrollTop) / max : 0;
      if (bar) bar.style.width = (p * 100).toFixed(2) + "%";
      if (nav) nav.classList.toggle("is-scrolled", (h.scrollTop || 0) > 8);
      ticking = false;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }

  /* ---------- 启动 ---------- */
  function init() {
    renderAll();
    setupLangToggle();
    setupThemeToggle();
    setupScroll();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
