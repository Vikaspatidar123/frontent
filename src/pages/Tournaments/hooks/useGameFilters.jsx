import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import {
	gameFilterValidationSchema,
	gameFilterValues,
	staticGameFiltersFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	// getTournamentGamesStart,
	getCasinoSubCategoryDetailStart,
} from '../../../store/actions';
import { debounceTime, itemsPerPage } from '../../../constants/config';

let debounce;
const useGameFilters = (casinoTournamentId, tournamentProvider) => {
	const dispatch = useDispatch();
	const [isAdvanceOpen, setIsAdvanceOpen] = useState(false);
	const toggleAdvance = () => setIsAdvanceOpen((pre) => !pre);
	const prevValues = useRef(null);
	const isFirst = useRef(true);
	const [isFilterChanged, setIsFilterChanged] = useState(false);

	const { casinoSubCategoryDetails } = useSelector(
		(state) => state.CasinoManagementData
	);

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

	const { validation, formFields, setFormFields } = useForm({
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

	useEffect(() => {
		if (isEmpty(casinoSubCategoryDetails)) {
			dispatch(
				getCasinoSubCategoryDetailStart({
					limit: itemsPerPage,
				})
			);
		}
	}, []);

	useEffect(() => {
		const subCategoryField = casinoSubCategoryDetails?.rows?.map((row) => ({
			optionLabel: row.name?.EN,
			value: row.gameSubCategoryId,
		}));

		setFormFields([
			...staticGameFiltersFields(tournamentProvider),
			{
				name: 'casinoCategoryId',
				fieldType: 'select',
				label: '',
				placeholder: 'Category',
				optionList: subCategoryField,
			},
		]);
	}, [casinoSubCategoryDetails]);

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
