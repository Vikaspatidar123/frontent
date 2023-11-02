import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getBonusDetails } from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';
import { safeStringify } from '../../../utils/helpers';

const useFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);

	const fetchData = ({ bonusType, ...rest }) => {
		dispatch(
			getBonusDetails({
				limit: itemsPerPage,
				pageNo: 1,
				bonusType: bonusType ? safeStringify([bonusType]) : null,
				...rest,
			})
		);
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	const { validation, formFields } = useForm({
		initialValues: filterValues(),
		validationSchema: filterValidationSchema(),
		onSubmitEntry: handleFilter,
		staticFormFields: staticFiltersFields(),
	});

	const handleAdvance = () => {
		toggleAdvance();
	};

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
		fetchData(initialValues);
	};

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
