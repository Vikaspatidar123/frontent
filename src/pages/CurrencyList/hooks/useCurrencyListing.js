import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrenciesStart } from '../../../store/actions';

const itemsPerPage = 10;

const useCurrencyListing = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const {
		currencies,
		loading: isCurrenciesLoading,
		isCreateCurrencySuccess,
	} = useSelector((state) => state.Currencies);

	const fetchData = () => {
		dispatch(
			fetchCurrenciesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [currentPage]);

	const formattedCurrencies = useMemo(() => {
		const formattedValues = [];
		if (currencies) {
			currencies.rows.map((currency) =>
				formattedValues.push({
					...currency,
					type: currency.type === 1 ? 'Fiat' : 'Crypto',
					primary: currency.isPrimary ? 'YES' : 'NO',
				})
			);
		}
		return formattedValues;
	}, [currencies]);

	useEffect(() => {
		if (isCreateCurrencySuccess) fetchData();
	}, [isCreateCurrencySuccess]);

	return {
		currentPage,
		setCurrentPage,
		totalCurrenciesCount: currencies?.count,
		isCurrenciesLoading,
		formattedCurrencies,
		itemsPerPage,
	};
};

export default useCurrencyListing;
