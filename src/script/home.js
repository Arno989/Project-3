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

		const data = dataAccess.local.get('eyeMeasurementResult');

		const chartLoadingElement = document.querySelector('.js-chart-loading');

		if (data) {
			let dataSets = [];
			const dataKeys = Object.keys(data);
			const dataValues = Object.values(data);
			const colors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'];
			for (let i = 0; i < dataKeys.length; i++) {
				const color = colors[i];
				dataSets.push({
					label: dataKeys[i],
					data: Object.values(dataValues[i]),
					backgroundColor: color,
					borderColor: color,
					borderWidth: 2,
				});
			}

			new Charts({
				loadingElement: chartLoadingElement,
				chartElement: document.querySelector('.js-chart'),
				chartType: 'line',
				chartLabel: 'Voorspelling',
				chartLabels: Object.keys(dataValues[0]),
				dataSets: dataSets,
			}).setup();
		} else {
			chartLoadingElement.innerHTML = '<p style="margin-bottom: 2rem; font-size: 1.15rem;">Data kan niet geladen worden, gelieve eerst een oogmeting te doen.</p>';
		}
	});
})();
