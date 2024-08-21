import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getCasinoProvidersDataStart } from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import SelectedFilters from '../../../components/Common/SelectedFilters';
import CustomFilters from '../../../components/Common/CustomFilters';

const useFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const fetchData = (values) => {
		dispatch(
			getCasinoProvidersDataStart({
				perPage: itemsPerPage,
				page: 1,
				...values,
			})
		);
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	const { validation, formFields } = useForm({
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

	const selectedFiltersComponent = (
		// eslint-disable-next-line react/react-in-jsx-scope
		<SelectedFilters validation={validation} />
	);
	const filterComponent = (
		// eslint-disable-next-line react/react-in-jsx-scope
		<CustomFilters
			validation={validation}
			handleFilter={handleFilter}
			searchInputPlaceHolder="Search by Provider"
			hideCustomFilter
		/>
	);

	return {
		toggleAdvance,
		isAdvanceOpen,
		filterFields: formFields,
		actionButtons,
		filterValidation: validation,
		selectedFiltersComponent,
		filterComponent,
	};
};

export default useFilters;
