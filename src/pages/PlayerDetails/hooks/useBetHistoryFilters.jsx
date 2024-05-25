import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { isEqual } from 'lodash';
import { useParams } from 'react-router-dom';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';
import { fetchCasinoTransactionsStart } from '../../../store/actions';
import { debounceTime, itemsPerPage } from '../../../constants/config';

let debounce;
const useBetHistoryFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	// const { currencies } = useSelector((state) => state.Currencies);
	const { playerId } = useParams();
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);

	const fetchData = (values) => {
		dispatch(
			fetchCasinoTransactionsStart({
				perPage: itemsPerPage,
				page: 1,
				userId: playerId,
				...values,
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
		if (!isFirst?.current && !isEqual(validation.values, prevValues.current)) {
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
		{
			type: 'button', // if you pass type button handle the click event
			label: '',
			icon: 'mdi mdi-refresh',
			handleClick: handleClear,
			tooltip: 'Clear filter',
			id: 'clear',
		},
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

export default useBetHistoryFilters;
