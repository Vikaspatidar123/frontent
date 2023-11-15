/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useMemo, useState } from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
// import PropTypes from 'prop-types';

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
	Type,
} from '../CurrencyListCol';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';

const useCreateCurrency = () => {
	const dispatch = useDispatch();
	const { isGranted } = usePermission();
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
			module: modules.Currencies,
			operation: 'C',
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
				Header: 'ACTION',
				accessor: 'actions',
				disableFilters: true,
				Cell: ({ cell }) => (
					<Button
						hidden={!isGranted(modules.Currencies, 'U')}
						type="button"
						className="btn btn-sm btn-soft-info"
						onClick={(e) => {
							e.preventDefault();
							onClickEdit(cell?.row?.original);
						}}
					>
						<i
							className="mdi mdi-pencil-outline"
							id={`edittooltip-${cell?.row?.original?.currencyId}`}
						/>
						<UncontrolledTooltip
							placement="top"
							target={`edittooltip-${cell?.row?.original?.currencyId}`}
						>
							Edit
						</UncontrolledTooltip>
					</Button>
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
