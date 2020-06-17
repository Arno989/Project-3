class Charts {
	constructor({ loadingElement, chartElement, chartType, chartLabels, dataSets }) {
		Object.assign(this, { loadingElement, chartElement, chartType, chartLabels, dataSets });
	}

	setup() {
		this.loadingElement.classList.add('hidden');
		this.chartElement.classList.remove('hidden');

		const chartContext = this.chartElement.getContext('2d');

		this.chart = new Chart(chartContext, {
			type: this.chartType,
			data: {
				labels: this.chartLabels,
				datasets: this.dataSets,
			},
			options: {
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
			},
		});
	}
}

export default Charts;
