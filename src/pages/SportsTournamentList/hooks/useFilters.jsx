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
	getSportsCountries,
	getSportsList,
	getSportsTournamentList,
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
		if (isEmpty(sportsCountries)) {
			dispatch(
				getSportsCountries({
					// perPage: itemsPerPage,
					// page: 1,
				})
			);
		}
		if (isEmpty(sportsListInfo)) {
			dispatch(
				getSportsList({
					perPage: itemsPerPage,
					page: 1,
				})
			);
		}
	}, []);

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

	useEffect(() => {
		if (!isEmpty(sportsCountries) && !isEmpty(sportsListInfo)) {
			const countryList = sportsCountries?.rows?.map((row) => ({
				optionLabel: row?.name,
				value: row?.id,
			}));

			const sportList = sportsListInfo?.rows?.map((row) => ({
				optionLabel: row?.name,
				value: row?.id,
			}));

			setFormFields([
				...staticFiltersFields(),
				{
					name: 'providerCountryId',
					fieldType: 'select',
					label: '',
					placeholder: 'Country',
					optionList: countryList,
				},
				{
					name: 'providerSportId',
					fieldType: 'select',
					label: '',
					placeholder: 'Sports',
					optionList: sportList,
				},
			]);
		}
	}, [sportsCountries, sportsListInfo]);

	const actionButtons = useMemo(() => [
		{
			type: 'button', // if you pass type button handle the click event
			label: '',
			icon: 'mdi mdi-refresh',
			handleClick: handleClear,
			tooltip: 'Clear filter',
			id: 'clear',
		},
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
