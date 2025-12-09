// Overlay menu: self-contained and merge-safe
(function () {
  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function listen(selector, type, handler) {
    document.addEventListener(type, function (e) {
      const t = e.target.closest(selector);
      if (t) { handler(e, t); }
    });
  }

  function ensureStyles() {
    if (!qs('link[href$="assets/css/mobile-menu.css"], link[href$="/mobile-menu.css"], link[href*="mobile-menu.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'assets/css/mobile-menu.css';
      document.head.appendChild(link);
    }
  }

  function ensureMenuButton() {
    if (!qs('.menu-svg, .hamburger-svg')) {
      const btn = document.createElement('img');
      btn.src = 'assets/images/shared/mobile/menu.svg';
      btn.alt = '';
      btn.className = 'menu-svg';
      // Minimal inline placement to avoid page layout changes
      btn.style.position = 'fixed';
      btn.style.top = '32px';
      btn.style.right = '24px';
      btn.style.width = '28px';
      btn.style.height = '17px';
      btn.style.cursor = 'pointer';
      btn.style.zIndex = '1000002';
      document.body.appendChild(btn);
    }
  }

  function openMenuOverlay() {
    if (qs('.mobile-overlay')) return;
    ensureStyles();

    // Hide any visible menu buttons while overlay is open
    const menuButtons = Array.from(document.querySelectorAll('.menu-svg, .hamburger-svg'));
    menuButtons.forEach((btn) => {
      if (btn.dataset.prevDisplay === undefined) {
        btn.dataset.prevDisplay = btn.style.display || '';
      }
      btn.style.display = 'none';
    });
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    const panel = document.createElement('div');
    panel.className = 'mobile-overlay-panel';
    panel.innerHTML = [
      '<div class="menu-top-line-img" aria-hidden="true"></div>',
      '<nav class="mobile-menu-nav" aria-label="Main menu">',
      '  <ul class="menu-list">',
      '    <li><a href="pricing.html" class="menu-link">Pricing</a></li>',
      '    <li><a href="about.html" class="menu-link">About</a></li>',
      '    <li><a href="contact.html" class="menu-link">Contact</a></li>',
      '  </ul>',
      '</nav>',
      '<div class="menu-cta-wrap"><a href="contact.html" class="cta-button">Schedule a Demo</a></div>'
    ].join('');

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Close button (dedicated class to avoid header CSS overrides)
    const closer = document.createElement('button');
    closer.className = 'mobile-overlay-close';
    const img = document.createElement('img');
    img.src = 'assets/images/shared/mobile/close.svg';
    img.alt = 'Close';
    // Text fallback if SVG fails
    img.addEventListener('error', () => {
      let xText = closer.querySelector('.vis-x');
      if (!xText) {
        xText = document.createElement('span');
        xText.className = 'vis-x';
        xText.textContent = '×';
        closer.appendChild(xText);
      }
    });
    closer.appendChild(img);
    panel.appendChild(closer);

    // Slide in
    requestAnimationFrame(() => panel.classList.add('open'));

    function cleanup() {
      try { overlay.remove(); } catch(_) {}
      // Restore any hidden menu buttons
      try {
        menuButtons.forEach((btn) => {
          const prev = btn.dataset.prevDisplay;
          if (prev !== undefined) {
            btn.style.display = prev;
            delete btn.dataset.prevDisplay;
          } else {
            btn.style.display = '';
          }
        });
      } catch(_) {}
    }
    function closeOverlay() {
      try { panel.classList.remove('open'); } catch(_) {}
      const onEnd = (e) => {
        if (!e || e.target === panel) {
          panel.removeEventListener('transitionend', onEnd);
          cleanup();
        }
      };
      panel.addEventListener('transitionend', onEnd);
      setTimeout(() => { try { panel.removeEventListener('transitionend', onEnd); } catch(_) {} cleanup(); }, 400);
    }

    closer.addEventListener('click', closeOverlay);
  }

  // Work with both class names to stay merge-friendly
  listen('.menu-svg, .hamburger-svg', 'click', function (e) {
    e.preventDefault();
    openMenuOverlay();
  });

  // Prepare environment on load for pages that lack a menu button/styles
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      ensureStyles();
      ensureMenuButton();
    });
  } else {
    ensureStyles();
    ensureMenuButton();
  }
})();
