// Minnehaha Kendo Dojo — global behavior (nav toggle, etc.)

(function () {
  function initNavToggle() {
    var btn = document.querySelector('.nav-toggle');
    var links = document.querySelector('.nav-links');
    if (!btn || !links) return;

    btn.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      btn.textContent = open ? '✕' : '☰';
    });

    // Close menu when a link is clicked (for in-page anchors or same-site nav)
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (window.innerWidth <= 768) {
          links.classList.remove('open');
          btn.setAttribute('aria-expanded', 'false');
          btn.textContent = '☰';
        }
      });
    });
  }

  function setFooterYear() {
    var el = document.getElementById('current-year');
    if (el) el.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initNavToggle();
      setFooterYear();
    });
  } else {
    initNavToggle();
    setFooterYear();
  }
})();
