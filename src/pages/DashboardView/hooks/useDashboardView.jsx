/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getLivePlayerInfoStart } from '../../../store/dashboardView/actions';

const useDashboardView = () => {
	const dispatch = useDispatch();
	const { isLivePlayerLoading, livePlayerData } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const fetchData = () => {
		dispatch(getLivePlayerInfoStart());
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		isLivePlayerLoading,
		livePlayerData,
	};
};

useDashboardView.propTypes = {};

useDashboardView.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useDashboardView;
