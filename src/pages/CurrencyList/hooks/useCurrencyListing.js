import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrenciesStart } from '../../../store/actions';

const itemsPerPage = 10;

const useCurrencyListing = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const { currencies, loading: isCurrenciesLoading } = useSelector(
		(state) => state.Currencies
	);

	useEffect(() => {
		dispatch(
			fetchCurrenciesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
			})
		);
	}, [currentPage]);

	const formattedCurrencies = useMemo(() => {
		const formattedValues = [];
		if (currencies) {
			currencies.rows.map((currency) =>
				formattedValues.push({
					...currency,
					// countryName: country.name,
					// language: country.language.languageName,
					// countryCode: country.code,
					// status: country.status ? 'Active' : 'Not Active',
				})
			);
		}
		return formattedValues;
	}, [currencies]);

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
