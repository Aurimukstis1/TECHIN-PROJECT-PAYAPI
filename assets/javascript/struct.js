
// Mobile menu open/close and basic navigation
(function () {
	function qs(sel) { return document.querySelector(sel); }
	const closeBtn = qs('.menu-toggle.close');
	if (closeBtn) {
		closeBtn.addEventListener('click', function () {
			// Simple close behavior: go back if possible, otherwise home
			window.history.length > 1 ? window.history.back() : window.location.assign('index.html');
		});
	}
})();

