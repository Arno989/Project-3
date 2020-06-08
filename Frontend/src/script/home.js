import '../style/home.scss';

import navModule from './lib/navModule';
import Slides from './lib/Slides';

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const menuButtonElement = document.querySelector('.js-menu-button');
		const menuCloseButtonElement = document.querySelector('.js-menu-close-button');
		const menuElement = document.querySelector('.js-menu');

		navModule.setup(menuButtonElement, menuCloseButtonElement, menuElement);

		new Slides({
			prevElement: document.querySelector('.js-slides-prev'),
			nextElement: document.querySelector('.js-slides-next'),
			slideElements: document.querySelectorAll('.js-slide'),
		}).setup();
	});
})();
