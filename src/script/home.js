import '../style/home.scss';

import navModule from './lib/navModule';
import Charts from './lib/Charts';

(() => {
	document.addEventListener('DOMContentLoaded', () => {
		const menuButtonElement = document.querySelector('.js-menu-button');
		const menuCloseButtonElement = document.querySelector('.js-menu-close-button');
		const menuElement = document.querySelector('.js-menu');

		navModule.setup(menuButtonElement, menuCloseButtonElement, menuElement);

		new Charts({
			loadingElement: document.querySelector('.js-chart-loading'),
			chartElement: document.querySelector('.js-chart'),
			chartType: 'bar',
			chartLabel: '# of Votes',
			chartLabels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
			chartData: [12, 19, 3, 5, 2, 3],
			chartBackgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(255, 159, 64, 0.2)'],
			chartBorderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)', 'rgba(75, 192, 192, 1)', 'rgba(153, 102, 255, 1)', 'rgba(255, 159, 64, 1)'],
			chartBorderWidth: 1,
		}).setup();
	});
})();
