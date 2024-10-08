/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';
import { fetchCurrenciesStart, getAllTags } from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import { fetchSportsTransactionsStart } from '../../../store/sportsTransactions/actions';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import CustomFilters from '../../../components/Common/CustomFilters';

const keyMapping = {
	transactionId: 'Transaction Id',
	searchString: 'Search',
	purpose: 'Transaction Type',
	status: 'Status',
	toDate: 'To',
	fromDate: 'From',
	betId: 'Bet Id',
	betType: 'Bet Type',
	gameId: 'Game id',
	actioneeId: 'Actionee Id',
	previousTransactionId: 'Previous Transaction Id',
	walletId: 'Wallet Id',
	conversionRate: 'Conversion Id',
	currencyId: 'Currency',
	tagId: 'Segments',
};

const isStatusMapping = {
	pending: 'Pending',
	completed: 'Complete',
	failes: 'Failed',
};

const purposeMapping = {
	SportsbookBet: 'SportsBook Bet',
	SportsbookWin: 'SportsBook Win',
	SportsbookRefund: 'SportsBook Refund',
	SportsbookExchangeBet: 'SportsBook Exchange Bet',
	SportsbookCashout: 'SportsBook',
	SportsbookExchangeWin: 'SportsBook Exchange Win',
	SportsbookExchangeRefund: 'SportsBook Exchange Refund',
	SportsbookExchangeCashout: 'SportsBook Exchange Cashout',
};

const betTypeMapping = {
	exchange: 'Exchange',
	sportsbook: 'Sportsbook',
};

const useFilters = (userId = '') => {
	const dispatch = useDispatch();
	const { userTags } = useSelector((state) => state.UserDetails);
	const { currencies } = useSelector((state) => state.Currencies);

	const fetchData = (values) => {
		dispatch(
			fetchSportsTransactionsStart({
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
		// onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields(userId),
		enableReinitialize: false,
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
		if (userTags?.tags && currencies) {
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
	}, [userTags, currencies]);

	const filterFormatter = (key, value) => {
		const formattedKey = keyMapping[key] || key;

		let formattedValue = value;

		switch (key) {
			case 'status':
				formattedValue = isStatusMapping[value];
				break;
			case 'purpose':
				formattedValue = purposeMapping[value] || value;
				break;
			case 'betType':
				formattedValue = betTypeMapping[value] || value;
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

	const handleResetCallback = () => {
		validation.resetForm({ values: { ...filterValues(), currencyId: null } });
	};

	const selectedFiltersComponent = (
		<SelectedFilters
			validation={validation}
			filterFormatter={filterFormatter}
			handleResetCallback={handleResetCallback}
		/>
	);

	const filterComponent = (
		<CustomFilters
			filterFields={formFields}
			validation={validation}
			handleFilter={handleFilter}
			showSearchInput={false}
		/>
	);

	return {
		filterFields: formFields,
		filterValidation: validation,
		selectedFiltersComponent,
		filterComponent,
	};
};

export default useFilters;
