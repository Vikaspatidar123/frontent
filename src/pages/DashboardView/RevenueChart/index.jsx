import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';

const RevenueChart = ({ livePlayerData }) => {
	const dashedLineChartColors = getChartColorsArray(
		'["--bs-success", "--bs-primary", "--bs-danger"]'
	);
	const [series, setSeries] = useState([]);
	const [xAxis, setxAxis] = useState([]);
	const { defaultCurrency } = useSelector((state) => state.Currencies);
	useEffect(() => {
		if (livePlayerData?.DailyRevenues?.length) {
			const formateData = [
				{
					name: 'Total Revenue',
					data: livePlayerData?.DailyRevenues?.map(
						({ totalBetAmount, totalWinAmount }) =>
							totalBetAmount - totalWinAmount
					),
				},
				{
					name: 'Total Wagered Amount',
					data: livePlayerData?.DailyRevenues?.map(
						({ totalBetAmount }) => totalBetAmount
					),
				},
				{
					name: 'Total Payout Amount',
					data: livePlayerData?.DailyRevenues?.map(
						({ totalWinAmount }) => totalWinAmount
					),
				},
			];
			setSeries(formateData);
			setxAxis(
				livePlayerData?.DailyRevenues?.map(({ date }) =>
					moment(date).format('Do MMM')
				)
			);
		}
	}, [livePlayerData?.DailyRevenues]);

	const options = {
		chart: { zoom: { enabled: !1 }, toolbar: { show: !1 } },
		colors: dashedLineChartColors,
		dataLabels: { enabled: !1 },
		stroke: { width: [3, 4, 3], curve: 'straight', dashArray: [0, 8, 5] },
		markers: { size: 0, hover: { sizeOffset: 6 } },
		xaxis: {
			categories: xAxis,
		},
		yaxis: {
			labels: {
				formatter(value) {
					return `${defaultCurrency.symbol} ${value}`;
				},
			},
		},
		tooltip: {
			y: [
				{
					title: {
						formatter(e) {
							return `${e}`;
						},
					},
				},
				{
					title: {
						formatter(e) {
							return `${e}`;
						},
					},
				},
				{
					title: {
						formatter(e) {
							return `${e}`;
						},
					},
				},
			],
		},
		grid: { borderColor: '#f1f1f1' },
	};

	return (
		<ReactApexChart
			options={options}
			series={series}
			type="line"
			height="380"
			className="apex-charts"
		/>
	);
};

export default RevenueChart;

RevenueChart.defaultProps = {
	livePlayerData: {},
	// isLivePlayerLoading: 0,
};

RevenueChart.propTypes = {
	livePlayerData: PropTypes.string,
	// isLivePlayerLoading: PropTypes.bool,
	defaultCurrency: PropTypes.shape({
		symbol: PropTypes.string,
	}).isRequired,
};
