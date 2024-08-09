import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getAllTags, getBonusesStart } from '../../../store/actions';
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
		// onSubmitEntry: handleFilter,
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

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };
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
	};
};

export default useFilters;
