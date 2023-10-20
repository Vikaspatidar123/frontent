import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import useForm from '../../../../components/Common/Hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createAggregatorStart,
	updateAggregatorStatusStart,
} from '../../../../store/actions';

const useCreateAggregator = () => {
	const dispatch = useDispatch();
	const [active, setActive] = useState('');

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

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { active: status, gameAggregatorId } = props;
		dispatch(
			updateAggregatorStatusStart({
				data: {
					code: 'AGGREGATOR',
					gameAggregatorId,
					status: !status,
				},
				limit: 15,
				pageNo: 1,
			})
		);
		setActive((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [aggregatorsData?.count]);

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
		},
	]);

	return {
		isOpen,
		setFormFields,
		setIsOpen,
		formFields,
		header,
		validation,
		buttonList,
		isCreateAggregatorLoading,
		handleStatus,
		active,
		setActive,
	};
};

export default useCreateAggregator;
