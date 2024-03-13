import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import moment from 'moment';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { fetchPlayersStart } from '../../../store/actions';
import { debounceTime, itemsPerPage } from '../../../constants/config';

let debounce;
const useFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);

	const fetchData = ({ endDate, startDate, ...rest }) => {
		dispatch(
			fetchPlayersStart({
				perPage: itemsPerPage,
				page: 1,
				dobStart: startDate ? moment(startDate).format('YYYY-MM-DD') : '',
				dobEnd: endDate ? moment(endDate).format('YYYY-MM-DD') : '',
				...rest,
			})
		);
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	const { validation, formFields } = useForm({
		initialValues: filterValues(),
		validationSchema: filterValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields(),
	});

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
	};

	useEffect(() => {
		if (!isFirst.current && !isEqual(validation.values, prevValues.current)) {
			setIsFilterChanged(true);
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			prevValues.current = validation.values;
		}
		isFirst.current = false;
		if (isEqual(filterValues(), validation.values)) {
			setIsFilterChanged(false);
		}
		return () => clearTimeout(debounce);
	}, [validation.values]);

	const actionButtons = useMemo(() => [
		// {
		// 	// type: 'button', // if you pass type button handle the click event
		// 	label: 'Filter',
		// 	icon: 'bx bx-filter-alt',
		// 	// handleClick: handleFilter,
		// },
		{
			type: 'button', // if you pass type button handle the click event
			label: '',
			icon: 'mdi mdi-refresh',
			handleClick: handleClear,
			tooltip: 'Clear filter',
			id: 'clear',
		},
		// {
		// 	type: 'button',
		// 	label: 'Advance',
		// 	icon: 'bx bx-add-to-queue',
		// 	handleClick: handleAdvance,
		// 	color: 'btn-secondary',
		// },
	]);

	return {
		toggleAdvance,
		isAdvanceOpen,
		filterFields: formFields,
		actionButtons,
		filterValidation: validation,
		isFilterChanged,
	};
};

export default useFilters;
