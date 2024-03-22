/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useMemo, useState } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
// import PropTypes from 'prop-types';

import { isEqual } from 'lodash';
import {
	getInitialValues,
	initialData,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createCurrencyStart, editCurrencyStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { Code, ExchangeRate, Id, Name, Type } from '../CurrencyListCol';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { currencySymbols } from '../../../utils/constant';

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
	} = useSelector((state) => state.Currencies);

	const handleCreateCurrency = (values) => {
		dispatch(
			createCurrencyStart({
				data: {
					...values,
					type: values.type,
					isActive: false,
				},
			})
		);
	};

	const handleEditCurrency = ({ name, exchangeRate }) => {
		dispatch(
			editCurrencyStart({
				data: {
					name,
					exchangeRate,
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

	const onClickEdit = (selectedRow) => {
		const symbol = Object.keys(currencySymbols)?.includes(selectedRow?.code)
			? currencySymbols[selectedRow.code]
			: '';
		setIsEdit({ open: true, selectedRow });
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

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				// filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
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
				Header: 'EXCHANGE RATES',
				accessor: 'exchangeRate',
				// filterable: true,
				Cell: ({ cell }) => <ExchangeRate value={cell.value} />,
			},
			// {
			//   Header: 'LOYALTY POINTS',
			//   accessor: 'loyaltyPoint',
			//   // filterable: true,
			//   Cell: ({ cell }) => <LoyaltyPoints value={cell.value} />,
			// },
			{
				Header: 'TYPE',
				accessor: 'type',
				// filterable: true,
				Cell: ({ cell }) => <Type value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'actions',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<Button
						hidden={!isGranted(modules.currency, 'U')}
						type="button"
						className="btn btn-sm btn-soft-info"
						disabled={cell?.row?.original?.code === 'BONUS'}
						onClick={(e) => {
							e.preventDefault();
							onClickEdit(cell?.row?.original);
						}}
					>
						<i
							className="mdi mdi-pencil-outline"
							id={`edittooltip-${cell?.row?.original?.id}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`edittooltip-${cell?.row?.original?.id}`}
						>
							Edit
						</UncontrolledTooltip>
					</Button>
				),
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
	};
};

// useCreateCurrency.propTypes = {
// 	columns: PropTypes.shape({
// 		Header: PropTypes.string,
// 		accessor: PropTypes.string,
// 		Cell: PropTypes.shape({
//
// 				cell: PropTypes.shape({
// 					row: PropTypes.shape({
// 						original: PropTypes.shape({
// 							currencyId: PropTypes.number,
// 						}),
// 					}),
// 				}),
// 			}),
// 		}),
// };

// useCreateCurrency.columns.PropTypes = {
// 	Header: PropTypes.string,
// 	accessor: PropTypes.string,
// 	Cell: PropTypes.shape({
// 		cell: PropTypes.shape({
// 			row: PropTypes.shape({
// 				original: PropTypes.shape({
// 					currencyId: PropTypes.number,
// 				}),
// 			}),
// 		}),
// 	}),
// };

export default useCreateCurrency;
