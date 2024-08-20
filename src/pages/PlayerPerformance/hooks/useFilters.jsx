/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';
import { fetchCurrenciesStart } from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import { fetchPlayerPerformanceStart } from '../../../store/playerPerformance/actions';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import CustomFilters from '../../../components/Common/CustomFilters';
import TableSearchInput from '../../../components/Common/TableSearchInput';

const keyMapping = {
	searchString: 'Search',
	currencyId: 'Currency Id',
	toDate: 'Registration till',
	fromDate: 'Registration from',
	dateOptions: 'Date Options',
	orderBy: 'Order By',
};

const gameOrderByMapping = {
	total_casino_bet: 'Top Casino Wagerer',
	total_sb_bet: 'Top SportsBook Wagerer',
	profit: 'Highest Profit Players',
	total_deposit: 'Top Depositor',
	total_withdraw: 'Top Withdrawer',
};

const useFilters = () => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);

	const fetchData = (values) => {
		dispatch(
			fetchPlayerPerformanceStart({
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
		staticFormFields: staticFiltersFields(),
	});

	useEffect(() => {
		if (!currencies) {
			dispatch(fetchCurrenciesStart());
		}
	}, []);

	useEffect(() => {
		if (currencies) {
			const currencyOptions = currencies?.currencies?.map((currency) => ({
				optionLabel: currency.code,
				value: currency.id,
			}));

			setFormFields([
				...staticFiltersFields(),
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
			case 'toDate':
			case 'fromDate': {
				const date = new Date(value);
				formattedValue = date.toLocaleDateString('en-GB');
				break;
			}
			case 'orderBy':
				formattedValue = gameOrderByMapping[value] || value;
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
		filterValidation: validation,
		selectedFiltersComponent,
		filterComponent,
		customSearchInput,
	};
};

export default useFilters;
