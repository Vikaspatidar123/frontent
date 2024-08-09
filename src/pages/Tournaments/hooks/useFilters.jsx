import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import moment from 'moment';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { debounceTime } from '../../../constants/config';
import { getTournamentDetailsStart } from '../../../store/tournaments/actions';
import { getAllTags } from '../../../store/actions';

let debounce;
const useFilters = (itemsPerPage) => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);
	const { userTags } = useSelector((state) => state.UserDetails);

	const fetchData = (values) => {
		const data = {
			perPage: itemsPerPage,
			page: 1,
			...values,
		};

		if (values?.endDate) {
			data.endDate =
				moment(values?.endDate).utc().clone().add(1, 'days').format() || '';
		}
		dispatch(getTournamentDetailsStart(data));
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

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };

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

	const handleClear = () => {
		const initialValues = filterValues();
		validation.resetForm(initialValues);
	};

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
