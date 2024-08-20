/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	fetchCurrenciesStart,
	fetchTransactionBankingStart,
	getAllTags,
} from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import CustomFilters from '../../../components/Common/CustomFilters';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import TableSearchInput from '../../../components/Common/TableSearchInput';

const keyMapping = {
	status: 'Status',
	fromDate: 'Registration from',
	toDate: 'Registration till',
	type: 'Type',
	purpose: 'Purpose',
	tagIds: 'Segment',
	currencyId: 'Currency Id',
	searchString: 'Search',
};

const iskycStatusMapping = {
	completed: 'Completed',
	pending: 'Pending',
};

const useFilters = (userId = '') => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);
	const { userTags } = useSelector((state) => state.UserDetails);

	const fetchData = (values) => {
		dispatch(
			fetchTransactionBankingStart({
				perPage: itemsPerPage,
				page: 1,
				userId,
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
		staticFormFields: staticFiltersFields(userId),
	});

	useEffect(() => {
		if (!userTags) {
			dispatch(getAllTags());
		}
		if (!currencies) {
			dispatch(fetchCurrenciesStart());
		}
	}, []);

	useEffect(() => {
		if (currencies) {
			const tags = userTags?.tags?.map((row) => ({
				optionLabel: row?.tag,
				value: row.id,
			}));

			const currencyOptions = currencies?.currencies?.map((currency) => ({
				optionLabel: currency.code,
				value: currency.id,
			}));

			setFormFields([
				...staticFiltersFields(userId),
				{
					name: 'tagIds',
					fieldType: 'select',
					label: '',
					placeholder: 'Select Segment',
					optionList: tags,
				},
				{
					name: 'currencyId',
					fieldType: 'select',
					label: '',
					placeholder: 'Select currency',
					optionList: currencyOptions,
				},
			]);
		}
	}, [currencies]);

	const filterFormatter = (key, value) => {
		const formattedKey = keyMapping[key] || key;

		let formattedValue = value;

		switch (key) {
			case 'status':
				formattedValue = iskycStatusMapping[value];
				break;
			case 'toDate':
			case 'fromDate': {
				const date = new Date(value);
				formattedValue = date.toLocaleDateString('en-GB');
				break;
			}
			case 'tagIds':
				formattedValue =
					userTags?.tags?.find((tag) => tag.id == value)?.tag || '';
				break;
			case 'currencyId':
				formattedValue =
					currencies?.currencies?.find((currency) => currency.id == value)
						?.code || '';
				break;
			default:
				break;
		}

		return `${formattedKey}: ${formattedValue}`;
	};

	const selectedFiltersComponent = (
		<SelectedFilters
			validation={validation}
			filterFormatter={filterFormatter}
		/>
	);

	const filterComponent = (
		<CustomFilters
			filterFields={formFields}
			validation={validation}
			handleFilter={handleFilter}
		/>
	);

	const customSearchInput = (
		<TableSearchInput
			validation={validation}
			placeholder="Search by username"
		/>
	);

	return {
		filterFields: formFields,
		filterValues,
		handleFilter,
		filterValidation: validation,
		filterComponent,
		customSearchInput,
		selectedFiltersComponent,
	};
};

export default useFilters;
