// Cross-page mobile menu overlay
(function () {
	const SELECTORS = {
		hamburger: '.hamburger-svg',
		overlay: '#mobile-menu-overlay',
	};

	function createOverlay() {
		if (document.querySelector(SELECTORS.overlay)) return document.querySelector(SELECTORS.overlay);

		const overlay = document.createElement('div');
		overlay.id = 'mobile-menu-overlay';
		overlay.setAttribute('role', 'dialog');
		overlay.setAttribute('aria-modal', 'true');
		overlay.innerHTML = `
			<div class="mobile-menu-screen" aria-label="Mobile menu">
				<div class="menu-panel-area">
					<header class="mobile-menu-header">
						<button class="menu-toggle close" aria-label="Close menu">
							<img src="assets/images/shared/mobile/close.svg" alt="" class="x-svg" aria-hidden="true">
						</button>
					</header>

					<img src="assets/images/shared/mobile/menu-panel.svg" alt="" class="menu-panel-img" aria-hidden="true">
					<img src="assets/images/shared/mobile/curve-top-large.svg" alt="" class="curve-top-img" aria-hidden="true">
					<img src="assets/images/shared/mobile/menu-top-line.svg" alt="" class="menu-top-line-img" aria-hidden="true">

					<nav class="mobile-menu-nav" aria-label="Main menu">
						<ul class="menu-list">
							<li><a href="pricing.html" class="menu-link">Pricing</a></li>
							<li><a href="about.html" class="menu-link">About</a></li>
							<li><a href="contact.html" class="menu-link">Contact</a></li>
						</ul>
					</nav>

					<div class="menu-cta-wrap">
						<img src="assets/images/shared/mobile/cta-bg.svg" alt="" class="cta-bg" aria-hidden="true">
						<a href="contact.html" class="cta-button">Schedule a Demo</a>
					</div>
				</div>
			</div>
		`;

		// Close on X button or overlay background
		overlay.addEventListener('click', (e) => {
			const closeClick = e.target.closest('.menu-toggle.close');
			const clickedBackground = e.target === overlay || e.target.classList.contains('mobile-menu-screen');
			if (closeClick || clickedBackground) closeOverlay();
		});

		// Close when navigating via a link
		overlay.addEventListener('click', (e) => {
			const link = e.target.closest('a.menu-link, .cta-button');
			if (link) closeOverlay();
		});

		document.body.appendChild(overlay);
		return overlay;
	}

	function openOverlay() {
		const overlay = createOverlay();
		overlay.classList.add('is-open');
		document.documentElement.classList.add('no-scroll', 'menu-open');
	}

	function closeOverlay() {
		const overlay = document.querySelector(SELECTORS.overlay);
		if (!overlay) return;
		overlay.classList.remove('is-open');
		document.documentElement.classList.remove('no-scroll', 'menu-open');
	}

	// Wire hamburger buttons if present
	function init() {
		const hamburgers = document.querySelectorAll(SELECTORS.hamburger);
		hamburgers.forEach((btn) => {
			btn.addEventListener('click', openOverlay);
		});
	}

	// Initialize on DOM ready
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', init);
	} else {
		init();
	}

	// Expose close for internal handlers
	window.__closeMobileMenu = closeOverlay;
})();

