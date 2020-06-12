import '../style/loyaltyMarketing.scss';

import navModule from './lib/navModule';
import Slides from './lib/Slides';

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const menuButtonElement = document.querySelector('.js-menu-button');
		const menuCloseButtonElement = document.querySelector('.js-menu-close-button');
		const menuElement = document.querySelector('.js-menu');

		navModule.setup(menuButtonElement, menuCloseButtonElement, menuElement);

		['examples', 'classic', 'playfull'].forEach((item) => {
			new Slides({
				prevElement: document.querySelector(`.js-slides-prev-${item}`),
				nextElement: document.querySelector(`.js-slides-next-${item}`),
				slideElements: document.querySelectorAll(`.js-slide-${item}`),
			}).setup();
		});
	});
})();
