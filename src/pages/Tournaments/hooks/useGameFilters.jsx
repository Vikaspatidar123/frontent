import { useEffect, useMemo, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
	gameFilterValidationSchema,
	gameFilterValues,
	staticGameFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	debounceTime,
	itemsPerPage,
	selectedLanguage,
} from '../../../constants/config';
import {
	getCasinoCategoryDetailStart,
	getCasinoGamesStart,
	getCasinoProvidersDataStart,
} from '../../../store/actions';

let debounce;
const useGameFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);
	const { casinoProvidersData, casinoCategoryDetails } = useSelector(
		(state) => state.CasinoManagementData
	);

	const fetchData = (values) => {
		dispatch(
			getCasinoGamesStart({
				page: 1,
				pageNo: itemsPerPage,
				...values,
			})
		);
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	const { validation, formFields, setFormFields } = useForm({
		initialValues: gameFilterValues(),
		validationSchema: gameFilterValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: staticGameFiltersFields(),
	});

	const handleClear = () => {
		const initialValues = gameFilterValues();
		validation.resetForm(initialValues);
	};

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
				...staticGameFiltersFields(),
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

	useEffect(() => {
		if (!isFirst.current && !isEqual(validation.values, prevValues.current)) {
			setIsFilterChanged(true);
			debounce = setTimeout(() => {
				handleFilter(validation.values);
			}, debounceTime);
			prevValues.current = validation.values;
		}
		isFirst.current = false;
		if (isEqual(gameFilterValues(), validation.values)) {
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

export default useGameFilters;
