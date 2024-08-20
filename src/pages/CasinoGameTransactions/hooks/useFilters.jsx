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
import { fetchGameTransactionsStart } from '../../../store/gameTransactions/actions';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import CustomFilters from '../../../components/Common/CustomFilters';

const keyMapping = {
	gameName: 'Game Name',
	tab: 'Tab',
	toDate: 'Registration till',
	fromDate: 'Registration from',
	dateOptions: 'Date Options',
	orderBy: 'Order By',
};

const gameOrderByMapping = {
	totalBetAmount: 'Top wagered',
	totalPlayers: 'Most played',
	totalWinAmount: 'Top payout',
};

const tabsTypeMapping = {
	game: 'Game',
	provider: 'Provider',
};

const useFilters = () => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);

	const fetchData = (values) => {
		dispatch(
			fetchGameTransactionsStart({
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
			case 'tab':
				formattedValue = tabsTypeMapping[value] || value;
				break;
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

	return {
		filterFields: formFields,
		filterValidation: validation,
		filterComponent,
		selectedFiltersComponent,
	};
};

export default useFilters;
