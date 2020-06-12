class Charts {
	constructor({ loadingElement, chartElement, chartType, chartLabel, chartLabels, chartData, chartBackgroundColor, chartBorderColor, chartBorderWidth }) {
		Object.assign(this, { loadingElement, chartElement, chartType, chartLabel, chartLabels, chartData, chartBackgroundColor, chartBorderColor, chartBorderWidth });
	}

	setup() {
		this.loadingElement.classList.add('hidden');
		this.chartElement.classList.remove('hidden');

		const chartContext = this.chartElement.getContext('2d');

		this.chart = new Chart(chartContext, {
			type: this.chartType,
			data: {
				labels: this.chartLabels,
				datasets: [
					{
						label: this.chartLabel,
						data: this.chartData,
						backgroundColor: this.chartBackgroundColor,
						borderColor: this.chartBorderColor,
						borderWidth: this.chartBorderWidth,
					},
				],
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
