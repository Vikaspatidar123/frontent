/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
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
	updateCasinoStatusStart,
} from '../../../store/actions';

import {
	CasinoProviderId,
	Name,
	ThumbnailUrl,
	Status,
} from '../CasinoProvidersListCol';
import ActionButtons from '../ActionButtons';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { modules } from '../../../constants/permissions';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { dataURLtoBlob } from '../../../utils/helpers';

const useCreateProvider = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const [showModal, setShowModal] = useState(false);
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

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { status, casinoProviderId } = props;
		dispatch(
			updateCasinoStatusStart({
				code: 'CASINO_PROVIDER',
				casinoProviderId,
				status: !status,
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
		dispatch(getAggregatorsList({}));
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add Provider');
		setIsEdit({ open: false, selectedRow: '' });
	};

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Provider');
		validation.setValues(
			getInitialValues({ ...selectedRow, thumbnail: selectedRow.thumbnailUrl })
		);
		setIsOpen((prev) => !prev);
	};

	// useEffect(() => {
	// 	setIsOpen(false);
	// }, [casinoProvidersData?.count]);

	useEffect(() => {
		if (isEditProviderLoading) setIsOpen(false);
	}, [isEditProviderLoading]);

	useEffect(() => {
		if (aggregatorsData?.aggregators?.length) {
			const aggOptions = aggregatorsData.aggregators.map((r) => ({
				id: r.id,
				optionLabel: r.name,
				value: r.id,
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
			module: modules.CasinoManagement,
			operation: 'C',
		},
	]);

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.providers) &&
			!isEdit.open &&
			isOpen
		) {
			const storedValues = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.providers))
			);

			if (storedValues?.thumbnail?.thumbnail) {
				const base64Content = storedValues.thumbnail?.thumbnail;
				const blob = dataURLtoBlob(base64Content);

				storedValues.thumbnail = new File([blob], storedValues.thumbnail.name, {
					type: blob.type,
				});
			}

			validation.setValues(storedValues);
		}
	}, [isOpen]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <CasinoProviderId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'ICON',
				accessor: 'iconUrl',
				disableSortBy: true,
				filterable: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={handleStatus}
						onClickEdit={onClickEdit}
					/>
				),
			},
		],
		[casinoProvidersData]
	);

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
		columns,
		showModal,
		setShowModal,
		isEdit,
	};
};

export default useCreateProvider;
