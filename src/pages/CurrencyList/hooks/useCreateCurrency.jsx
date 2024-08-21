/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useMemo, useState } from 'react';
// import PropTypes from 'prop-types';

import { isEqual } from 'lodash';
import {
	getInitialValues,
	initialData,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createCurrencyStart,
	editCurrencyStart,
	toggleCurrency,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { Code, ExchangeRate, Name, Status, Type } from '../CurrencyListCol';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import {
	currencySymbols,
	ICON_CLASS,
	TEXT_COLORS,
} from '../../../utils/constant';
import Actions from '../../../components/Common/Actions';
import ButtonList from '../../../components/Common/ButtonList';

const useCreateCurrency = () => {
	const dispatch = useDispatch();
	const { isGranted, permissions } = usePermission();
	const [showModal, setShowModal] = useState(false);
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		isCreateCurrencyLoading,
		currencies,
		isEditCurrencyLoading,
		isEditCurrencySuccess,
		isCreateCurrencySuccess,
	} = useSelector((state) => state.Currencies);

	const handleCreateCurrency = (values) => {
		dispatch(
			createCurrencyStart({
				data: {
					...values,
					isActive: false,
				},
			})
		);
	};

	const handleEditCurrency = (values) => {
		dispatch(
			editCurrencyStart({
				data: {
					...values,
					currencyId: isEdit.selectedRow.id,
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
		staticFormFields: staticFormFields(),
		onSubmitEntry: isEdit.open ? handleEditCurrency : handleCreateCurrency,
	});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setFormFields(staticFormFields(false));
		setHeader('Add Currency');
		setIsEdit({ open: false, selectedRow: '' });
	};

	useEffect(() => {
		if (isEditCurrencySuccess) setIsOpen(false);
	}, [isEditCurrencySuccess]);

	useEffect(() => {
		if (isCreateCurrencySuccess) setIsOpen(false);
	}, [isCreateCurrencySuccess]);

	useEffect(() => {
		setIsOpen(false);
	}, [currencies?.count]);

	useEffect(() => {
		if (validation?.values?.code) {
			const symbol = Object.keys(currencySymbols)?.includes(
				validation?.values?.code
			)
				? currencySymbols[validation?.values?.code]
				: '';
			validation.setFieldValue('symbol', symbol);
		}
	}, [validation?.values?.code]);

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.currency,
			operation: 'C',
		},
	]);

	const actionList = <ButtonList buttonList={buttonList} />;

	const onClickEdit = (selectedRow) => {
		const symbol = Object.keys(currencySymbols)?.includes(selectedRow?.code)
			? currencySymbols[selectedRow.code]
			: '';
		setIsEdit({ open: true, selectedRow });
		setFormFields(staticFormFields(true));
		setHeader('Edit Currency');
		validation.setValues(
			getInitialValues({
				...selectedRow,
				symbol,
			})
		);
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.currencies) &&
			!isEdit.open &&
			isOpen
		) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.currencies))
			);
			validation.setValues(values);
		}
	}, [isOpen]);

	const toggleFormModal = () => {
		if (!isEdit.open) {
			const isDataEqual = isEqual(validation.values, initialData);
			if (!isDataEqual) {
				setShowModal(!showModal);
			}
		}
		setIsOpen((prev) => !prev);
	};

	const handleToggleStatus = (row) =>
		dispatch(
			toggleCurrency({
				data: {
					currencyId: row?.id,
				},
			})
		);

	const isEditDisabled = (row) => row?.isDefault;
	const isToggleDisabled = (row) => row?.code === 'BONUS';

	const actionsList = [
		{
			actionName: 'Edit',
			actionHandler: onClickEdit,
			isHidden: !isGranted(modules.currency, 'U'),
			icon: ICON_CLASS.edit,
			iconColor: TEXT_COLORS.primary,
			isDisabled: isEditDisabled,
		},
		{
			actionName: 'Toggle Status',
			actionHandler: handleToggleStatus,
			isHidden: !isGranted(modules.emailTemplate, 'TS'),
			icon: ICON_CLASS.toggleStatus,
			iconColor: TEXT_COLORS.success,
			isDisabled: isToggleDisabled,
		},
	];

	const columns = useMemo(
		() => [
			// {
			// 	Header: 'ID',
			// 	accessor: 'id',
			// 	notHidable: true,
			// 	// filterable: true,
			// 	Cell: ({ cell }) => <Id value={cell.value} />,
			// },
			{
				Header: 'NAME',
				accessor: 'name',
				// filterable: true,
				Cell: ({ cell }) => <Name cell={cell} />,
			},
			{
				Header: 'CODE',
				accessor: 'code',
				// filterable: true,
				Cell: ({ cell }) => <Code value={cell.value} />,
			},
			{
				Header: 'Symbol',
				accessor: 'symbol',
				// filterable: true,
				Cell: ({ cell }) => <Code value={cell.value} />,
			},
			{
				Header: 'EXCHANGE RATES',
				accessor: 'exchangeRate',
				// filterable: true,
				Cell: ({ cell }) => <ExchangeRate value={cell.value} />,
			},
			{
				Header: 'TYPE',
				accessor: 'type',
				// filterable: true,
				Cell: ({ cell }) => <Type value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'isActive',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'actions',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => <Actions actionsList={actionsList} cell={cell} />,
			},
		],
		[permissions]
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
		showModal,
		setShowModal,
		isEdit,
		toggleFormModal,
		actionList,
	};
};

export default useCreateCurrency;
