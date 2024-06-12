/* eslint-disable array-callback-return */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
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

const PriceDistribution = ({
	allFields,
	setAllFields,
	tournamentDetail,
	activeTab,
	// tournamentId,
	submitButtonLoading,
	toggleTab,
	tabsToShow,
}) => {
	const [prizeSettlementMethod, setPrizeSettlementMethod] =
		useState('percentage');
	const [remainingPrizeAmount, setRemainingPrizeAmount] = useState('');

	const handleSubmit = async (values) => {
		if (values?.numberOfWinners <= 0) {
			return Promise.reject(
				new Error('Number of winners should be greater than 0')
			);
		}

		const prizes = Object.values(values?.prizes)?.map(
			({ id, value, rank }) => ({
				type: values.tournamentPrizeType,
				...(values.tournamentPrizeType === 'cash'
					? { amount: value }
					: { item: value }),
				...(id ? { id, rank } : {}),
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

	const updateWinnerAmount = (details) => {
		const updatedPrizes = {};

		for (let i = 1; i <= validation?.values?.numberOfWinners; i += 1) {
			const { id, rank, amount, item, type } =
				details?.tournamentPrizes?.[i] || {};
			updatedPrizes[rank || i] = {
				...(id ? { id, rank } : {}),
				type: type
					? type === 'cash'
						? 'number'
						: 'text'
					: validation.values.tournamentPrizeType === 'cash'
					? 'number'
					: 'text',
				value: details ? (type === 'cash' ? amount : item) : null,
			};
		}
		validation?.setFieldValue('prizes', updatedPrizes);
	};

	useEffect(() => {
		if (validation.values?.numberOfWinners > 0) {
			updateWinnerAmount(tournamentDetail);
		}
	}, [
		validation.values?.numberOfWinners,
		tournamentDetail,
		validation.values?.tournamentPrizeType,
	]);

	useEffect(() => {
		if (!isEmpty(tournamentDetail)) {
			validation.setValues(prizeDistributionInitialValues(tournamentDetail));
		}
	}, [tournamentDetail]);

	useEffect(() => {
		if (validation?.values?.tournamentPrizeType === 'cash') {
			setRemainingPrizeAmount(() => {
				const prizes = Object.values(validation?.values?.prizes);

				if (prizes?.length > 0) {
					let remainingAmount =
						prizeSettlementMethod === 'percentage' ? 100 : allFields?.poolPrize;
					prizes?.map(({ value }) => {
						if (validation.values.tournamentPrizeType === 'cash') {
							remainingAmount -= Number(value);
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

	// useEffect(() => {
	// 	if (Number(validation?.values?.numberOfWinners) > 0) {
	// 		setInitialWinnerFields(validation, tournamentDetail);
	// 	}
	// }, [validation?.values?.numberOfWinners]);

	// useEffect(() => {
	// 	if (Number(validation?.values?.numberOfWinners) > 0) {
	// 		setInitialWinnerFields(validation, tournamentDetail);
	// 	}
	// }, [validation?.values?.tournamentPrizeType]);

	// useEffect(() => {
	// 	if (
	// 		Array.isArray(validation?.touched?.prizes)
	// 			? validation?.touched?.prizes?.length
	// 			: Object.keys(validation?.touched?.prizes || {}).length
	// 	) {
	// 		setInitialRender(false);
	// 	} else {
	// 		setInitialRender(true);
	// 	}
	// }, [validation?.touched]);

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
															(allFields?.currencyDetails?.[0]?.poolPrize ||
																1)) *
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
							) : null}
							<Row>
								{Object.values(validation?.values?.prizes || {})?.map(
									({ value, rank, type }, index) => (
										<Col lg={4} className="pb-2">
											<Label className="form-label">
												Winner {rank || index + 1}
												<span className="text-danger"> *</span>
											</Label>
											<InputGroup>
												<CustomInputField
													name={`prizes[${rank}]`}
													value={value}
													onBlur={validation?.handleBlur}
													onChange={(e) => {
														const prizes = {
															...validation.values.prizes,
															[rank || index + 1]: {
																...validation.values.prizes?.[rank],
																value: e.target.value,
															},
														};
														validation.setFieldValue('prizes', prizes);
													}}
													type={type}
													min={0}
													required
												/>
												<InputGroupText className="password-btn btn btn-primary p-1 px-2">
													<>
														<i
															className={`${
																type === 'number'
																	? 'mdi mdi-percent'
																	: 'mdi mdi-alphabetical-variant'
															} font-size-20`}
															id={`winnerFieldType${index + 1}`}
														/>
														<UncontrolledTooltip
															placement="top"
															target={`winnerFieldType${index + 1}`}
														>
															{type === 'number' ? 'cash' : 'non-cash'}
														</UncontrolledTooltip>
													</>
												</InputGroupText>
											</InputGroup>
											{validation.errors?.prizes?.[index + 1] ? (
												<FormFeedback type="invalid" className="d-block">
													{validation.errors?.prizes?.[index + 1]}
												</FormFeedback>
											) : null}
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
