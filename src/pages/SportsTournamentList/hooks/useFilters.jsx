import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getSportsCountries,
	getSportsList,
	getSportsTournamentList,
} from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import CustomFilters from '../../../components/Common/CustomFilters';

const keyMapping = {
	searchString: 'Search',
	locationId: 'Location',
	sportId: 'Sport',
};

const useFilters = () => {
	const dispatch = useDispatch();

	const { sportsCountries, sportsListInfo } = useSelector(
		(state) => state.SportsList
	);

	const fetchData = (values) => {
		dispatch(
			getSportsTournamentList({
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

	const filterFormatter = (key, value) => {
		const formattedKey = keyMapping[key] || key;
		let formattedValue = value;
		switch (key) {
			case 'locationId':
				formattedValue =
					sportsCountries?.locations?.find((val) => val.id === value)?.name ||
					'';
				break;
			case 'sportId':
				formattedValue =
					sportsListInfo?.sports?.find((val) => val.id === value)?.name || '';
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
			searchInputPlaceHolder="Search by name"
		/>
	);

	useEffect(() => {
		if (!sportsCountries?.locations) {
			dispatch(getSportsCountries({}));
		}
		if (!sportsListInfo?.sports) {
			dispatch(
				getSportsList({
					perPage: itemsPerPage,
					page: 1,
				})
			);
		}
	}, []);

	useEffect(() => {
		if (sportsCountries?.locations && sportsListInfo?.sports) {
			const countryList = sportsCountries?.locations?.map((row) => ({
				optionLabel: row?.name,
				value: row?.id,
			}));

			const sportList = sportsListInfo?.sports?.map((row) => ({
				optionLabel: row?.name,
				value: row?.id,
			}));

			setFormFields([
				...staticFiltersFields(),
				{
					name: 'locationId',
					fieldType: 'select',
					label: '',
					placeholder: 'Country',
					optionList: countryList,
				},
				{
					name: 'sportId',
					fieldType: 'select',
					label: '',
					placeholder: 'Sports',
					optionList: sportList,
				},
			]);
		}
	}, [sportsCountries, sportsListInfo]);

	return {
		filterValidation: validation,
		filterComponent,
		selectedFiltersComponent,
	};
};

export default useFilters;
