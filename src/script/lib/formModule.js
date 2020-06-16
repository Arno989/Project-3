const formModule = (function () {
	let form = undefined,
		inputs = [],
		floatingInputs = [],
		otherInputs = [],
		floatingLabels = [],
		checkboxes = [],
		submitCallback = undefined;

	const enableListeners = () => {
		if (form) {
			form.addEventListener('submit', (e) => {
				e.preventDefault();

				let inputValues = [];
				if (inputs.length > 0) {
					inputs.forEach((input) => inputValues.push(input.value));
				}
				let checkboxValues = [];
				if (checkboxes.length > 0) {
					checkboxes.forEach((checkbox) => checkboxValues.push(checkbox.checked));
				}

				if (submitCallback) {
					submitCallback({ inputValues, checkboxValues });
				}
			});
		}

		if (floatingInputs.length > 0) {
			for (let i = 0; i < floatingInputs.length; i++) {
				floatingInputs[i].addEventListener('input', () => {
					if (floatingInputs[i].value == '') {
						floatingLabels[i].classList.remove('js-keep-floating');
					} else {
						floatingLabels[i].classList.add('js-keep-floating');
					}
				});
			}
		}
	};

	const setup = function ({ formElement, floatingInputElements, otherInputElements, floatingLabelElements, checkboxElements, formSubmitCallback }) {
		form = formElement ? formElement : undefined;
		floatingInputs = floatingInputElements ? floatingInputElements : [];
		otherInputs = otherInputElements ? otherInputElements : [];
		floatingLabels = floatingLabelElements ? floatingLabelElements : [];
		checkboxes = checkboxElements ? checkboxElements : [];
		submitCallback = formSubmitCallback ? formSubmitCallback : undefined;

		inputs.push.apply(inputs, floatingInputs);
		inputs.push.apply(inputs, otherInputs);

		enableListeners();
	};

	return {
		setup: setup,
	};
})();

export default formModule;
