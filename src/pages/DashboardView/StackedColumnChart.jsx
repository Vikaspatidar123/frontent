/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unknown-property */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import ReactApexChart from 'react-apexcharts';
import getChartColorsArray from '../../components/Common/ChartsDynamicColor';

const StackedColumnChart = ({ dataColors, periodData }) => {
	const stackedColumnChartColors = getChartColorsArray(dataColors);
	const options = {
		chart: {
			stacked: !0,
			toolbar: {
				show: false,
			},
			zoom: {
				enabled: !0,
			},
		},
		plotOptions: {
			bar: {
				horizontal: !1,
				columnWidth: '15%',
				// endingShape: "rounded"
			},
		},
		dataLabels: {
			enabled: !1,
		},
		xaxis: {
			show: true,
			categories: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			],
			labels: {
				show: true,
			},
		},
		colors: stackedColumnChartColors,
		legend: {
			position: 'bottom',
		},
		fill: {
			opacity: 1,
		},
	};
	return (
		<ReactApexChart
			options={options}
			series={[...periodData]}
			type="bar"
			height="359"
			className="apex-charts"
		/>
	);
};

StackedColumnChart.propTypes = {
	periodData: PropTypes.any,
};
export default StackedColumnChart;
