/* eslint-disable react/prop-types */
import moment from 'moment';
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
		const filteredDates = chartData.map((val) =>
			val.start_date !== val.end_date
				? `${moment(val.start_date).format('D MMM')} - ${moment(
						val.end_date
				  ).format('D MMM YYYY')}`
				: moment(val.end_date).format('D MMM YYYY')
		);
		const filteredCounts = chartData.map((val) =>
			parseInt(isDeposit ? val.deposit_count : val.withdraw_count, 10)
		);
		const filteredAmounts = chartData.map((val) =>
			parseFloat(
				isDeposit ? val.total_deposit_amount : val.total_withdraw_amount
			)
		);
		return {
			dates: filteredDates,
			counts: filteredCounts,
			amounts: filteredAmounts,
		};
	}, [chartData, isDeposit]);

	const legendNames = [
		`Total ${isDeposit ? 'Deposit' : 'Withdraw'} Amount`,
		`${isDeposit ? 'Deposit' : 'Withdraw'} Count`,
	];

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
			data: legendNames,
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
				name: '',
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
				name: '',
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
				name: legendNames[0],
				type: 'bar',
				data: amounts,
			},
			{
				name: legendNames[1],
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
