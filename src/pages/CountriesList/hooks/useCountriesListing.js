import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchCountriesStart,
	updateCountryStatusStart,
} from '../../../store/actions';

const itemsPerPage = 10;

const useCountriesListing = () => {
	const dispatch = useDispatch();
	const [name, setName] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [active, setActive] = useState(false);
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
	}, [currentPage, name, active]);

	const formattedCountries = useMemo(() => {
		const formattedValues = [];
		if (countries) {
			countries.rows.map((country) =>
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
		setActive((prev) => !prev);
		dispatch(
			updateCountryStatusStart({
				data: {
					code: 'COUNTRY',
					countryId,
					status: !status,
				},
				limit: itemsPerPage,
				pageNo: currentPage,
				isActive: status,
				name,
				kycMethod: '',
			})
		);
	};

	return {
		name,
		setName,
		currentPage,
		setCurrentPage,
		totalCountriesCount: countries?.count,
		isCountriesLoading,
		formattedCountries,
		itemsPerPage,
		handleStatus,
	};
};

export default useCountriesListing;
