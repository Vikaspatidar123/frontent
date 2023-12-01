import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchCountriesStart,
	resetCountriesData,
	updateCountryStatusStart,
} from '../../../store/actions';

const useCountriesListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const {
		countries,
		loading: isCountriesLoading,
		editCountriesSuccess: isEditCurrencySuccess,
	} = useSelector((state) => state.Countries);

	const fetchData = () =>
		dispatch(
			fetchCountriesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...filterValues,
			})
		);

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	// resetting country list redux state
	useEffect(() => () => dispatch(resetCountriesData()), []);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const formattedCountries = useMemo(() => {
		const formattedValues = [];
		if (countries) {
			countries?.rows?.map((country) =>
				formattedValues.push({
					...country,
					countryName: country.name,
					language: country.language.languageName,
					countryCode: country.code,
				})
			);
		}
		return formattedValues;
	}, [countries]);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { status, countryId } = props;
		dispatch(
			updateCountryStatusStart({
				code: 'COUNTRY',
				countryId,
				status: !status,
			})
		);
	};

	useEffect(() => {
		if (isEditCurrencySuccess) fetchData();
	}, [isEditCurrencySuccess]);

	return {
		currentPage,
		setCurrentPage,
		totalCountriesCount: countries?.count,
		isCountriesLoading,
		formattedCountries,
		itemsPerPage,
		handleStatus,
		onChangeRowsPerPage,
	};
};

export default useCountriesListing;
