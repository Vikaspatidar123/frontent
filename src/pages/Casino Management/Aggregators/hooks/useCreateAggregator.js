import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useForm from '../../../../components/Common/Hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createAggregatorStart } from '../../../../store/actions';

const useCreateAggregator = () => {
	const dispatch = useDispatch();

	const { isCreateAggregatorLoading, aggregatorsData } = useSelector(
		(state) => state.AggregatorsReducer
	);

	const handleCreateAggregator = (values) => {
		dispatch(
			createAggregatorStart({
				data: {
					...values,
				},
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Aggregator',
			initialValues: getInitialValues(),
			validationSchema,
			isEdit: false,
			onSubmitEntry: handleCreateAggregator,
			staticFormFields,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [aggregatorsData?.count]);

	return {
		isOpen,
		setFormFields,
		setIsOpen,
		formFields,
		header,
		validation,
		handleAddClick,
		isCreateAggregatorLoading,
	};
};

export default useCreateAggregator;
