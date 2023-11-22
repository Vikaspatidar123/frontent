/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { CustomInputField } from '../../../helpers/customForms';
import { getBonusCurrencyConversions } from '../../../store/actions';
import { convertAmountOptions } from '../constants';
import { showToastr } from '../../../utils/helpers';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getCreateBonusInitialValues } from '../formDetails';

const Currencies = ({
	selectedBonus,
	allFields,
	setAllFields,
	setActiveTab,
	nextPressed,
	setNextPressed,
	bonusTypeChanged,
	setBonusTypeChanged,
}) => {
	const dispatch = useDispatch();
	const [nextTab, setNextTab] = useState('');
	const [isNextButtonActive, setNextButtonActive] = useState(false);
	const { bonusCurrencies } = useSelector((state) => state.AllBonusDetails);

	const handleSubmit = ({ values, nextTabId }) => {
		setAllFields((prev) => ({ ...prev, currency: values }));
		setActiveTab(nextTabId);
		window.scrollTo(0, 0);
	};

	const { validation } = useForm({
		initialValues: getCreateBonusInitialValues()?.currency,
		onSubmitEntry: (values) => handleSubmit({ values, nextTabId: nextTab }),
	});

	useEffect(() => {
		if (bonusTypeChanged) {
			setBonusTypeChanged(false);
			validation.resetForm();
		}
	}, [bonusTypeChanged]);

	useEffect(() => {
		const isAnyErrors = document.getElementById('error-container');
		if (nextPressed.currentTab === 'currency') {
			if (typeof isAnyErrors !== 'undefined' && isAnyErrors != null) {
				showToastr({
					message: 'Please fill every required field',
					type: 'error',
				});
			} else if (!isNextButtonActive) {
				showToastr({
					message: 'Please generate currency conversions',
					type: 'error',
				});
			} else {
				setNextTab(nextPressed.nextTab);
				setNextPressed({});
			}
		}
	}, [nextPressed]);

	useEffect(() => {
		if (nextTab) {
			validation.submitForm();
			setNextTab('');
		}
	}, [nextTab]);

	const fetchData = async () => {
		const code = Object.keys(validation?.values)?.[0];
		const maxBonusThreshold = validation?.values?.[code]?.maxBonusThreshold;
		const minDeposit = validation?.values?.[code]?.minDeposit;
		const maxWinAmount = validation?.values?.[code]?.maxWinAmount;
		const zeroOutThreshold = validation?.values?.[code]?.zeroOutThreshold;
		const minBalance = validation?.values?.[code]?.minBalance;
		const joiningAmount = validation?.values?.[code]?.joiningAmount;

		if (
			allFields?.bonusType !== 'freespins' &&
			allFields?.bonusType !== 'cashfreespins' &&
			allFields?.bonusType !== 'joining'
		) {
			if (
				maxBonusThreshold === '' &&
				!['balance', 'wagering'].includes(allFields.bonusType)
			) {
				showToastr({ message: 'Enter Max Bonus Claimed', type: 'error' });
			} else if (minBalance === '' && allFields?.bonusType === 'wagering') {
				showToastr({ message: 'Enter Min Balance', type: 'error' });
			} else if (
				minDeposit === '' &&
				allFields.bonusType !== 'balance' &&
				allFields?.bonusType !== 'wagering'
			) {
				showToastr({ message: 'Enter Min Deposit', type: 'error' });
			} else if (
				maxWinAmount === '' &&
				allFields.bonusType !== 'balance' &&
				allFields?.bonusType !== 'wagering'
			) {
				showToastr({ message: 'Enter Max Win Amount', type: 'error' });
			} else if (zeroOutThreshold === '' && allFields.bonusType !== 'balance') {
				showToastr({ message: 'Enter Zero Out Threshold', type: 'error' });
			} else {
				setNextButtonActive(true);
				dispatch(
					getBonusCurrencyConversions({
						currencyFields: {
							maxBonusThreshold: maxBonusThreshold || 0,
							minDeposit: minDeposit || 0,
							maxWinAmount: maxWinAmount || 0,
							zeroOutThreshold: zeroOutThreshold || 0,
							minBalance: minBalance || 0,
						},
						currencyCode: code,
					})
				);
			}
		} else if (bonusCurrencies?.bonusType === 'joining') {
			if (joiningAmount === '') {
				showToastr({ message: 'Enter Joining Amount ', type: 'error' });
			} else {
				setNextButtonActive(true);
				dispatch(
					getBonusCurrencyConversions({
						currencyFields: {
							joiningAmount: joiningAmount || 0,
						},
						currencyCode: code,
					})
				);
			}
		} else if (maxWinAmount === '') {
			showToastr({ message: 'Enter Max Win Amount', type: 'error' });
		} else if (
			zeroOutThreshold === '' &&
			(bonusCurrencies?.isSticky === 'true' || bonusCurrencies?.isSticky)
		) {
			showToastr({ message: 'Enter Zero Out Threshold', type: 'error' });
		} else {
			setNextButtonActive(true);
			dispatch(
				getBonusCurrencyConversions({
					currencyFields: {
						maxBonusThreshold: maxBonusThreshold || 0,
						minDeposit: minDeposit || 0,
						maxWinAmount: maxWinAmount || 0,
						zeroOutThreshold: zeroOutThreshold || 0,
						minBalance: minBalance || 0,
					},
					currencyCode: code,
				})
			);
		}
	};

	useEffect(() => {
		validation.setValues(bonusCurrencies);
	}, [bonusCurrencies]);

	return (
		<>
			<Row className="d-flex justify-content-end align-items-end mb-2">
				<Col sm={1}>
					<Button
						type="submit"
						className="float-right"
						onClick={() => fetchData()}
						title="Fetch Currency"
					>
						<i className="dripicons-swap d-flex" />
					</Button>
				</Col>
			</Row>
			{validation &&
				validation?.values &&
				Object.keys(validation?.values).length > 0 &&
				Object.keys(validation?.values).map((key, index) => (
					<Row>
						<Col className="mb-3">
							<CustomInputField
								label={index < 1 ? 'Currency' : ''}
								value={key}
								disabled
							/>
						</Col>
						{Object.keys(validation?.values[key]).map((currKey, currIndex) => {
							let hide = false;
							let validationError = false;
							if (
								currKey !== 'minBalance' &&
								!validation?.values[key][currKey]
							) {
								validationError = true;
							} else {
								validationError = false;
							}

							if (selectedBonus === 'wagering') {
								hide =
									currKey === 'minDeposit' ||
									currKey === 'maxBonusThreshold' ||
									currKey === 'maxWinAmount';
							} else if (selectedBonus === 'joining') {
								hide = currKey !== 'joiningAmount';
							} else if (
								selectedBonus === 'freespins' ||
								selectedBonus === 'cashfreespins'
							) {
								hide =
									currKey !== 'maxWinAmount' && currKey !== 'zeroOutThreshold';
							} else {
								hide = currKey === 'joiningAmount' || currKey === 'minBalance';
							}

							return (
								currKey !== 'minBonusThreshold' &&
								!hide && (
									<Col
										className="px-1 text-center"
										key={`currencyCols ${currIndex + 1}`}
										hidden={hide}
									>
										{index < 1 && !hide && (
											<label htmlFor={currKey} style={{ fontSize: '14px' }}>
												{['wagering'].includes(allFields?.bonusType)
													? convertAmountOptions?.find((val) =>
															currKey === 'minBalance'
																? val.value === 'minBalanceCash'
																: val.value === currKey
													  )?.label
													: convertAmountOptions?.find(
															(val) => val.value === currKey
													  )?.label}
												<span className="text-danger"> *</span>
											</label>
										)}
										<CustomInputField
											name={`[${key}][${currKey}]`}
											value={validation?.values[key][currKey]}
											hidden={hide}
											onBlur={validation?.handleBlur}
											onChange={validation?.handleChange}
											type="number"
											required
										/>
										{validationError && (
											<span
												value={`[${key}][${currKey}]`}
												id="error-container"
												className="text-danger"
											>
												Required *
											</span>
										)}
									</Col>
								)
							);
						})}
					</Row>
				))}
		</>
	);
};

Currencies.defaultProps = {};
export default Currencies;
