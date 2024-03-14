/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { depositSchema } from '../formDetails';
import FormModal from '../../../components/Common/FormModal';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { depositToOther } from '../../../store/actions';

const transactionTypeOptionsList = [
	{
		optionLabel: 'Deposit',
		value: 'deposit',
	},
	{
		optionLabel: 'Withdraw',
		value: 'withdraw',
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
	const { userDetails, depositToOtherLoading } = useSelector(
		(state) => state.UserDetails
	);

	const currencyCode = useMemo(
		() => userDetails?.wallets?.[0]?.currency?.code,
		[userDetails]
	);

	const handleDepositToOther = (values) => {
		let purpose = '';
		if (values?.transactionType === 'deposit') {
			purpose = values?.walletType === 'cash' ? 'Deposit' : 'BonusDeposit';
		} else {
			purpose = values?.walletType === 'cash' ? 'Withdraw' : 'BonusWithdraw';
		}

		const walletId = userDetails?.wallets?.find((wallet) => {
			if (values?.walletType === 'bonus') {
				return wallet.currency.code === 'BONUS';
			} 
				return wallet.currency.code !== 'BONUS';
			
		})?.id;

		dispatch(
			depositToOther({
				amount: parseFloat(values?.addAmount.toFixed(2)),
				walletId: Number(walletId),
				purpose,
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
