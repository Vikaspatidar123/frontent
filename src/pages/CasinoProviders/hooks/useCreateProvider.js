import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createCasinoProvidersStart,
	editCasinoProvidersStart,
	getAggregatorsList,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateProvider = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const { aggregatorsData } = useSelector((state) => state.AggregatorsReducer);
	const {
		isCreateProviderLoading,
		casinoProvidersData,
		isEditProviderLoading,
	} = useSelector((state) => state.CasinoManagementData);

	const handleCreateProvider = (values) => {
		dispatch(
			createCasinoProvidersStart({
				data: values,
			})
		);
	};

	const handleEditProvider = (values) => {
		dispatch(
			editCasinoProvidersStart({
				data: {
					...values,
					thumbnail:
						typeof values.thumbnail === 'string' ? '' : values.thumbnail,
					casinoProviderId: isEdit.selectedRow.casinoProviderId,
				},
			})
		);
	};

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		setHeader,
	} = useForm({
		header: 'Add Provider',
		initialValues: getInitialValues(),
		validationSchema,
		staticFormFields,
		onSubmitEntry: isEdit.open ? handleEditProvider : handleCreateProvider,
	});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add Provider');
		setIsEdit({ open: false, selectedRow: '' });
	};

	useEffect(() => {
		dispatch(getAggregatorsList({ pageNo: 1 }));
	}, []);

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Provider');
		validation.setValues(
			getInitialValues({ ...selectedRow, thumbnail: selectedRow.thumbnailUrl })
		);
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoProvidersData?.count]);

	useEffect(() => {
		if (isEditProviderLoading) setIsOpen(false);
	}, [isEditProviderLoading]);

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
					isDisabled: isEdit.open,
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
		onClickEdit,
		isEditProviderLoading,
	};
};

export default useCreateProvider;
