import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { groupBy } from 'lodash';
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
	const { defaultCurrency, currencyById } = useSelector(
		(state) => state.Currencies
	);

	useEffect(() => {
		if (livePlayerData?.DailyRevenues?.length) {
			const groupedByDate = groupBy(livePlayerData.DailyRevenues, 'date');

			const xAxisData = [];
			const totalWageredData = [];
			const totalPayoutData = [];
			const totalRevenueData = [];

			Object.entries(groupedByDate).forEach(([date, currencyWiseAmount]) => {
				xAxisData.push(moment(date).format('Do MMM'));

				let totalBetAmt = 0;
				let totalWinAmt = 0;

				currencyWiseAmount.forEach(
					({ currency, totalBetAmount, totalWinAmount }) => {
						const exchangeRate = Number(
							currencyById[currency]?.exchangeRate || 1
						);
						totalBetAmt += Number(totalBetAmount || 0) * exchangeRate;
						totalWinAmt += Number(totalWinAmount || 0) * exchangeRate;
					}
				);

				totalWageredData.push(totalBetAmt);
				totalPayoutData.push(totalWinAmt);
				totalRevenueData.push(totalBetAmt - totalWinAmt);
			});

			const formateData = [
				{
					name: 'Total Revenue',
					data: totalRevenueData,
				},
				{
					name: 'Total Wagered Amount',
					data: totalWageredData,
				},
				{
					name: 'Total Payout Amount',
					data: totalPayoutData,
				},
			];
			setSeries(formateData);
			setxAxis(xAxisData);
		}
	}, [livePlayerData?.DailyRevenues, currencyById]);

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
					return `${defaultCurrency?.symbol || ''} ${value}`;
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
