import '../style/thankyou.scss';

import navModule from './lib/navModule';

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const menuButtonElement = document.querySelector('.js-menu-button');
		const menuCloseButtonElement = document.querySelector('.js-menu-close-button');
		const menuElement = document.querySelector('.js-menu');

		navModule.setup(menuButtonElement, menuCloseButtonElement, menuElement);
	});
})();
