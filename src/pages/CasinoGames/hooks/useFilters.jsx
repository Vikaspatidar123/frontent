import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
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
import { itemsPerPage } from '../../../constants/config';

const useFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);

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
		onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields,
	});

	const handleAdvance = () => {
		toggleAdvance();
	};

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
		fetchData(initialValues);
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

	const actionButtons = useMemo(() => [
		{
			// type: 'button', // if you pass type button handle the click event
			label: 'Filter',
			icon: 'bx bx-filter-alt',
			// handleClick: handleFilter,
		},
		{
			type: 'button', // if you pass type button handle the click event
			label: 'Clear',
			icon: 'mdi mdi-close-thick',
			handleClick: handleClear,
		},
		{
			type: 'button',
			label: 'Advance',
			icon: 'bx bx-add-to-queue',
			handleClick: handleAdvance,
			color: 'btn-secondary',
		},
	]);

	return {
		toggleAdvance,
		isAdvanceOpen,
		filterFields: formFields,
		actionButtons,
		filterValidation: validation,
	};
};

export default useFilters;
