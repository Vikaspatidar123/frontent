import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createCasinoProvidersStart,
	getAggregatorsList,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateProvider = () => {
	const dispatch = useDispatch();
	const { aggregatorsData } = useSelector((state) => state.AggregatorsReducer);
	const { isCreateProviderLoading, casinoProvidersData } = useSelector(
		(state) => state.CasinoManagementData
	);

	const handleCreateProvider = (values) => {
		dispatch(
			createCasinoProvidersStart({
				data: values,
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Provider',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleCreateProvider,
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
	}, [casinoProvidersData?.count]);

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

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
		},
	]);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		buttonList,
		isCreateProviderLoading,
	};
};

export default useCreateProvider;
