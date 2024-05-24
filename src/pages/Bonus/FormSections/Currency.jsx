/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Card, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import {
	CustomInputField,
	CustomSelectField,
} from '../../../helpers/customForms';
import { fetchCurrenciesStart } from '../../../store/actions';
import { BONUS_TYPES, commonCurrencyFields } from '../constants';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getBonusInitialValues } from '../formDetails';
import { currencyValidate } from '../Validation/schema';
import { showToastr } from '../../../utils/helpers';
import { filterEmptyPayload } from '../../../network/networkUtils';

const Currencies = ({
	setAllFields,
	setActiveTab,
	nextPressed,
	setNextPressed,
	bonusDetails,
	setNextDisabled,
	allFields,
	activeTab,
	isNextDisabled,
}) => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);
	const [remainingCurrency, setRemainingCurrency] = useState({});
	const [currencyFields, setCurrencyFields] = useState(commonCurrencyFields);

	const { validation } = useForm({
		initialValues: getBonusInitialValues()?.currencyDetails,
		validationSchema: currencyValidate(allFields),
		// onSubmitEntry: (values) => handleSubmit(values),
	});

	const updateRemainingCurrencyDetails = () => {
		let remCur = {};
		currencies?.currencies
			?.filter((curr) => curr.id !== validation.values.currencyId)
			.forEach((currency) => {
				currencyFields?.forEach(({ key }) => {
					remCur = {
						...remCur,
						[currency.id]: {
							...remCur[currency.id],
							currencyId: currency.id,
							[key]: validation.values[key] * Number(currency.exchangeRate),
						},
					};
				});
			});
		setRemainingCurrency(remCur);
	};

	const handleRemainingCurrency = (e, currency, key) => {
		setRemainingCurrency((prev) => ({
			...prev,
			[currency.id]: {
				...prev[currency.id],
				currencyId: currency.id,
				[key]: e.target.value,
			},
		}));
	};

	const validateRemainingCurrency = () => {
		Object.values(remainingCurrency).forEach((currencyObject) => {
			currencyValidate(allFields)
				.validate(currencyObject)
				.then(() => {
					setNextDisabled(!isEmpty(validation.errors));
				})
				.catch((error) => {
					setNextDisabled(true);
					showToastr({
						type: 'error',
						message: error?.[0] || 'Please enter the required value.',
					});
				});
		});
	};

	useEffect(() => {
		setAllFields((prev) => ({ ...prev, currencyDetails: validation.values }));
	}, [validation.values]);

	useEffect(() => {
		if (!isEmpty(bonusDetails)) {
			validation.setValues(
				getBonusInitialValues(bonusDetails)?.currencyDetails
			);
		}
	}, [bonusDetails]);

	useEffect(() => {
		dispatch(fetchCurrenciesStart({}));
	}, []);

	useEffect(() => {
		if (validation.values.currencyId) {
			updateRemainingCurrencyDetails();
		}
	}, [validation.values.currencyId, currencyFields]);

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
		if (activeTab === 'currency') {
			setNextDisabled(!isEmpty(validation.errors));
		}
	}, [validation.errors, activeTab]);

	useEffect(() => {
		if (!isNextDisabled) {
			setAllFields((prev) => ({
				...prev,
				currencyDetails: [
					filterEmptyPayload(validation.values),
					...Object.values(remainingCurrency),
				],
			}));
		}
	}, [isNextDisabled]);

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

	return (
		<Card className="px-1 text-center">
			<Row>
				<Col sm={12} lg={2} className="mx-1">
					<label htmlFor="currencyId" style={{ fontSize: '14px' }}>
						Select currency
					</label>
					<CustomSelectField
						id="currencyId"
						type="select"
						name="currencyId"
						value={validation?.values?.currencyId}
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
							onBlur={(e) => {
								validation?.handleBlur(e);
								updateRemainingCurrencyDetails();
							}}
							onChange={validation?.handleChange}
							type="number"
							required
						/>
					</Col>
				))}
			</Row>
			{validation?.values?.currencyId
				? currencies?.currencies
						?.filter((curr) => curr.id !== validation.values.currencyId)
						.map((currency) => (
							<Row className="mt-4">
								<Col sm={12} lg={2} className="mx-1">
									<CustomInputField value={currency.name} disabled />
								</Col>
								{currencyFields?.map(({ key }) => (
									<Col sm={12} lg={3} className="mx-1">
										<CustomInputField
											name={key}
											value={remainingCurrency[currency.id]?.[key] || ''}
											onBlur={() => validateRemainingCurrency()}
											onChange={(e) =>
												handleRemainingCurrency(e, currency, key)
											}
											type="number"
											required
										/>
									</Col>
								))}
							</Row>
						))
				: null}
		</Card>
	);
};

Currencies.defaultProps = {};
export default Currencies;
