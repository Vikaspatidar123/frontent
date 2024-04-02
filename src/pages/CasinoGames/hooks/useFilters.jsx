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
	getCasinoGamesStart,
	getCasinoProvidersDataStart,
	getCasinoSubCategoryDetailStart,
} from '../../../store/actions';
import {
	debounceTime,
	itemsPerPage,
	selectedLanguage,
} from '../../../constants/config';

let debounce;
const useFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);

	const { casinoSubCategoryDetails, casinoProvidersData } = useSelector(
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

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
	};

	useEffect(() => {
		if (!casinoSubCategoryDetails?.subCategories) {
			dispatch(
				getCasinoSubCategoryDetailStart({
					// perPage: itemsPerPage,
				})
			);
		}

		if (!casinoProvidersData?.providers) {
			dispatch(
				getCasinoProvidersDataStart({
					// perPage: itemsPerPage,
				})
			);
		}
	}, []);

	useEffect(() => {
		if (
			!isEmpty(casinoProvidersData?.providers) &&
			!isEmpty(casinoSubCategoryDetails?.subCategories)
		) {
			const subCategoryField = casinoSubCategoryDetails?.subCategories?.map(
				(row) => ({
					optionLabel: row.name[selectedLanguage],
					value: row.id,
				})
			);

			const providerField = casinoProvidersData?.providers?.map((row) => ({
				optionLabel: row.name[selectedLanguage],
				value: row.id,
			}));

			setFormFields([
				...staticFiltersFields(),
				{
					name: 'casinoSubCategoryId',
					fieldType: 'select',
					label: '',
					placeholder: 'Sub Category',
					optionList: subCategoryField,
				},
				{
					name: 'casinoProviderId',
					fieldType: 'select',
					label: '',
					placeholder: 'Provider',
					optionList: providerField,
				},
			]);
		}
	}, [casinoProvidersData, casinoSubCategoryDetails]);

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
