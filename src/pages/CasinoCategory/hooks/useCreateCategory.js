import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	// createCasinoCategoryStart,
	getAggregatorsList,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateCategory = () => {
	const dispatch = useDispatch();
	const { aggregatorsData } = useSelector((state) => state.AggregatorsReducer);
	const { isCreateCategoryLoading, casinoCategoryData } = useSelector(
		(state) => state.CasinoManagementData
	);

	const handleCreateCategory = () => {
		// dispatch(
		//   createCasinoCategoryStart({
		//     data: values,
		//   })
		// );
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Category',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleCreateCategory,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		if (!aggregatorsData.length) {
			dispatch(getAggregatorsList({ pageNo: 1 }));
		}
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoCategoryData?.count]);

	useEffect(() => {
		if (aggregatorsData?.rows?.length) {
			const aggOptions = aggregatorsData.rows.map((r) => ({
				id: r.gameAggregatorId,
				optionLabel: r.name,
				value: r.gameAggregatorId,
			}));

			setFormFields([
				...staticFormFields,
				{
					name: 'gameAggregatorId',
					fieldType: 'select',
					label: 'Aggregator',
					placeholder: 'Select Aggregator',
					optionList: aggOptions,
				},
			]);
		}
	}, [aggregatorsData]);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		handleAddClick,
		isCreateCategoryLoading,
	};
};

export default useCreateCategory;
