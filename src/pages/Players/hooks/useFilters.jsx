import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
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
import { debounceTime, itemsPerPage } from '../../../constants/config';

let debounce;
const useFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);
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
		initialValues: filterValues(),
		validationSchema: filterValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields(),
	});

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
	};

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
		if (userTags && !isEmpty(countries) && !isEmpty(languages)) {
			const tags = userTags?.map((userTag) => ({
				optionLabel: userTag?.tag,
				value: userTag.id,
			}));
			const countriesData = countries?.countries?.map((country) => ({
				optionLabel: country?.name,
				value: country.id,
			}));
			const languageData = languages?.languages?.map((language) => ({
				optionLabel: language?.name,
				value: language.id,
			}));
			setFormFields([
				...staticFiltersFields(),
				{
					name: 'tagId',
					fieldType: 'select',
					label: '',
					placeholder: 'Select tag',
					optionList: tags,
				},
				{
					name: 'languageId',
					fieldType: 'select',
					label: '',
					placeholder: 'Select Language',
					optionList: languageData,
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
	}, [userTags, countries, languages]);

	useEffect(() => {
		if (!isFirst.current && !isEqual(validation.values, prevValues.current)) {
			setIsFilterChanged(true);
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			prevValues.current = validation.values;
		}
		isFirst.current = false;
		if (isEqual(filterValues(), validation.values)) {
			setIsFilterChanged(false);
		}
		return () => clearTimeout(debounce);
	}, [validation.values]);

	const actionButtons = useMemo(() => [
		// {
		// 	// type: 'button', // if you pass type button handle the click event
		// 	label: 'Filter',
		// 	icon: 'bx bx-filter-alt',
		// 	// handleClick: handleFilter,
		// },
		{
			type: 'button', // if you pass type button handle the click event
			label: '',
			icon: 'mdi mdi-refresh',
			handleClick: handleClear,
			tooltip: 'Clear filter',
			id: 'clear',
		},
		// {
		// 	type: 'button',
		// 	label: 'Advance',
		// 	icon: 'bx bx-add-to-queue',
		// 	handleClick: handleAdvance,
		// 	color: 'btn-secondary',
		// },
	]);

	return {
		toggleAdvance,
		isAdvanceOpen,
		filterFields: formFields,
		actionButtons,
		filterValidation: validation,
		isFilterChanged,
	};
};

export default useFilters;
