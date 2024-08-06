/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';
import { formatInKMB } from '../../../utils/helpers';

const RevenueChart = ({ statsData, dashFilters }) => {
	const chartColors = getChartColorsArray(
		'["--bs-success", "--bs-primary", "--bs-danger"]'
	);
	const [series, setSeries] = useState([]);
	const [xAxis, setxAxis] = useState([]);
	const { defaultCurrency } = useSelector((state) => state.Currencies);

	useEffect(() => {
		const xAxisData = [];
		const totalWageredData = [];
		const totalPayoutData = [];
		const totalRevenueData = [];

		const isCasino = dashFilters?.categories?.find(
			(cate) => cate.value === 'casino'
		);
		const isSportsbook = dashFilters?.categories?.find(
			(cate) => cate.value === 'sportsbook'
		);
		const isBoth = isCasino && isSportsbook;

		statsData?.grouped?.forEach(
			({
				start_date,
				end_date,
				total_casino_bet_amount,
				total_casino_win_amount,
				total_sportsbook_bet_amount,
				total_sportsbook_win_amount,
			}) => {
				xAxisData.push(
					start_date !== end_date
						? `${moment(start_date).format('D MMM')} - ${moment(
								end_date
						  ).format('D MMM YYYY')}`
						: moment(end_date).format('D MMM YYYY')
				);

				let betAmount = 0;
				let winAmount = 0;
				if (isBoth) {
					betAmount +=
						parseFloat(total_casino_bet_amount || 0) +
						parseFloat(total_sportsbook_bet_amount || 0);
					winAmount +=
						parseFloat(total_casino_win_amount || 0) +
						parseFloat(total_sportsbook_win_amount || 0);
				} else if (isCasino) {
					betAmount += parseFloat(total_casino_bet_amount || 0);
					winAmount += parseFloat(total_casino_win_amount || 0);
				} else if (isSportsbook) {
					betAmount += parseFloat(total_sportsbook_bet_amount || 0);
					winAmount += parseFloat(total_sportsbook_win_amount || 0);
				}

				totalWageredData.push(betAmount?.toFixed(2));

				totalPayoutData.push(winAmount?.toFixed(2));

				totalRevenueData.push((betAmount - winAmount)?.toFixed(2));
			}
		);

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
	}, [statsData?.grouped, dashFilters]);

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
				formatter: (value) =>
					`${defaultCurrency?.symbol || ''} ${formatInKMB(value) || ''}`,
				textStyle: {
					fontWeight: 600,
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
	statsData: {},
};

RevenueChart.propTypes = {
	statsData: PropTypes.shape({
		activeUsersCount: PropTypes.number,
		totalGames: PropTypes.number,
		grouped: PropTypes.arrayOf({
			date: PropTypes.string,
		}),
	}),
	dashFilters: PropTypes.shape({
		categories: PropTypes.arrayOf(
			PropTypes.shape({
				value: PropTypes.string,
			})
		),
	}).isRequired,
};
