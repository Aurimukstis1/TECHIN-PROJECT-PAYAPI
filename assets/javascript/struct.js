
// Mobile menu open/close and basic navigation
(function () {
	function qs(sel) { return document.querySelector(sel); }

	// Open mobile menu from menu icon
	function openMenuOverlay() {
			// Render overlay panel without navigating, keeping background page visible
			if (qs('.mobile-overlay')) return; // already open
			const overlay = document.createElement('div');
			overlay.className = 'mobile-overlay';
			const panel = document.createElement('div');
			// Mobile menu open/close and basic navigation (kept minimal for merge-friendly changes)
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
			    <a href="contact.html" class="cta-button">Schedule a Demo</a>

			  </div>
