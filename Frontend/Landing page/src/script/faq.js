import '../style/faq.scss';

import navModule from './lib/navModule';
import collapseModule from './lib/collapseModule';

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const menuButtonElement = document.querySelector('.js-menu-button');
		const menuCloseButtonElement = document.querySelector('.js-menu-close-button');
		const menuElement = document.querySelector('.js-menu');

		navModule.setup(menuButtonElement, menuCloseButtonElement, menuElement);

		const collapseButtonElements = document.querySelectorAll('.js-collapse-button');
		const collapsePanelElements = document.querySelectorAll('.js-collapse-panel');
		const collapseIconElements = document.querySelectorAll('.js-collapse-icon');

		collapseModule.setup(collapseButtonElements, collapsePanelElements, collapseIconElements);
	});
})();
