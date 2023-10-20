/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useMemo, useState } from 'react';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createCurrencyStart, editCurrencyStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	Code,
	ExchangeRate,
	Id,
	LoyaltyPoints,
	Name,
	Primary,
	Type,
} from '../CurrencyListCol';
import ActionButtons from '../ActionButtons';

const useCreateCurrency = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		isCreateCurrencyLoading,
		currencies,
		isEditCurrencyLoading,
		isEditCurrencySuccess,
	} = useSelector((state) => state.Currencies);

	const handleCreateCurrency = (values) => {
		dispatch(
			createCurrencyStart({
				data: {
					...values,
					type: Number(values.type),
					isPrimary: false,
				},
			})
		);
	};

	const handleEditCurrency = (values) => {
		dispatch(
			editCurrencyStart({
				data: {
					...values,
					loyaltyPoint: values.loyaltyPoint.toString(),
					type: Number(values.type),
					isPrimary: false,
					currencyId: isEdit.selectedRow.currencyId,
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
		header: 'Add Currency',
		initialValues: getInitialValues(),
		validationSchema,
		staticFormFields,
		onSubmitEntry: isEdit.open ? handleEditCurrency : handleCreateCurrency,
	});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add Currency');
		setIsEdit({ open: false, selectedRow: '' });
	};

	useEffect(() => {
		if (isEditCurrencySuccess) setIsOpen(false);
	}, [isEditCurrencySuccess]);

	useEffect(() => {
		setIsOpen(false);
	}, [currencies?.count]);

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
		},
	]);

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Currency');
		validation.setValues(getInitialValues(selectedRow));
		setIsOpen((prev) => !prev);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'currencyId',
				// filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				// filterable: true,
				Cell: (cellProps) => <Name {...cellProps} />,
			},
			{
				Header: 'CODE',
				accessor: 'code',
				// filterable: true,
				Cell: (cellProps) => <Code {...cellProps} />,
			},
			{
				Header: 'EXCHANGE RATES',
				accessor: 'exchangeRate',
				// filterable: true,
				Cell: (cellProps) => <ExchangeRate {...cellProps} />,
			},
			{
				Header: 'LOYALTY POINTS',
				accessor: 'loyaltyPoint',
				// filterable: true,
				Cell: (cellProps) => <LoyaltyPoints {...cellProps} />,
			},
			{
				Header: 'TYPE',
				accessor: 'type',
				// filterable: true,
				Cell: (cellProps) => <Type {...cellProps} />,
			},
			{
				Header: 'PRIMARY',
				accessor: 'primary',
				// filterable: true,
				Cell: (cellProps) => <Primary {...cellProps} />,
			},
			{
				Header: 'ACTION',
				accessor: 'actions',
				disableFilters: true,
				Cell: (cellProps) => (
					<ActionButtons cell={cellProps} handleClick={onClickEdit} />
				),
			},
		],
		[]
	);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		isCreateCurrencyLoading,
		buttonList,
		columns,
		isEditCurrencyLoading,
	};
};

export default useCreateCurrency;
