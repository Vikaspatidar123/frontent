/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import moment from 'moment';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';
import { addCommasToNumber, formatInKMB } from '../../../utils/helpers';

const LineBarChart = ({
	dataColors,
	chartData = [],
	isDeposit,
	layoutModeType,
	statsData,
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

	const { counts, amounts, dates, totalDeposits, totalWithdrawals } =
		useMemo(() => {
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

			let deposit = 0;
			let withdraw = 0;

			statsData?.stats?.forEach(
				({ total_deposit_amount, total_withdraw_amount }) => {
					deposit += Number(total_deposit_amount || 0);
					withdraw += Number(total_withdraw_amount || 0);
				}
			);

			return {
				dates: filteredDates,
				counts: filteredCounts,
				amounts: filteredAmounts,
				totalDeposits: deposit,
				totalWithdrawals: withdraw,
			};
		}, [chartData, isDeposit, statsData]);

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
			top: 25,
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
				data: amounts,
			},
			{
				name: legendNames[1],
				type: 'line',
				smooth: true,
				yAxisIndex: 1,
				data: counts,
				lineStyle: {
					width: 3,
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
						<span className="text-success">Deposits:</span> ${' '}
						{addCommasToNumber(totalDeposits)}
					</h6>
				</div>
				<div
					className="badge bg-danger-subtle text-dark p-3 fs-4 rounded-4 ms-3"
					style={{ marginBottom: '10px' }}
				>
					<h6 className="mb-0 font-weight-bold">
						<span className="text-danger">Withdrawals:</span> ${' '}
						{addCommasToNumber(totalWithdrawals)}
					</h6>
				</div>
			</div>
			<ReactEcharts style={{ height: '350px' }} option={options} />
		</div>
	);
};

export default LineBarChart;
