import '../style/gettingStarted.scss';

import navModule from './lib/navModule';
import formModule from './lib/formModule';

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const menuButtonElement = document.querySelector('.js-menu-button');
		const menuCloseButtonElement = document.querySelector('.js-menu-close-button');
		const menuElement = document.querySelector('.js-menu');

		navModule.setup(menuButtonElement, menuCloseButtonElement, menuElement);

		const formElement = document.querySelector('.js-form');
		const inputElements = document.querySelectorAll('.js-input');
		const labelElements = document.querySelectorAll('.js-label');

		formModule.setup({ formElement, inputElements, labelElements });
	});
})();
