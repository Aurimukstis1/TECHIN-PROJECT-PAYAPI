(function () {
  // Basic navigation and mobile menu close handler
  function qs(sel) { return document.querySelector(sel); }

  document.addEventListener('DOMContentLoaded', function () {
    const closeBtn = qs('.menu-toggle.close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.assign('index.html');
        }
      });
    }
  });
})();
