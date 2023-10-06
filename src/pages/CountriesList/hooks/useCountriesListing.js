import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCountriesStart } from '../../../store/actions';

const itemsPerPage = 10;

const useCountriesListing = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const { countries, loading: isCountriesLoading } = useSelector(
		(state) => state.Countries
	);

	useEffect(() => {
		dispatch(
			fetchCountriesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				name,
			})
		);
	}, [currentPage, name]);

	const formattedCountries = useMemo(() => {
		const formattedValues = [];
		if (countries) {
			countries.rows.map((country) =>
				formattedValues.push({
					...country,
					countryName: country.name,
					language: country.language.languageName,
					countryCode: country.code,
					status: country.status ? 'Active' : 'Not Active',
				})
			);
		}
		return formattedValues;
	}, [countries]);

	return {
		name,
		setName,
		currentPage,
		setCurrentPage,
		totalCountriesCount: countries?.count,
		isCountriesLoading,
		formattedCountries,
		itemsPerPage,
	};
};

export default useCountriesListing;
