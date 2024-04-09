import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	fetchCasinoTransactionsStart,
	getAllTags,
	// fetchCurrenciesStart,
} from '../../../store/actions';
import { debounceTime, itemsPerPage } from '../../../constants/config';

let debounce;
const useFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	// const { currencies } = useSelector((state) => state.Currencies);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);
	const { userTags } = useSelector((state) => state.UserDetails);

	const fetchData = (values) => {
		dispatch(
			fetchCasinoTransactionsStart({
				perPage: itemsPerPage,
				page: 1,
				...values,
			})
		);
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	const { validation, formFields, setFormFields } = useForm({
		initialValues: filterValues(),
		validationSchema: filterValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields(),
	});

	// const handleAdvance = () => {
	//   toggleAdvance();
	// };

	useEffect(() => {
		if (isEmpty(userTags)) {
			dispatch(getAllTags());
		} else {
			const tags = userTags?.map((row) => ({
				optionLabel: row?.tag,
				value: row.id,
			}));

			setFormFields([
				...staticFiltersFields(),
				{
					name: 'tagId',
					fieldType: 'select',
					label: '',
					placeholder: 'Select tag',
					optionList: tags,
				},
			]);
		}
	}, [userTags]);

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

	// useEffect(() => {
	// 	if (isEmpty(currencies)) {
	// 		dispatch(
	// 			fetchCurrenciesStart({
	// 				// perPage: itemsPerPage,
	// 				// page: page,
	// 			})
	// 		);
	// 	} else {
	// 		const currencyField = currencies?.rows?.map((row) => ({
	// 			optionLabel: row.name,
	// 			value: row.code,
	// 		}));
	// 		setFormFields([
	// 			{
	// 				name: 'currencyCode',
	// 				fieldType: 'select',
	// 				label: '',
	// 				placeholder: 'Select a currency',
	// 				optionList: currencyField,
	// 			},
	// 			...staticFiltersFields(),
	// 		]);
	// 	}
	// }, [currencies]);

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

export default useFilters;
