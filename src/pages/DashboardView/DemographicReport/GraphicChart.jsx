/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React, { useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';
import { addCommasToNumber, formatInKMB } from '../../../utils/helpers';
import Spinners from '../../../components/Common/Spinner';

const CountryLineBarChart = ({
	dataColors = '["--bs-primary", "--bs-success", "--bs-danger","--bs-info", "--bs-warning"]',
	chartData = [],
	layoutModeType,
	isLoading,
}) => {
	const spineareaChartColors = getChartColorsArray(dataColors);
	const { defaultCurrency } = useSelector((state) => state.Currencies);
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

	const { countryNames, signUpCounts, depositorCounts, depositAmounts } =
		useMemo(() => {
			const filteredCountryNames = chartData.map((val) => val.countryName);
			const filteredSignUpCounts = chartData.map((val) =>
				parseInt(val.signUpCount, 10)
			);
			const filteredDepositorCounts = chartData.map((val) =>
				parseInt(val.depositorCount, 10)
			);
			const filteredDepositAmounts = chartData.map((val) =>
				parseFloat(val.depositAmount)?.toFixed(2)
			);

			return {
				countryNames: filteredCountryNames,
				signUpCounts: filteredSignUpCounts,
				depositorCounts: filteredDepositorCounts,
				depositAmounts: filteredDepositAmounts,
			};
		}, [chartData]);

	const legendNames = ['Deposit Amount', 'Depositor Count', 'Sign-Up Count'];

	const echartsRef = useRef(null);

	const initialOptions = useMemo(
		() => ({
			grid: {
				zlevel: 0,
				x: 80,
				x2: 40,
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
				top: 25,
				feature: {
					dataView: { show: true, readOnly: false, title: 'Data View' },
					magicType: {
						show: true,
						type: ['line', 'bar'],
						title: { line: 'For line chart', bar: 'For bar chart' },
					},
					saveAsImage: { show: true, title: 'Download Image' },
					restore: { show: true, title: 'Reset' },
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
					data: countryNames,
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
						formatter: (value) =>
							`${defaultCurrency?.symbol || ''} ${formatInKMB(value) || ''}`,
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
						formatter: (value) => `${formatInKMB(value) || ''}`,
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
					data: depositAmounts,
					label: {
						show: true,
						color: layoutModeType === 'dark' ? '#fff' : '#000',
						position: 'top',
						formatter: (params) =>
							`${defaultCurrency?.symbol || ''} ${addCommasToNumber(
								params.value
							)}`,
					},
				},
				{
					name: legendNames[1],
					type: 'line',
					smooth: true,
					yAxisIndex: 1,
					data: depositorCounts,
					lineStyle: {
						width: 3,
					},
				},
				{
					name: legendNames[2],
					type: 'line',
					smooth: true,
					yAxisIndex: 1,
					data: signUpCounts,
					lineStyle: {
						width: 3,
					},
				},
			],
			textStyle: {
				color: textColor,
			},
		}),
		[
			countryNames,
			depositAmounts,
			depositorCounts,
			signUpCounts,
			textColor,
			axisLineColor,
			splitLineColor,
			axisLabelColor,
			defaultCurrency?.symbol,
			spineareaChartColors,
			layoutModeType,
		]
	);

	const resetChart = () => {
		echartsRef.current?.getEchartsInstance()?.setOption(initialOptions, true);
	};

	const options = useMemo(
		() => ({
			...initialOptions,
			toolbox: {
				orient: 'start',
				left: -5,
				top: 25,
				feature: {
					dataView: { show: true, readOnly: false, title: 'Data View' },
					magicType: {
						show: true,
						type: ['line', 'bar'],
						title: { line: 'For line chart', bar: 'For bar chart' },
					},
					saveAsImage: { show: true, title: 'Download Image' },
					restore: {
						show: true,
						title: 'Reset',
						icon: 'path://M512 0C229.236 0 0 229.236 0 512s229.236 512 512 512 512-229.236 512-512S794.964 0 512 0zm4.548 899.23c-123.816 0-241.752-47.564-330.299-133.338C112.67 677.546 64.105 559.61 64.105 435.794S112.67 193.988 186.249 120.409c73.578-73.578 191.514-122.143 315.33-122.143 33.092 0 60.062 26.97 60.062 60.062s-26.97 60.062-60.062 60.062c-96.36 0-187.266 37.452-254.883 104.744-67.617 67.292-105.069 158.198-105.069 254.558 0 96.36 37.452 187.266 105.069 254.883 67.617 67.617 158.198 105.069 254.558 105.069 96.36 0 187.266-37.452 254.883-105.069 67.617-67.617 105.069-158.198 105.069-254.558 0-33.092 26.97-60.062 60.062-60.062s60.062 26.97 60.062 60.062c0 123.816-47.564 241.752-133.338 330.299-87.882 87.882-204.358 136.082-330.3 136.082z',
						onClick: resetChart,
					},
				},
			},
		}),
		[initialOptions]
	);

	return (
		<div>
			{isLoading && !chartData?.length ? (
				<div style={{ height: '350px' }}>
					<Spinners />
				</div>
			) : (
				<ReactEcharts
					ref={echartsRef}
					style={{ height: '350px' }}
					option={options}
				/>
			)}
		</div>
	);
};

export default CountryLineBarChart;
