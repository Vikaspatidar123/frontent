import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrenciesStart } from '../../../store/actions';

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

	useEffect(() => {
		if (isEditCurrencySuccess) fetchData();
	}, [isEditCurrencySuccess]);

	const formattedCurrencies = useMemo(() => {
		const formattedValues = [];
		if (currencies) {
			currencies?.currencies?.map((currency) =>
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
		totalCurrenciesCount: currencies?.totalPages || 1,
		isCurrenciesLoading,
		formattedCurrencies,
		itemsPerPage,
		onChangeRowsPerPage,
	};
};

export default useCurrencyListing;
