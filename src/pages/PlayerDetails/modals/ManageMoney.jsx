/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { depositSchema } from '../formDetails';
import FormModal from '../../../components/Common/FormModal';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { depositToOther, fetchCurrenciesStart } from '../../../store/actions';
import { showToastr } from '../../../utils/helpers';

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

const staticFormFields = (currencySelect) => [
	{
		name: 'transactionType',
		fieldType: 'radioGroup',
		label: 'Transaction Type',
		optionList: transactionTypeOptionsList,
	},
	{ ...currencySelect },
	{
		name: 'addAmount',
		fieldType: 'textfieldWithAdornment',
		label: 'Amount',
		type: 'number',
	},
];

const ManageMoney = ({ show, header, toggle }) => {
	const dispatch = useDispatch();
	const { userDetails, depositToOtherLoading } = useSelector(
		(state) => state.UserDetails
	);
	const { currencies } = useSelector((state) => state.Currencies);

	const handleDepositToOther = (values) => {
		let purpose = '';
		if (values?.transactionType === 'deposit') {
			purpose = 'Deposit';
		} else {
			purpose = 'Withdraw';
		}

		const walletId = userDetails?.wallets?.find(
			(wallet) => wallet.currencyId === values.currencyId
		)?.id;

		if (!walletId) {
			showToastr({
				message: 'Unable to find wallet, please refresh and try again!',
				type: 'error',
			});
			return;
		}

		dispatch(
			depositToOther({
				amount: parseFloat(values?.addAmount.toFixed(2)),
				walletId: Number(walletId),
				purpose,
				userId: userDetails.id,
			})
		);
	};

	const { isOpen, setIsOpen, validation, formFields, setFormFields } = useForm({
		header,
		validationSchema: depositSchema,
		initialValues: {
			addAmount: '',
			transactionType: '',
			currencyId: null,
		},
		onSubmitEntry: (values, { resetForm }) => {
			handleDepositToOther(values);
			resetForm();
			toggle();
		},
		staticFormFields: staticFormFields(),
	});

	useEffect(() => {
		if (currencies) {
			setFormFields(
				staticFormFields({
					name: 'currencyId',
					fieldType: 'select',
					placeholder: 'Select currency',
					label: 'Select currency',
					optionList: currencies?.currencies?.map((currency) => ({
						optionLabel: currency.name,
						value: currency.id,
					})),
				})
			);
		}
	}, [currencies]);

	useEffect(() => {
		if (!currencies) {
			dispatch(fetchCurrenciesStart());
		}
	}, []);

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
