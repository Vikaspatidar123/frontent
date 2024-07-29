/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useMemo } from 'react';
import ReactEcharts from 'echarts-for-react';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';

const LineBarChart = ({
	dataColors,
	chartData = [],
	isDeposit,
	layoutModeType,
}) => {
	const spineareaChartColors = getChartColorsArray(dataColors);

	const colorScheme = {
		light: {
			axisLineColor: '#8791af',
			splitLineColor: 'rgba(166, 176, 207, 0.1)',
			textColor: '#74788d',
			axisLabelColor: '#000',
		},
		dark: {
			axisLineColor: '#8791af',
			splitLineColor: 'rgba(166, 176, 207, 0.1)',
			textColor: '#fff',
			axisLabelColor: '#fff',
		},
	};

	const { axisLineColor, splitLineColor, textColor, axisLabelColor } =
		colorScheme[layoutModeType] || colorScheme.light;

	const { counts, amounts, dates } = useMemo(() => {
		const filteredDates = chartData
			.slice(0, 10)
			.map((entry) => new Date(entry.date).toLocaleDateString());
		const filteredCounts = chartData
			.slice(0, 10)
			.map((entry) =>
				parseInt(isDeposit ? entry.deposit_count : entry.withdraw_count, 10)
			);
		const filteredAmounts = chartData
			.slice(0, 10)
			.map((entry) =>
				parseFloat(
					isDeposit ? entry.total_deposit_amount : entry.total_withdraw_amount
				)
			);
		return {
			dates: filteredDates,
			counts: filteredCounts,
			amounts: filteredAmounts,
		};
	}, [chartData, isDeposit]);

	const options = {
		grid: {
			zlevel: 0,
			x: 80,
			x2: 50,
			y: 30,
			y2: 30,
			borderWidth: 0,
			backgroundColor: 'rgba(0,0,0,0)',
			borderColor: 'rgba(0,0,0,0)',
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				crossStyle: {
					color: '#999',
				},
			},
		},
		toolbox: {
			orient: 'start',
			left: -5,
			top: 0,
			feature: {
				dataView: { show: true, readOnly: false, title: 'Data View' },
				magicType: {
					show: true,
					type: ['line', 'bar'],
					title: { line: 'For line chart', bar: 'For bar chart' },
				},
				saveAsImage: { show: true, title: 'Download Image' },
			},
		},
		color: spineareaChartColors,
		legend: {
			data: ['Total Deposit Amount', 'Deposit Count'],
			textStyle: {
				color: axisLabelColor,
				fontWeight: 600,
			},
		},
		xAxis: [
			{
				type: 'category',
				data: dates,
				axisPointer: {
					type: 'shadow',
				},
				axisLine: {
					lineStyle: {
						color: axisLineColor,
					},
				},
			},
		],
		yAxis: [
			{
				type: 'value',
				name: 'Amount',
				min: 0,
				axisLine: {
					lineStyle: {
						color: axisLineColor,
					},
				},
				splitLine: {
					lineStyle: {
						color: splitLineColor,
					},
				},
				axisLabel: {
					formatter: '$ {value}',
					textStyle: {
						color: axisLabelColor,
						fontWeight: 600,
					},
				},
			},
			{
				type: 'value',
				name: 'Count',
				min: 0,
				axisLine: {
					lineStyle: {
						color: axisLineColor,
					},
				},
				splitLine: {
					lineStyle: {
						color: splitLineColor,
					},
				},
				axisLabel: {
					textStyle: {
						color: axisLabelColor,
						fontWeight: 600,
					},
				},
			},
		],
		series: [
			{
				name: `Total ${isDeposit ? 'Deposit' : 'Withdraw'} Amount`,
				type: 'bar',
				data: amounts,
			},
			{
				name: `${isDeposit ? 'Deposit' : 'Withdraw'} Count`,
				type: 'line',
				smooth: true,
				yAxisIndex: 1,
				data: counts,
			},
		],
		textStyle: {
			color: textColor,
		},
	};

	return <ReactEcharts style={{ height: '350px' }} option={options} />;
};

export default LineBarChart;
