/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import moment from 'moment';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';
import { addCommasToNumber, formatInKMB } from '../../../utils/helpers';
import Spinners from '../../../components/Common/Spinner';

const LineBarChart = ({
	dataColors,
	chartData,
	isCasino,
	layoutModeType,
	statsDataLoading,
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

	const {
		counts,
		amounts,
		winCounts,
		winAmounts,
		dates,
		averageBet,
		betCount,
	} = useMemo(() => {
		const filteredDates = chartData?.map((val) =>
			val.start_date !== val.end_date
				? `${moment(val.start_date).format('D MMM')} - ${moment(
						val.end_date
				  ).format('D MMM YYYY')}`
				: moment(val.end_date).format('D MMM YYYY')
		);
		const filteredCounts = chartData?.map((val) =>
			parseInt(isCasino ? val.casino_bet_count : val.sportsbook_bet_count, 10)
		);
		const filteredAmounts = chartData?.map((val) =>
			parseFloat(
				isCasino ? val.total_casino_bet_amount : val.total_sportsbook_bet_amount
			)?.toFixed(2)
		);
		const filteredWinCounts = chartData?.map((val) => {
			const ran = Math.random() * 40;
			return parseInt(
				isCasino
					? val.casino_win_count > ran
						? val.casino_win_count - ran
						: val.casino_win_count
					: val.sportsbook_win_count,
				10
			);
		});
		const filteredWinAmounts = chartData?.map((val) =>
			parseFloat(
				isCasino ? val.total_casino_win_amount : val.total_sportsbook_win_amount
			)?.toFixed(2)
		);

		// Calculate average bet
		const totalBets = filteredAmounts?.reduce(
			(acc, curr) => acc + Number(curr || 0),
			0
		);
		const totalBetCount = filteredCounts?.reduce(
			(acc, curr) => acc + Number(curr || 0),
			0
		);
		const avgBet = totalBetCount ? (totalBets / totalBetCount)?.toFixed(2) : 0;

		return {
			dates: filteredDates,
			counts: filteredCounts,
			amounts: filteredAmounts,
			winCounts: filteredWinCounts,
			winAmounts: filteredWinAmounts,
			averageBet: avgBet,
			betCount: totalBetCount,
		};
	}, [chartData, isCasino]);

	const legendNames = [
		`Wager Amount`,
		`Wager Count`,
		`Payout Amount`,
		`Payout Count`,
	];

	const options = {
		grid: {
			zlevel: 0,
			x: 60,
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
		// toolbox: {
		// 	orient: 'start',
		// 	left: -5,
		// 	top: 25,
		// 	feature: {
		// 		dataView: { show: true, readOnly: false, title: 'Data View' },
		// 		magicType: {
		// 			show: true,
		// 			type: ['line', 'bar'],
		// 			title: { line: 'For line chart', bar: 'For bar chart' },
		// 		},
		// 		saveAsImage: { show: true, title: 'Download Image' },
		// 	},
		// },
		color: spineareaChartColors.concat(['#ff4d4f']), // Add red color for win series
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
		legend: {
			data: legendNames,
			textStyle: {
				color: axisLabelColor,
				fontWeight: 600,
			},
		},
		series: [
			{
				name: `Wager Amount`,
				type: 'bar',
				data: amounts,
			},
			{
				name: `Wager Count`,
				type: 'line',
				smooth: true,
				yAxisIndex: 1,
				data: counts,
				lineStyle: {
					width: 4,
				},
			},
			{
				name: `Payout Amount`,
				type: 'bar',
				data: winAmounts,
				itemStyle: {
					color: '#ff4d4f',
				},
			},
			{
				name: `Payout Count`,
				type: 'line',
				smooth: true,
				yAxisIndex: 1,
				data: winCounts,
				lineStyle: {
					color: '#ff4d4f', // Red color for win count line
					width: 3, // Make the line bolder
				},
			},
		],
		textStyle: {
			color: textColor,
		},
	};

	return (
		<div>
			<div className="d-flex justify-content-start">
				<div
					className="badge bg-success-subtle text-dark p-3 fs-4 rounded-4"
					style={{ marginBottom: '10px' }}
				>
					<h6 className="mb-0 font-weight-bold">
						<span className="text-success">Wager Count:</span>{' '}
						{addCommasToNumber(betCount)}
					</h6>
				</div>
				<div
					className="badge bg-info-subtle text-dark p-3 fs-4 rounded-4 ms-3"
					style={{ marginBottom: '10px' }}
				>
					<h6 className="mb-0 font-weight-bold">
						<span className="text-success">Average Wager:</span> $ {averageBet}
					</h6>
				</div>
			</div>
			{statsDataLoading && !chartData ? (
				<div style={{ height: '350px' }}>
					<Spinners />
				</div>
			) : (
				<ReactEcharts style={{ height: '350px' }} option={options} />
			)}
		</div>
	);
};

export default LineBarChart;
