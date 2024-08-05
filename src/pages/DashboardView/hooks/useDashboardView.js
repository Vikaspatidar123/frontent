import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getStatisticData } from '../../../store/dashboardView/actions';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';
import { INITIAL_FILTERS } from '../constant';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	dashboardElements,
	initialElement,
	validationSchema,
} from '../formFields';
import { setItem } from '../../../network/storageUtils';
import { STORAGE_KEY } from '../../../components/Common/constants';

const useDashboardView = () => {
	const dispatch = useDispatch();
	const [dashFilters, setDashFilters] = useState(INITIAL_FILTERS);
	const layoutModeType = useSelector((state) => state.Layout.layoutModeType);

	const { isLivePlayerLoading, statsData } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const [loggedInOptions, setLoggedInOptions] = useState({});

	const handleDashFilters = (values) => {
		setDashFilters(values);
	};

	useEffect(() => {
		dispatch(
			getStatisticData({
				currencyId: '',
				fromDate: dashFilters?.fromDate || '',
				toDate: dashFilters?.toDate || '',
				dateOptions: 'custom',
			})
		);
	}, [dashFilters]);

	useEffect(() => {
		if (statsData) {
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
			series.push(Number(statsData?.totalLoggedInPlayers || 0));
			series.push(Number(statsData?.totalPlayers || 0));
			options.series = series;
			options.labels = labels;
			setLoggedInOptions(options);
		}
	}, [statsData]);

	const {
		isOpen: showElementControl,
		setIsOpen: setShowElementControl,
		validation,
		formFields,
	} = useForm({
		initialValues: initialElement(),
		validationSchema: validationSchema(),
		staticFormFields: dashboardElements(),
	});

	useEffect(() => {
		setItem(STORAGE_KEY.DASH_CONFIG, JSON.stringify(validation.values));
	}, [validation.values]);

	return {
		isLivePlayerLoading,
		loggedInOptions,
		dashFilters,
		setDashFilters,
		handleDashFilters,
		statsData,
		layoutModeType,
		showElementControl,
		setShowElementControl,
		formFields,
		validation,
	};
};

useDashboardView.propTypes = {};

useDashboardView.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default useDashboardView;
