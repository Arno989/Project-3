const collapseModule = (function () {
	let buttons = undefined,
		panels = undefined,
		icons = undefined;

	const enableListeners = () => {
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].addEventListener('click', function () {
				const panel = panels[i];
				panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`;
				icons[i].classList.toggle('flip-vertical');
			});
		}
	};

	const setup = function (buttonElements, panelElements, collapseIconElements) {
		buttons = buttonElements;
		panels = panelElements;
		icons = collapseIconElements;

		enableListeners();
	};

	return {
		setup: setup,
	};
})();

export default collapseModule;
