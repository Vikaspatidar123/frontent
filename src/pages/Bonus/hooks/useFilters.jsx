/* eslint-disable eqeqeq */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getAllTags, getBonusesStart } from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import CustomFilters from '../../../components/Common/CustomFilters';

const keyMapping = {
	bonusType: 'Status',
	search: 'Search',
	isActive: 'Status',
	tagIds: 'Segments',
};

const isStatusMapping = {
	true: 'Active',
	false: 'In-Active',
};

const bonusTypesMapper = {
	freespins: 'FREESPINS',
	deposit: 'DEPOSIT',
	joining: 'JOINING',
	bet: 'BET',
};

const useFilters = () => {
	const dispatch = useDispatch();
	const { userTags } = useSelector((state) => state.UserDetails);

	const fetchData = (values) => {
		dispatch(
			getBonusesStart({
				perPage: itemsPerPage,
				page: 1,
				...values,
			})
		);
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	useEffect(() => {
		if (!userTags) {
			dispatch(getAllTags());
		}
	}, []);

	const { validation, formFields, setFormFields } = useForm({
		initialValues: filterValues(),
		validationSchema: filterValidationSchema(),
		staticFormFields: staticFiltersFields(),
	});

	useEffect(() => {
		if (!isEmpty(userTags)) {
			const tags = userTags?.tags?.map((userTag) => ({
				optionLabel: userTag?.tag,
				value: userTag.id,
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
			]);
		}
	}, [userTags]);

	const filterFormatter = (key, value) => {
		const formattedKey = keyMapping[key] || key;

		let formattedValue = value;

		switch (key) {
			case 'isActive':
				formattedValue = isStatusMapping[value];
				break;
			case 'tagIds':
				formattedValue =
					userTags?.tags?.find((tag) => tag.id == value)?.tag || '';
				break;
			case 'bonusType':
				formattedValue = bonusTypesMapper[value];
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
			searchInputPlaceHolder="Search by Title"
			searchInputName="search"
		/>
	);

	return {
		filterFields: formFields,
		filterValidation: validation,
		filterComponent,
		selectedFiltersComponent,
	};
};

export default useFilters;
