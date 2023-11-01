import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	fetchCasinoTransactionsStart,
	fetchCurrenciesStart,
} from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';

const useFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const { currencies } = useSelector((state) => state.Currencies);

	const fetchData = (values) => {
		dispatch(
			fetchCasinoTransactionsStart({
				limit: itemsPerPage,
				pageNo: 1,
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
		onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields(),
	});

	const handleAdvance = () => {
		toggleAdvance();
	};

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
		fetchData(initialValues);
	};

	useEffect(() => {
		if (isEmpty(currencies)) {
			dispatch(
				fetchCurrenciesStart({
					// limit: itemsPerPage,
					// pageNo: page,
				})
			);
		} else {
			const currencyField = currencies?.rows?.map((row) => ({
				optionLabel: row.name,
				value: row.code,
			}));
			setFormFields([
				{
					name: 'currencyCode',
					fieldType: 'select',
					label: '',
					placeholder: 'Select a currency',
					optionList: currencyField,
				},
				...staticFiltersFields(),
			]);
		}
	}, [currencies]);

	const actionButtons = useMemo(() => [
		{
			// type: 'button', // if you pass type button handle the click event
			label: 'Filter',
			icon: 'bx bx-filter-alt',
			// handleClick: handleFilter,
		},
		{
			type: 'button', // if you pass type button handle the click event
			label: 'Clear',
			icon: 'mdi mdi-close-thick',
			handleClick: handleClear,
		},
		{
			type: 'button',
			label: 'Advance',
			icon: 'bx bx-add-to-queue',
			handleClick: handleAdvance,
			color: 'btn-secondary',
		},
	]);

	return {
		toggleAdvance,
		isAdvanceOpen,
		filterFields: formFields,
		actionButtons,
		filterValidation: validation,
	};
};

export default useFilters;
