import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { groupBy } from 'lodash';
import { useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';

const RevenueChart = ({ livePlayerData }) => {
	const chartColors = getChartColorsArray(
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

				totalWageredData.push(totalBetAmt?.toFixed(2));
				totalPayoutData.push(totalWinAmt?.toFixed(2));
				totalRevenueData.push((totalBetAmt - totalWinAmt)?.toFixed(2));
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
		chart: { type: 'bar', zoom: { enabled: false }, toolbar: { show: false } },
		colors: chartColors,
		dataLabels: { enabled: false },
		stroke: { show: true, width: 2, colors: ['transparent'] },
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
			y: {
				formatter(value) {
					return `${defaultCurrency?.symbol || ''} ${value}`;
				},
			},
		},
		grid: { borderColor: '#f1f1f1' },
	};

	return (
		<ReactApexChart
			options={options}
			series={series}
			type="bar"
			height="380"
			className="apex-charts"
		/>
	);
};

export default RevenueChart;

RevenueChart.defaultProps = {
	livePlayerData: {},
};

RevenueChart.propTypes = {
	livePlayerData: PropTypes.shape({
		DailyRevenues: PropTypes.arrayOf(
			PropTypes.objectOf({
				date: PropTypes.string,
			})
		),
	}),
};
