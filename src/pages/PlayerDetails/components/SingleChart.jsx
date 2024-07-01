/* eslint-disable react/prop-types */
import React from 'react';
import ReactApexChart from 'react-apexcharts';

const PieChart = ({
	data,
	colors,
	isAmount,
	defaultCurrency,
	chartTitle = '',
}) => {
	const series = data.map((item) => item.value);
	const labels = data.map((item) => item.category);

	const options = {
		chart: {
			type: 'pie',
			height: 320,
		},
		title: {
			text: chartTitle,
			margin: 15,
			style: {
				fontFamily: 'Poppins',
			},
		},
		labels,
		colors,
		dataLabels: {
			enabled: true,
			formatter(val, opts) {
				return `${isAmount ? defaultCurrency?.symbol || '' : ''} ${Number(
					opts.w.config.series[opts.seriesIndex] || 0
				)?.toFixed(isAmount ? 2 : 0)}`;
			},
			offsetY: 20,
			style: {
				fontSize: '12px',
			},
		},
		legend: {
			show: true,
			position: 'bottom',
			horizontalAlign: 'center',
			verticalAlign: 'middle',
			floating: false,
			fontSize: '14px',
			offsetX: 0,
		},
		responsive: [
			{
				breakpoint: 600,
				options: {
					chart: {
						height: 240,
					},
					legend: {
						show: false,
					},
				},
			},
		],
	};

	return (
		<ReactApexChart options={options} series={series} type="pie" height={320} />
	);
};

export default PieChart;
