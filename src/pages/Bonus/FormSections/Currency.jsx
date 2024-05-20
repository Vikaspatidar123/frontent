/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Col } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import {
	CustomInputField,
	CustomSelectField,
} from '../../../helpers/customForms';
import {
	fetchCurrenciesStart,
	// getBonusCurrencyConversions,
	resetBonusCurrencyConversion,
} from '../../../store/actions';
import { BONUS_TYPES, commonCurrencyFields } from '../constants';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getBonusInitialValues } from '../formDetails';
import { currencyValidate } from '../Validation/schema';

const Currencies = ({
	setAllFields,
	setActiveTab,
	nextPressed,
	setNextPressed,
	bonusTypeChanged,
	setBonusTypeChanged,
	bonusDetails,
	setNextDisabled,
	allFields,
}) => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);
	const { bonusCurrencies, bonusCurrenciesFetched } = useSelector(
		(state) => state.AllBonusDetails
	);

	const [currencyFields, setCurrencyFields] = useState(commonCurrencyFields);

	useEffect(() => {
		switch (allFields.bonusType) {
			case BONUS_TYPES.JOINING: {
				setCurrencyFields([
					...commonCurrencyFields,
					{ label: 'Joining Amount', key: 'joiningAmount' },
				]);
				break;
			}
			case BONUS_TYPES.DEPOSIT: {
				setCurrencyFields([
					...commonCurrencyFields,
					{ label: 'Min Deposit Amount', key: 'minDepositAmount' },
				]);
				break;
			}
			case BONUS_TYPES.BET: {
				setCurrencyFields([
					...commonCurrencyFields,
					{ label: 'Min Bet Amount', key: 'minBetAmount' },
				]);
				break;
			}
			case BONUS_TYPES.FREESPINS: {
				setCurrencyFields([...commonCurrencyFields]);
				break;
			}
			default:
				break;
		}
	}, [allFields?.bonusType]);

	// const handleSubmit = (values) => {
	// 	window.scrollTo(0, 0);
	// };

	const { validation } = useForm({
		initialValues: getBonusInitialValues()?.currencyDetails,
		validationSchema: currencyValidate(allFields),
		// onSubmitEntry: (values) => handleSubmit(values),
	});

	useEffect(() => {
		setAllFields((prev) => ({ ...prev, currencyDetails: validation.values }));
	}, [validation.values]);

	useEffect(() => {
		if (bonusDetails) {
			validation.setValues(
				getBonusInitialValues(bonusDetails)?.currencyDetails
			);
		}
	}, [bonusDetails]);

	useEffect(() => {
		dispatch(fetchCurrenciesStart({}));
	}, []);

	useEffect(() => {
		if (bonusTypeChanged) {
			setBonusTypeChanged(false);
			validation.resetForm();
		}
	}, [bonusTypeChanged]);

	useEffect(() => {
		if (nextPressed.currentTab === 'currency') {
			validation.submitForm();
			if (nextPressed.nextTab !== 'submit') setActiveTab(nextPressed.nextTab);
			setNextPressed({});
		} else if (nextPressed.nextTab === 'currency') {
			validation.submitForm();
		}
	}, [nextPressed]);

	useEffect(() => {
		if (nextPressed.currentTab === 'currency') {
			setNextDisabled(!isEmpty(validation.errors));
		}
	}, [validation.errors]);

	useEffect(() => {
		if (bonusCurrenciesFetched) {
			validation.setValues(bonusCurrencies);
			dispatch(resetBonusCurrencyConversion());
		}
	}, [bonusCurrenciesFetched]);

	return (
		<Col className="px-1 text-center d-flex">
			<Col sm={12} lg={2} className="mx-1">
				<label htmlFor="currencyId" style={{ fontSize: '14px' }}>
					Select currency
				</label>
				<CustomSelectField
					id="currencyId"
					type="select"
					name="currencyId"
					onChange={validation.handleChange}
					options={
						<>
							<option value={null} selected disabled>
								Select currency
							</option>
							{currencies?.currencies?.map(({ id, name }) => (
								<option key={id} value={id}>
									{name}
								</option>
							))}
						</>
					}
				/>
				<span className="text-danger">
					{validation.errors.currencyId || ''}
				</span>
			</Col>
			{currencyFields?.map(({ key, label }) => (
				<Col sm={12} lg={3} className="mx-1">
					<label htmlFor={key} style={{ fontSize: '14px' }}>
						{label}
					</label>
					<CustomInputField
						name={key}
						value={validation?.values?.[key]}
						onBlur={validation?.handleBlur}
						onChange={validation?.handleChange}
						type="number"
						required
					/>
					<span className="text-danger">{validation.errors[key] || ''}</span>
				</Col>
			))}
		</Col>
	);
};

Currencies.defaultProps = {};
export default Currencies;
