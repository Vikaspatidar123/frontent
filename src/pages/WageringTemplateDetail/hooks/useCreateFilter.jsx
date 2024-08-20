import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getCasinoProvidersDataStart,
	getWageringTemplateDetails,
} from '../../../store/actions';
import {
	debounceTime,
	itemsPerPage,
	selectedLanguage,
} from '../../../constants/config';

let debounce;
const useCreateFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);
	const { casinoProvidersData } = useSelector(
		(state) => state.CasinoManagementData
	);

	const fetchData = (values) => {
		dispatch(
			getWageringTemplateDetails({
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
		if (!casinoProvidersData?.providers) {
			dispatch(getCasinoProvidersDataStart());
		}
	}, []);

	useEffect(() => {
		const providerField = casinoProvidersData?.providers?.map((row) => ({
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
		]);
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
		if (isEqual(filterValues(), validation.values)) {
			setIsFilterChanged(false);
		}
		return () => clearTimeout(debounce);
	}, [validation.values]);

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
	};

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
		casinoProvidersData,
	};
};

export default useCreateFilters;
