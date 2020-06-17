import '../style/home.scss';

import navModule from './lib/navModule';
import dataAccess from './lib/dataAccess';
import Charts from './lib/Charts';

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const menuButtonElement = document.querySelector('.js-menu-button');
		const menuCloseButtonElement = document.querySelector('.js-menu-close-button');
		const menuElement = document.querySelector('.js-menu');

		navModule.setup(menuButtonElement, menuCloseButtonElement, menuElement);

		const chartLoadingElements = document.querySelectorAll('.js-chart-loading');
		const chartElements = document.querySelectorAll('.js-chart');
		const data = dataAccess.local.get('eyeMeasurementResult');
		if (data) {
			const dataKeys = Object.keys(data);
			const dataValues = Object.values(data);

			const colors = ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'];
			let dataSetsCyl = [];
			for (let i = 0; i < 2; i++) {
				const color = colors[i];
				dataSetsCyl.push({
					label: dataKeys[i],
					data: Object.values(dataValues[i]),
					backgroundColor: 'transparent',
					borderColor: color,
					borderWidth: 2,
					pointRadius: 2,
				});
			}

			new Charts({
				loadingElement: chartLoadingElements[0],
				chartElement: chartElements[0],
				chartType: 'line',
				chartLabels: Object.keys(dataValues[0]),
				dataSets: dataSetsCyl,
			}).setup();

			let dataSetsSfr = [];
			for (let i = 2; i < 4; i++) {
				const color = colors[i - 2];
				dataSetsSfr.push({
					label: dataKeys[i],
					data: Object.values(dataValues[i]),
					backgroundColor: 'transparent',
					borderColor: color,
					borderWidth: 2,
					pointRadius: 2,
				});
			}

			new Charts({
				loadingElement: chartLoadingElements[1],
				chartElement: chartElements[1],
				chartType: 'line',
				chartLabels: Object.keys(dataValues[0]),
				dataSets: dataSetsSfr,
			}).setup();
		} else {
			chartLoadingElements.forEach((element) => element.classList.add('hidden'));
			document.querySelector('.js-no-data-message').classList.remove('hidden');
		}
	});
})();
