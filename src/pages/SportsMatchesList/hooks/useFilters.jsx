/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterValidationSchema,
	filterValues,
	MATCH_STATUS,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { fetchSportsMatchesStart, getSportsList } from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import CustomFilters from '../../../components/Common/CustomFilters';

const keyMapping = {
	searchString: 'Search',
	sportId: 'Sport',
	status: 'Match Status',
};

const useFilters = () => {
	const dispatch = useDispatch();

	const { sportsListInfo } = useSelector((state) => state.SportsList);

	const fetchData = (values) => {
		dispatch(
			fetchSportsMatchesStart({
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
		onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields(),
	});

	useEffect(() => {
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
		if (sportsListInfo?.sports?.length) {
			const sportList = sportsListInfo?.sports?.map((row) => ({
				optionLabel: row?.name,
				value: row?.id,
			}));

			setFormFields([
				...staticFiltersFields(),
				{
					name: 'sportId',
					fieldType: 'select',
					label: '',
					placeholder: 'Sports',
					optionList: sportList,
				},
			]);
		}
	}, [sportsListInfo]);

	const filterFormatter = (key, value) => {
		const formattedKey = keyMapping[key] || key;
		let formattedValue = value;
		switch (key) {
			case 'sportId':
				formattedValue =
					sportsListInfo?.sports?.find((val) => val.id == value)?.name || '';
				break;
			case 'status':
				formattedValue =
					MATCH_STATUS?.find((val) => val.value == value)?.optionLabel || '';
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
			searchInputPlaceHolder="Search by Tournament"
		/>
	);

	return {
		filterValidation: validation,
		filterComponent,
		selectedFiltersComponent,
	};
};

export default useFilters;
