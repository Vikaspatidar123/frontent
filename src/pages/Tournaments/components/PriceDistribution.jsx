/* eslint-disable no-plusplus */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
/* eslint-disable array-callback-return */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useEffect, useState } from 'react';
import { isEmpty } from 'lodash';
import {
	Card,
	CardBody,
	Col,
	FormFeedback,
	InputGroup,
	InputGroupText,
	Label,
	Progress,
	Row,
	UncontrolledTooltip,
} from 'reactstrap';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	prizeDistributionFormSchema,
	prizeDistributionInitialValues,
	staticPrizeDistributionFormFields,
} from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import {
	CustomInputField,
	CustomSwitchButton,
} from '../../../helpers/customForms';
import Actions from './Actions';

const setInitialWinnerFields = (validation, setFieldType, tournamentDetail) => {
	const myObject = {};
	const prizes = tournamentDetail?.tournamentPrizes;
	for (let i = 1; i <= validation?.values?.numberOfWinners; i++) {
		myObject[i] =
			prizes?.[i - 1]?.type === 'cash'
				? prizes?.[i - 1]?.amount
				: prizes?.[i - 1]?.item || '';
		setFieldType((prev) => ({
			...prev,
			[i]:
				validation?.values?.tournamentPrizeType === 'non_cash'
					? 'text'
					: 'number',
		}));
	}
	validation?.setFieldValue('prizes', myObject);
	validation?.setTouched({ ...validation?.touched, prizes: true });
};

