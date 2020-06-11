const formModule = (function () {
	let form = undefined,
		inputs = [],
		checkboxes = [],
		labels = [];

	const enableListeners = () => {
		form.addEventListener('submit', (e) => {
			console.log('Form submit event');

			e.preventDefault();
		});

		for (let i = 0; i < inputs.length; i++) {
			inputs[i].addEventListener('input', () => {
				if (inputs[i].value == '') {
					labels[i].classList.remove('js-keep-floating');
				} else {
					labels[i].classList.add('js-keep-floating');
				}
			});
		}
	};

	const setup = function ({ formElement, inputElements, checkboxElements, labelElements }) {
		form = formElement;
		inputs = inputElements;
		checkboxes = checkboxElements;
		labels = labelElements;

		enableListeners();
	};

	return {
		setup: setup,
	};
})();

export default formModule;
