const navModule = (function () {
	let menuButton = undefined,
		menuCloseButton = undefined,
		menu = undefined;

	const enableListeners = () => {
		menuButton.addEventListener('click', () => {
			menu.style.left = '0';
		});

		menuCloseButton.addEventListener('click', () => {
			menu.style.left = '-20rem';
		});
	};

	const setup = function (menuButtonElement, menuCloseButtonElement, menuElement) {
		menuButton = menuButtonElement;
		menuCloseButton = menuCloseButtonElement;
		menu = menuElement;

		enableListeners();
	};

	return {
		setup: setup,
	};
})();

export default navModule;
