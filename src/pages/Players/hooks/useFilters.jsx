/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { isEmpty } from 'lodash';
import CustomFilters from '../../../components/Common/CustomFilters';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	fetchCountriesStart,
	fetchLanguagesStart,
	fetchPlayersStart,
	getAllTags,
} from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import TableSearchInput from '../../../components/Common/TableSearchInput';

const keyMapping = {
	kycStatus: 'KYC Status',
	isActive: 'Active',
	toDate: 'Registration till',
	fromDate: 'Registration from',
	tagIds: 'Segment',
	countryId: 'Country',
	searchString: 'Search',
	dateOfBirth: 'Date of Birth',
	userId: 'User Id',
	gender: 'Gender',
};

const isActiveMapping = {
	true: 'Yes',
	false: 'No',
};
const isKycStatusMapping = {
	true: 'Approved',
	false: 'Pending',
};

const useFilters = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const { userTags } = useSelector((state) => state.UserDetails);
	const { countries } = useSelector((state) => state.Countries);
	const { languages } = useSelector((state) => state.Languages);

	const fetchData = (values) => {
		dispatch(
			fetchPlayersStart({
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
		initialValues: filterValues(location?.state?.Segment?.id),
		validationSchema: filterValidationSchema(),
		staticFormFields: staticFiltersFields(),
	});

	useEffect(() => {
		if (!userTags) {
			dispatch(getAllTags());
		}

		if (isEmpty(countries)) {
			dispatch(fetchCountriesStart());
		}

		if (isEmpty(languages)) {
			dispatch(fetchLanguagesStart({}));
		}
	}, []);

	useEffect(() => {
		if (!isEmpty(countries) && !isEmpty(languages)) {
			const tags = userTags?.tags?.map((userTag) => ({
				optionLabel: userTag?.tag,
				value: userTag.id,
			}));
			const countriesData = countries?.countries?.map((country) => ({
				optionLabel: country?.name,
				value: country.id,
			}));
			setFormFields([
				...staticFiltersFields(),
				{
					name: 'tagIds',
					fieldType: 'select',
					label: '',
					placeholder: 'Select Segment',
					optionList: tags,
				},
				{
					name: 'countryId',
					fieldType: 'select',
					label: '',
					placeholder: 'Select Country',
					optionList: countriesData,
				},
			]);
		}
	}, [countries, languages, userTags]);

	const filterFormatter = (key, value) => {
		const formattedKey = keyMapping[key] || key;

		let formattedValue = value;

		switch (key) {
			case 'kycStatus':
				formattedValue = isKycStatusMapping[value];
				break;
			case 'isActive':
				formattedValue = isActiveMapping[value] || value;
				break;
			case 'toDate':
			case 'fromDate':
			case 'dateOfBirth': {
				const date = new Date(value);
				formattedValue = date.toLocaleDateString('en-GB');
				break;
			}
			case 'tagIds':
				formattedValue =
					userTags?.tags?.find((tag) => tag.id == value)?.tag || '';
				break;
			case 'countryId':
				formattedValue =
					countries?.countries?.find((country) => country.id == value)?.name ||
					'';
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

	const customSearchInput = (
		<TableSearchInput
			validation={validation}
			placeholder="Search by username"
		/>
	);

	return {
		filterFields: formFields,
		filterValues,
		handleFilter,
		filterValidation: validation,
		filterComponent,
		customSearchInput,
		selectedFiltersComponent,
	};
};

export default useFilters;
