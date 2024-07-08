import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getLivePlayerInfoStart } from '../../../store/dashboardView/actions';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';

const useDashboardView = () => {
	const dispatch = useDispatch();

	const { isLivePlayerLoading, livePlayerData } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const [loggedInOptions, setLoggedInOptions] = useState({});

	useEffect(() => {
		dispatch(getLivePlayerInfoStart());
		return () => {
			// Dispatch an action to reset Redux state here
			dispatch({ type: 'RESET_DASHBOARD_STATE' });
		};
	}, []);

	useEffect(() => {
		if (livePlayerData) {
			const apexsaleschartColors = getChartColorsArray(
				'["--bs-primary", "--bs-success", "--bs-danger"]'
			);
			const options = {
				colors: apexsaleschartColors,
				legend: {
					// show: !1,
					position: 'bottom',
				},
				fill: {
					type: 'gradient',
				},
				dataLabels: {
					enabled: true, // Show data labels
				},

				plotOptions: {
					pie: {
						donut: {
							size: '40%',
						},
					},
				},
			};
			const labels = [];
			const series = [];
			labels.push('Logged in players');
			labels.push('Total players');
			series.push(Number(livePlayerData?.totalLoggedInPlayers));
			series.push(Number(livePlayerData?.totalPlayers));
			options.series = series;
			options.labels = labels;
			setLoggedInOptions(options);
		}
	}, [livePlayerData && livePlayerData?.totalLoggedInPlayers]);

	return {
		isLivePlayerLoading,
		livePlayerData,
		loggedInOptions,
	};
};

useDashboardView.propTypes = {};

useDashboardView.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useDashboardView;
