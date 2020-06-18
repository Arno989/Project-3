class Charts {
	constructor({ chartElement, chartType, chartLabels, dataSets }) {
		Object.assign(this, { chartElement, chartType, chartLabels, dataSets });
	}

	setup() {
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
								beginAtZero: false,
							},
						},
					],
				},
			},
		});
	}
}

export default Charts;
