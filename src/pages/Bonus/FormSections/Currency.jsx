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
import Actions from './Actions';

const Currencies = ({
	setAllFields,
	bonusDetails,
	allFields,
	activeTab,
	submitButtonLoading,
	tabsToShow,
	toggleTab,
}) => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);
	const [remainingCurrency, setRemainingCurrency] = useState({});
	const [currencyFields, setCurrencyFields] = useState(commonCurrencyFields);

	const { validation } = useForm({
		initialValues: getBonusInitialValues()?.currencyDetails,
		validationSchema: currencyValidate(allFields),
	});

	const handleSubmit = () =>
		new Promise((resolve) => {
			setAllFields((prev) => {
				const updateFields = {
					...prev,
					currencyDetails: [
						filterEmptyPayload(validation.values),
						...Object.values(remainingCurrency),
					],
				};
				resolve(updateFields);
				return updateFields;
			});
		});

	const updateRemainingCurrencyDetails = (currencyDetails) => {
		let remCur = {};
		currencies?.currencies
			?.filter(
				(curr) =>
					curr.id !== validation.values.currencyId && curr.type !== 'point'
			)
			.forEach((currency) => {
				currencyFields?.forEach(({ key }) => {
					remCur = {
						...remCur,
						[currency.id]: {
							...remCur[currency.id],
							currencyId: currency.id,
							[key]: currencyDetails[key]
								? currencyDetails[key] * Number(currency.exchangeRate)
								: 0,
						},
					};
				});
			});
		setRemainingCurrency(remCur);
	};

	const handleRemainingCurrency = (e, currency, key) => {
		setRemainingCurrency((prev) => {
			const updated = {
				...prev,
				[currency.id]: {
					...prev[currency.id],
					currencyId: currency.id,
					[key]: e.target.value,
				},
			};
			return updated;
		});
	};

	const validateRemainingCurrency = async (nextTab) => {
		let isValid = true;
		Object.values(remainingCurrency).forEach(async (remCurrObject, idx) => {
			try {
				await currencyValidate(allFields).validate(remCurrObject);
				if (isValid && idx === Object.keys(remainingCurrency).length - 1) {
					const updateFields = await handleSubmit();
					toggleTab(nextTab, updateFields);
				}
			} catch (err) {
				isValid = false;
				showToastr({
					type: 'error',
					message:
						err?.errors?.[0] || 'Please enter amount for all currencies!.',
				});
			}
		});
	};

	useEffect(() => {
		if (!isEmpty(bonusDetails)) {
			const currency = filterEmptyPayload(
				getBonusInitialValues(bonusDetails)?.currencyDetails
			);
			validation.setValues(currency);
			const remCur = {};
			bonusDetails?.bonusCurrencies?.slice(1)?.forEach((curr) => {
				remCur[curr.currencyId] = filterEmptyPayload(curr);
			});
			setRemainingCurrency(remCur);
		}
	}, [bonusDetails, currencyFields, currencies]);

	useEffect(() => {
		dispatch(fetchCurrenciesStart({}));
	}, []);

	const handleNextClick = (nextTab) => {
		validation.submitForm();
		currencyValidate(allFields)
			.validate(validation.values)
			.then(() => {
				validateRemainingCurrency(nextTab);
			})
			.catch((err) => {
				console.log('Error in currency = ', err?.errors);
			});
	};

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
	}, [allFields?.bonusType, bonusDetails]);

	return (
		<div>
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
									{currencies?.currencies
										?.filter((curr) => curr.type !== 'point')
										?.map(({ id, name }) => (
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
									updateRemainingCurrencyDetails(validation.values);
								}}
								onChange={validation?.handleChange}
								type="number"
								required
							/>
							<span className="text-danger">
								{validation.errors[key] || ''}
							</span>
						</Col>
					))}
				</Row>
				{validation?.values?.currencyId
					? currencies?.currencies
							?.filter(
								(curr) =>
									curr.id !== validation.values.currencyId &&
									curr.type !== 'point'
							)
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
			<Actions
				handleNextClick={handleNextClick}
				submitButtonLoading={submitButtonLoading}
				activeTab={activeTab}
				toggleTab={toggleTab}
				tabsToShow={tabsToShow}
			/>
		</div>
	);
};

Currencies.defaultProps = {};
export default Currencies;
