import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getCasinoCategoryDetailStart,
	getCasinoGamesStart,
	getCasinoProvidersDataStart,
} from '../../../store/actions';
import { itemsPerPage, selectedLanguage } from '../../../constants/config';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import CustomFilters from '../../../components/Common/CustomFilters';
import { ACTIVE_KEY_MAP } from '../../../constants/common';

const keyMapping = {
	searchString: 'Search',
	isActive: 'Status',
	isFeatured: 'Featured',
	casinoProviderId: 'Provider',
	casinoCategoryId: 'Category',
};

const useFilters = () => {
	const dispatch = useDispatch();

	const { casinoProvidersData, casinoCategoryDetails } = useSelector(
		(state) => state.CasinoManagementData
	);
	const fetchData = (values) => {
		dispatch(
			getCasinoGamesStart({
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
		// onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields(),
	});

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };

	useEffect(() => {
		if (!casinoCategoryDetails?.categories) {
			dispatch(getCasinoCategoryDetailStart());
		}

		if (!casinoProvidersData?.providers) {
			dispatch(getCasinoProvidersDataStart());
		}
	}, []);

	useEffect(() => {
		if (casinoProvidersData?.providers && casinoCategoryDetails?.categories) {
			const providerField = casinoProvidersData?.providers?.map((row) => ({
				optionLabel: row.name[selectedLanguage],
				value: row.id,
			}));

			const categoryField = casinoCategoryDetails?.categories?.map((row) => ({
				optionLabel: row.name[selectedLanguage],
				value: row.id,
			}));

			setFormFields([
				...staticFiltersFields(),
				{
					name: 'casinoProviderId',
					fieldType: 'select',
					label: '',
					placeholder: 'Provider',
					optionList: providerField,
				},
				{
					name: 'casinoCategoryId',
					fieldType: 'select',
					label: '',
					placeholder: 'Category',
					optionList: categoryField,
				},
			]);
		}
	}, [casinoProvidersData]);

	const filterFormatter = (key, value) => {
		const formattedKey = keyMapping[key] || key;
		let formattedValue = value;
		switch (key) {
			case 'isActive':
				formattedValue = ACTIVE_KEY_MAP[value] || value;
				break;
			case 'isFeatured':
				formattedValue = ACTIVE_KEY_MAP[value] || value;
				break;
			case 'casinoProviderId':
				formattedValue =
					casinoProvidersData?.providers?.find((row) => row?.id === value)
						?.name[selectedLanguage] || '';
				break;
			case 'casinoCategoryId':
				formattedValue =
					casinoCategoryDetails?.categories?.find((row) => row?.id === value)
						?.name[selectedLanguage] || '';
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
	return {
		filterValidation: validation,
		selectedFiltersComponent,
		filterComponent,
	};
};

export default useFilters;
