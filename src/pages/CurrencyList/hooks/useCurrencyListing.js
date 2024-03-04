import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchCurrenciesStart,
	resetCurrenciesData,
} from '../../../store/actions';

const useCurrencyListing = () => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const {
		currencies,
		loading: isCurrenciesLoading,
		isCreateCurrencySuccess,
		isEditCurrencySuccess,
	} = useSelector((state) => state.Currencies);

	const fetchData = () => {
		dispatch(
			fetchCurrenciesStart({
				perPage: itemsPerPage,
				page: currentPage,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	// resetting currency list redux state
	useEffect(() => () => dispatch(resetCurrenciesData()), []);

	useEffect(() => {
		if (isEditCurrencySuccess) fetchData();
	}, [isEditCurrencySuccess]);

	const formattedCurrencies = useMemo(() => {
		const formattedValues = [];
		if (currencies) {
			currencies.rows.map((currency) =>
				formattedValues.push({
					...currency,
					primary: currency.isPrimary ? 'YES' : 'NO',
				})
			);
		}
		return formattedValues;
	}, [currencies]);

	useEffect(() => {
		if (isCreateCurrencySuccess) fetchData();
	}, [isCreateCurrencySuccess]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return {
		currentPage,
		setCurrentPage,
		totalCurrenciesCount: currencies?.count,
		isCurrenciesLoading,
		formattedCurrencies,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useCurrencyListing;
