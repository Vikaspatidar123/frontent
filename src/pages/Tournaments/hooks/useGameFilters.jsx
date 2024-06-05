import { useEffect, useMemo, useRef, useState } from 'react';
// import { useSelector } from 'react-redux';
import { isEqual } from 'lodash';
import {
	gameFilterValidationSchema,
	gameFilterValues,
	staticGameFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import // getTournamentGamesStart,
'../../../store/actions';
import { debounceTime } from '../../../constants/config';

let debounce;
const useGameFilters = (casinoTournamentId, tournamentProvider) => {
	// const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);

	const fetchData = () => {
		// dispatch(
		// 	getTournamentGamesStart({
		// 		limit: itemsPerPage,
		// 		pageNo: 1,
		// 		tournamentId: casinoTournamentId,
		// 		...values,
		// 	})
		// );
	};

	const handleFilter = (values) => {
		fetchData(values);
	};

	const { validation, formFields } = useForm({
		initialValues: gameFilterValues(),
		validationSchema: gameFilterValidationSchema(),
		// onSubmitEntry: handleFilter,
		staticFormFields: staticGameFiltersFields(tournamentProvider),
	});

	// const handleAdvance = () => {
	// 	toggleAdvance();
	// };

	const handleClear = () => {
		const initialValues = gameFilterValues();
		validation.resetForm(initialValues);
	};

	// useEffect(() => {

	// 	setFormFields([
	// 		...staticGameFiltersFields(tournamentProvider),
	// 		// {
	// 		// 	name: 'casinoCategoryId',
	// 		// 	fieldType: 'select',
	// 		// 	label: '',
	// 		// 	placeholder: 'Category',
	// 		// 	optionList: categoryField,
	// 		// },
	// 	]);
	// }, []);

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
