import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import {
	filterValidationSchema,
	filterValues,
	staticFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { fetchSportsMatchesStart, getSportsList } from '../../../store/actions';
import { itemsPerPage } from '../../../constants/config';

const useFilters = () => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);

	const { sportsListInfo } = useSelector((state) => state.SportsList);

	const fetchData = (values) => {
		dispatch(
			fetchSportsMatchesStart({
				limit: itemsPerPage,
				pageNo: 1,
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
		if (isEmpty(sportsListInfo)) {
			dispatch(
				getSportsList({
					limit: itemsPerPage,
					pageNo: 1,
				})
			);
		}
	}, []);

	useEffect(() => {
		if (!isEmpty(sportsListInfo)) {
			const sportList = sportsListInfo?.rows?.map((row) => ({
				optionLabel: row.sportName[0].name,
				value: row.providerSportId,
			}));

			setFormFields([
				{
					name: 'providerSportId',
					fieldType: 'select',
					label: '',
					placeholder: 'Sports',
					optionList: sportList,
				},
				...staticFiltersFields(),
			]);
		}
	}, [sportsListInfo]);

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
