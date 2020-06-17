import '../style/eyeMeasurement.scss';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

import navModule from './lib/navModule';
import formModule from './lib/formModule';
import dataAccess from './lib/dataAccess';

const appendLeadingZero = (number) => {
	if (number < 10) return `0${number}`;
	else return number;
};

const calculateAge = (dateString) => {
	const today = new Date();
	const birthDate = new Date(dateString);
	let age = today.getFullYear() - birthDate.getFullYear();
	const m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
};

(() => {
	document.addEventListener('DOMContentLoaded', async () => {
		const menuButtonElement = document.querySelector('.js-menu-button');
		const menuCloseButtonElement = document.querySelector('.js-menu-close-button');
		const menuElement = document.querySelector('.js-menu');

		navModule.setup(menuButtonElement, menuCloseButtonElement, menuElement);

		const today = new Date();
		const todayString = `${today.getFullYear()}-${appendLeadingZero(today.getMonth() + 1)}-${appendLeadingZero(today.getDate())}`;
		const dateOfBirthElement = document.querySelector('.js-dateOfBirth');
		dateOfBirthElement.setAttribute('max', todayString);

		const formElement = document.querySelector('.js-form');
		const inputElements = document.querySelectorAll('.js-input');

		const sfrVerLinks = inputElements[10];
		const addLinks = inputElements[13];
		const sfrDichtLinks = inputElements[15];
		const updateSfrDichtLinks = () => {
			const addValue = parseFloat(addLinks.value);
			if (addValue != 0) {
				sfrDichtLinks.value = parseFloat(sfrVerLinks.value) + addValue;
			}
		};
		sfrVerLinks.addEventListener('change', updateSfrDichtLinks);
		addLinks.addEventListener('change', updateSfrDichtLinks);
		const cylVerLinks = inputElements[11];
		const cylDichtLinks = inputElements[16];
		const updateCyl = (cyl) => {
			if (cyl === 0) {
				cylDichtLinks.value = cylVerLinks.value;
			} else if (cyl === 1) {
				cylVerLinks.value = cylDichtLinks.value;
			}
		};
		cylVerLinks.addEventListener('change', () => updateCyl(0));
		cylDichtLinks.addEventListener('change', () => updateCyl(1));
		const asVerLinks = inputElements[12];
		const asDichtLinks = inputElements[17];
		const updateAsLinks = (as) => {
			if (as === 0) {
				asDichtLinks.value = asVerLinks.value;
			} else if (as === 1) {
				asVerLinks.value = asDichtLinks.value;
			}
		};
		asVerLinks.addEventListener('change', () => updateAsLinks(0));
		asDichtLinks.addEventListener('change', () => updateAsLinks(1));

		const sfrVerRechts = inputElements[2];
		const addRechts = inputElements[5];
		const sfrDichtRechts = inputElements[7];
		const updateSfrDichtRechts = () => {
			const addValue = parseFloat(addRechts.value);
			if (addValue != 0) {
				sfrDichtRechts.value = parseFloat(sfrVerRechts.value) + addValue;
			}
		};
		sfrVerRechts.addEventListener('change', updateSfrDichtRechts);
		addRechts.addEventListener('change', updateSfrDichtRechts);
		const cylVerRechts = inputElements[3];
		const cylDichtRechts = inputElements[8];
		const updateCylRechts = (cyl) => {
			if (cyl === 0) {
				cylDichtRechts.value = cylVerRechts.value;
			} else if (cyl === 1) {
				cylVerRechts.value = cylDichtRechts.value;
			}
		};
		cylVerRechts.addEventListener('change', () => updateCylRechts(0));
		cylDichtRechts.addEventListener('change', () => updateCylRechts(1));
		const asVerRechts = inputElements[4];
		const asDichtRechts = inputElements[9];
		const updateAsRechts = (as) => {
			if (as === 0) {
				asDichtRechts.value = asVerRechts.value;
			} else if (as === 1) {
				asVerRechts.value = asDichtRechts.value;
			}
		};
		asVerRechts.addEventListener('change', () => updateAsRechts(0));
		asDichtRechts.addEventListener('change', () => updateAsRechts(1));

		const asAddLinks = document.querySelector('.js-asAddLinks');
		const asAddRechts = document.querySelector('.js-asAddRechts');
		const copyLeftElement = document.querySelector('.js-copyLeft');
		copyLeftElement.addEventListener('click', () => {
			sfrVerRechts.value = sfrVerLinks.value;
			cylVerRechts.value = cylVerLinks.value;
			asVerRechts.value = asVerLinks.value;
			addRechts.value = addLinks.value;
			asAddRechts.value = asAddLinks.value;
			sfrDichtRechts.value = sfrDichtLinks.value;
			cylDichtRechts.value = cylDichtLinks.value;
			asDichtRechts.value = asDichtLinks.value;
		});

		const copyRightElement = document.querySelector('.js-copyRight');
		copyRightElement.addEventListener('click', () => {
			sfrVerLinks.value = sfrVerRechts.value;
			cylVerLinks.value = cylVerRechts.value;
			asVerLinks.value = asVerRechts.value;
			addLinks.value = addRechts.value;
			asAddLinks.value = asAddRechts.value;
			sfrDichtLinks.value = sfrDichtRechts.value;
			cylDichtLinks.value = cylDichtRechts.value;
			asDichtLinks.value = asDichtRechts.value;
		});

		formModule.setup({
			formElement: formElement,
			otherInputElements: inputElements,
			formSubmitCallback: async function ({ inputValues }) {
				const values = inputValues;
				const data = `{
					"data": {
						"Geslacht": "${values[1]}",
						"Geboortedatum": "${values[0]}",
						"Oogmetingen/Datum": "${todayString}",
						"Oogmetingen/Sfr ver": ${parseFloat(values[2])},
						"Oogmetingen/Cyl ver": ${parseFloat(values[3])},
						"Oogmetingen/As ver": ${parseFloat(values[4])},
						"Oogmetingen/Add": ${parseFloat(values[5])},
						"Oogmetingen/Sfr dicht": ${parseFloat(values[7])},
						"Oogmetingen/Cyl dicht": ${parseFloat(values[8])},
						"Oogmetingen/As dicht": ${parseFloat(values[9])},
						"Oogmetingen/Sfr ver/L": ${parseFloat(values[10])},
						"Oogmetingen/Cyl ver/L": ${parseFloat(values[11])},
						"Oogmetingen/As ver/L": ${parseFloat(values[12])},
						"Oogmetingen/Add/L": ${parseFloat(values[13])},
						"Oogmetingen/Sfr dicht/L": ${parseFloat(values[15])},
						"Oogmetingen/Cyl dicht/L": ${parseFloat(values[16])},
						"Oogmetingen/As dicht/L": ${parseFloat(values[17])}
					},
					"settings": {
						"years": ${parseFloat(calculateAge(values[0]))}
					}
				}`;

				const saveElement = document.querySelector('.js-save');
				const saveTextElement = document.querySelector('.js-save-text');
				const saveLoadingElement = document.querySelector('.js-save-loading');
				const saveDoneElement = document.querySelector('.js-save-done');
				saveElement.disabled = true;
				saveLoadingElement.classList.remove('hidden');
				saveTextElement.classList.add('hidden');

				const result = await dataAccess.api.post('https://crm-optics-api.azurewebsites.net/api/v1/forecast', data);

				if (result) {
					saveLoadingElement.classList.add('hidden');
					saveDoneElement.classList.remove('hidden');

					setTimeout(() => {
						location.replace('./index.html');
					}, 1000);
				}
			},
		});
	});
})();