const PriceDistribution = ({
	allFields,
	setAllFields,
	tournamentDetail,
	activeTab,
	tournamentId,
	submitButtonLoading,
	toggleTab,
	tabsToShow,
}) => {
	const [prizeSettlementMethod, setPrizeSettlementMethod] =
		useState('percentage');
	const [remainingPrizeAmount, setRemainingPrizeAmount] = useState('');
	const [initialRender, setInitialRender] = useState(true);
	const [fieldType, setFieldType] = useState({});

	const handleSubmit = async (values) => {
		if (values?.numberOfWinners <= 0) {
			return Promise.reject(
				new Error('Number of winners should be greater than 0')
			);
		}

		const prizes = Object.entries(values?.prizes || {})?.map(
			([key, value]) => ({
				rank: Number(key),
				type: typeof value === 'string' ? 'non_cash' : 'cash',
				[typeof value === 'string' ? 'item' : 'amount']: value,
				[typeof value === 'string' ? 'item' : 'percent']: value,
			})
		);

		const data = {
			prizeSettlementMethod,
			tournamentPrizeType: values?.tournamentPrizeType,
			prizes,
		};

		return new Promise((resolve) => {
			setAllFields((prev) => {
				const updatedFields = { ...prev, ...data };
				resolve(updatedFields);
				return updatedFields;
			});
		});
	};

	const { formFields, validation } = useForm({
		initialValues: prizeDistributionInitialValues(tournamentDetail),
		validationSchema: prizeDistributionFormSchema(
			prizeSettlementMethod === 'percentage' ? 100 : allFields?.poolPrize
		),
		staticFormFields: staticPrizeDistributionFormFields(),
		onSubmitEntry: handleSubmit,
	});

	useEffect(() => {
		if (!isEmpty(tournamentDetail)) {
			setPrizeSettlementMethod('percentage');
			validation.setValues(prizeDistributionInitialValues(tournamentDetail));
		}
	}, [tournamentDetail]);

	useEffect(() => {
		if (validation?.values?.tournamentPrizeType === 'cash') {
			setRemainingPrizeAmount(() => {
				if (Object?.keys(validation?.values?.prizes)?.length > 0) {
					let remainingAmount =
						prizeSettlementMethod === 'percentage' ? 100 : allFields?.poolPrize;
					Object?.keys(validation?.values?.prizes)?.map((prize) => {
						const prizeValue = validation?.values?.prizes[prize];
						if (typeof prizeValue === 'number') {
							remainingAmount -= prizeValue;
						}
					});
					if (remainingAmount < 0) {
						return 0;
					}
					return remainingAmount;
				}
				return 0;
			});
		} else {
			setRemainingPrizeAmount('');
		}
	}, [
		validation?.values?.tournamentPrizeType,
		allFields?.poolPrize,
		prizeSettlementMethod,
		validation?.values?.prizes,
	]);

	useEffect(() => {
		setRemainingPrizeAmount(
			prizeSettlementMethod === 'percentage' ? 100 : allFields?.poolPrize
		);
		setInitialWinnerFields(validation, setFieldType, tournamentDetail);
	}, [prizeSettlementMethod]);

	useEffect(() => {
		if (Number(validation?.values?.numberOfWinners) >= 0) {
			setInitialWinnerFields(validation, setFieldType, tournamentDetail);
		}
	}, [validation?.values?.numberOfWinners]);

	useEffect(() => {
		if (Number(validation?.values?.numberOfWinners) >= 0) {
			setInitialWinnerFields(validation, setFieldType, tournamentDetail);
		}
	}, [validation?.values?.tournamentPrizeType]);

	useEffect(() => {
		if (
			Array.isArray(validation?.touched?.prizes)
				? validation?.touched?.prizes?.length
				: Object.keys(validation?.touched?.prizes || {}).length
		) {
			setInitialRender(false);
		} else {
			setInitialRender(true);
		}
	}, [validation?.touched]);

	const handleNextClick = async (nextTab) => {
		try {
			const updatedAllFields = await handleSubmit(validation.values);

			await prizeDistributionFormSchema(
				prizeSettlementMethod === 'percentage' ? 100 : allFields?.poolPrize
			).validate(validation.values);

			toggleTab(nextTab, updatedAllFields);
		} catch (err) {
			console.log(
				'Error in prize distribution = ',
				err?.errors || err?.message
			);
			validation.submitForm();
		}
	};

	// useEffect(() => {
	// 	if (Object.keys(validation?.values?.prizes || {})?.length > 0) {
	// 		let count = 0;
	// 		Object.keys(validation?.values?.prizes || {}).map((prize) => {
	// 			if (typeof validation?.values?.prizes?.[prize] === 'number')
	// 				count += validation?.values?.prizes?.[prize];
	// 		});
	// 		validation?.setFieldValue('totalPrizeCount', count);
	// 	}
	// }, [validation?.values?.prizes]);

	return (
		<Row>
			<Col lg="12">
				<FormPage
					validation={validation}
					responsiveFormFields={formFields}
					customColClasses=""
					colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
					isSubmit={false}
				/>

				<Row>
					<Card>
						<CardBody>
							{validation?.values?.tournamentPrizeType === 'cash' &&
							validation?.values?.numberOfWinners ? (
								<div className="mb-4">
									<div className="square-switch d-flex align-items-center mb-5">
										<p className="m-0 pe-2 fs-5 me-5">
											<b>Settlement Method -</b>
										</p>
										{[
											{ label: 'Percentage', value: 'percentage' },
											// { label: 'Amount', value: 'amount' }, // Comment it in case of multi currency
										].map((settlementType) => (
											<CustomSwitchButton
												labelClassName="form-check-label"
												label={settlementType?.label}
												htmlFor={`customRadioInline${settlementType?.label}`}
												type="radio"
												id={`customRadioInline${settlementType?.label}`}
												value={prizeSettlementMethod}
												name={settlementType?.value}
												checked={
													prizeSettlementMethod === settlementType?.value
												}
												inputClassName="form-check-input"
												onClick={() =>
													setPrizeSettlementMethod(settlementType?.value)
												}
											/>
										))}
									</div>
									<div className="d-flex justify-content-between">
										<h5 className="fw-bold text-capitalize">
											Pool Prize -
											{` ${
												prizeSettlementMethod === 'percentage'
													? 100
													: allFields?.currencyDetails?.[0]?.poolPrize || 0
											} ${prizeSettlementMethod === 'percentage' ? '%' : ''}`}
										</h5>
										<h5 className="fw-bold text-capitalize">
											Remaining Amount -
											{` ${remainingPrizeAmount} ${
												prizeSettlementMethod === 'percentage' ? '%' : ''
											}`}
										</h5>
									</div>
									<Progress
										striped
										color="primary"
										value={
											prizeSettlementMethod === 'percentage'
												? remainingPrizeAmount
												: Math.round(
														(remainingPrizeAmount /
															allFields?.currencyDetails?.[0]?.poolPrize || 1) *
															100
												  )
										}
										className="animated-progess progress-xl font-size-18"
									>
										<div className="progress-value fw-bold fs-6">
											{remainingPrizeAmount}
										</div>
									</Progress>
								</div>
							) : (
								''
							)}
							<Row>
								{Object?.keys(validation?.values?.prizes)?.map(
									(value, index) => (
										<Col lg={4} className="pb-2">
											<Label className="form-label">
												Winner {index + 1}{' '}
												<span className="text-danger"> *</span>
											</Label>
											<InputGroup>
												<CustomInputField
													name={`prizes[${index + 1}]`}
													value={validation?.values?.prizes?.[index + 1]}
													onBlur={validation?.handleBlur}
													onChange={validation?.handleChange}
													type={fieldType?.[index + 1]}
													min={0}
													required
												/>
												<InputGroupText
													className="password-btn btn btn-primary p-1 px-2"
													onClick={() => {
														if (
															validation?.values?.tournamentPrizeType ===
																'cash' ||
															validation?.values?.tournamentPrizeType ===
																'non_cash'
														)
															return;
														setFieldType((prev) => {
															validation?.setFieldValue('prizes', {
																...validation?.values?.prizes,
																[index + 1]: '',
															});
															return {
																...prev,
																[index + 1]:
																	prev?.[index + 1] === 'number'
																		? 'text'
																		: 'number',
															};
														});
													}}
												>
													<>
														<i
															className={`${
																fieldType?.[index + 1] === 'number'
																	? 'mdi mdi-percent'
																	: 'mdi mdi-alphabetical-variant'
															} font-size-20`}
															id={`winnerFieldType${index + 1}`}
														/>
														<UncontrolledTooltip
															placement="top"
															target={`winnerFieldType${index + 1}`}
														>
															{fieldType?.[index + 1] === 'number'
																? 'cash'
																: 'non-cash'}
														</UncontrolledTooltip>
													</>
												</InputGroupText>
											</InputGroup>
											{!tournamentId
												? validation.errors?.prizes?.[index + 1] &&
												  !initialRender && (
														<FormFeedback type="invalid" className="d-block">
															{validation.errors?.prizes?.[index + 1]}
														</FormFeedback>
												  )
												: validation.errors?.prizes?.[index + 1] && (
														<FormFeedback type="invalid" className="d-block">
															{validation.errors?.prizes?.[index + 1]}
														</FormFeedback>
												  )}
										</Col>
									)
								)}
							</Row>
						</CardBody>
					</Card>
				</Row>
			</Col>
			<Actions
				handleNextClick={handleNextClick}
				submitButtonLoading={submitButtonLoading}
				activeTab={activeTab}
				toggleTab={toggleTab}
				tabsToShow={tabsToShow}
			/>
		</Row>
	);
};

export default PriceDistribution;
