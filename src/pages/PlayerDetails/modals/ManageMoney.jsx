/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { depositSchema } from '../formDetails';
import FormModal from '../../../components/Common/FormModal';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { depositToOther } from '../../../store/actions';

const transactionTypeOptionsList = [
	{
		optionLabel: 'Add Money',
		value: 'addMoney',
	},
	{
		optionLabel: 'Remove Money',
		value: 'removeMoney',
	},
];

const walletTypeOptionsList = [
	{
		optionLabel: 'Cash',
		value: 'cash',
	},
	{
		optionLabel: 'Bonus',
		value: 'bonus',
	},
];

const staticFormFields = (currencyCode) => [
	{
		name: 'transactionType',
		fieldType: 'radioGroup',
		label: 'Transaction Type',
		optionList: transactionTypeOptionsList,
	},
	{
		name: 'walletType',
		fieldType: 'radioGroup',
		label: 'Wallet Type',
		optionList: walletTypeOptionsList,
	},
	{
		name: 'addAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Amount',
		type: 'number',
		adornmentText: currencyCode,
	},
];

const ManageMoney = ({ show, header, toggle }) => {
	const dispatch = useDispatch();
	const { playerId } = useParams();
	const { userDetails, depositToOtherLoading } = useSelector(
		(state) => state.UserDetails
	);

	const currencyCode = useMemo(
		() => userDetails?.wallets?.[0]?.currency?.code,
		[userDetails]
	);

	const handleDepositToOther = (values) => {
		dispatch(
			depositToOther({
				amount:
					values?.transactionType === 'addMoney'
						? parseFloat(values?.addAmount.toFixed(2))
						: parseFloat(values?.addAmount?.toFixed(2)) * -1,
				walletType: values?.walletType === 'cash' ? 'CASH' : 'NONCASH',
				userId: Number(playerId),
				currencyId: Number(userDetails?.wallets?.[0]?.currencyId),
				walletId: Number(userDetails?.wallets?.[0]?.id),
			})
		);
	};

	const { isOpen, setIsOpen, validation, formFields } = useForm({
		header,
		validationSchema: depositSchema,
		initialValues: {
			addAmount: '',
			transactionType: '',
			walletType: '',
		},
		onSubmitEntry: (values, { resetForm }) => {
			handleDepositToOther(values);
			resetForm();
			toggle();
		},
		staticFormFields: staticFormFields(currencyCode),
	});

	useEffect(() => {
		if (show) setIsOpen(true);
		else setIsOpen(false);
	}, [show]);

	return (
		<div>
			<FormModal
				isOpen={isOpen}
				toggle={() => {
					setIsOpen((prev) => !prev);
					toggle();
				}}
				header={header}
				validation={validation}
				formFields={formFields}
				submitLabel="Submit"
				customColClasses="col-md-12"
				isSubmitLoading={depositToOtherLoading}
			/>
		</div>
	);
};

export default ManageMoney;
