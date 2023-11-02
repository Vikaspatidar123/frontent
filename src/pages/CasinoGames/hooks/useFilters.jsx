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
import { debounceTime, itemsPerPage } from '../../../constants/config';

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
				limit: itemsPerPage,
				pageNo: 1,
				// casinoCategoryId: selectedSubCategoryId,
				// search,
				// isActive: active,
				// tenantId: '',
				// selectedProvider,
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
		staticFormFields: staticFiltersFields,
	});

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
	};

	useEffect(() => {
		if (isEmpty(casinoSubCategoryDetails)) {
			dispatch(
				getCasinoSubCategoryDetailStart({
					limit: itemsPerPage,
				})
			);
		}

		if (isEmpty(casinoProvidersData)) {
			dispatch(
				getCasinoProvidersDataStart({
					limit: itemsPerPage,
				})
			);
		}
	}, []);

	useEffect(() => {
		if (!isEmpty(casinoProvidersData) && !isEmpty(casinoSubCategoryDetails)) {
			const subCategoryField = casinoSubCategoryDetails?.rows?.map((row) => ({
				optionLabel: row.name?.EN,
				value: row.gameSubCategoryId,
			}));

			const providerField = casinoProvidersData?.rows?.map((row) => ({
				optionLabel: row.name,
				value: row.casinoProviderId,
			}));

			setFormFields([
				...staticFiltersFields(),
				{
					name: 'gameSubCategoryId',
					fieldType: 'select',
					label: '',
					placeholder: 'Sub Category',
					optionList: subCategoryField,
				},
				{
					name: 'providerId',
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
