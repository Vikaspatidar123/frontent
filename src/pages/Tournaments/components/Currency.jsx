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
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	currencyValidate,
	generalStepInitialValues,
	currencyFields,
} from '../formDetails';
import { showToastr } from '../../../utils/helpers';
import { filterEmptyPayload } from '../../../network/networkUtils';
import Actions from './Actions';

const Currencies = ({
	setAllFields,
	tournamentDetail,
	activeTab,
	submitButtonLoading,
	tabsToShow,
	toggleTab,
}) => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);
	const [remainingCurrency] = useState({});
	const { validation } = useForm({
		initialValues: generalStepInitialValues()?.currencyDetails,
		validationSchema: currencyValidate(),
	});

	const handleSubmit = () =>
		new Promise((resolve) => {
			setAllFields((prev) => {
				const updateFields = {
					...prev,
					currencyDetails: [
						filterEmptyPayload(validation.values),
						// ...Object.values(remainingCurrency),
					],
				};
				resolve(updateFields);
				return updateFields;
			});
		});

	// const updateRemainingCurrencyDetails = (currencyDetails) => {
	// 	let remCur = {};
	// 	currencies?.currencies
	// 		?.filter(
	// 			(curr) =>
	// 				curr.id !== validation.values.currencyId && curr.type !== 'point'
	// 		)
	// 		.forEach((currency) => {
	// 			currencyFields()?.forEach(({ key }) => {
	// 				remCur = {
	// 					...remCur,
	// 					[currency.id]: {
	// 						...remCur[currency.id],
	// 						currencyId: currency.id,
	// 						[key]: currencyDetails[key]
	// 							? currencyDetails[key] * Number(currency.exchangeRate)
	// 							: 0,
	// 					},
	// 				};
	// 			});
	// 		});
	// 	setRemainingCurrency(remCur);
	// };

	// const handleRemainingCurrency = (e, currency, key) => {
	// 	setRemainingCurrency((prev) => {
	// 		const updated = {
	// 			...prev,
	// 			[currency.id]: {
	// 				...prev[currency.id],
	// 				currencyId: currency.id,
	// 				[key]: e.target.value,
	// 			},
	// 		};
	// 		return updated;
	// 	});
	// };

	const validateRemainingCurrency = async (nextTab) => {
		let isValid = true;
		const remainingCurr = Object.values(remainingCurrency);

		if (!remainingCurr?.length) {
			const updateFields = await handleSubmit();
			toggleTab(nextTab, updateFields);
			return;
		}

		remainingCurr.forEach(async (remCurrObject, idx) => {
			try {
				await currencyValidate().validate(remCurrObject);
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
		if (!isEmpty(tournamentDetail)) {
			const currency = filterEmptyPayload(
				generalStepInitialValues(tournamentDetail)?.currencyDetails
			);
			validation.setValues(currency);
			// const remCur = {};
			// tournamentDetail?.bonusCurrencies?.slice(1)?.forEach((curr) => {
			// 	remCur[curr.currencyId] = filterEmptyPayload(curr);
			// });
			// setRemainingCurrency(remCur);
		}
	}, [tournamentDetail, currencies]);

	useEffect(() => {
		dispatch(fetchCurrenciesStart({}));
	}, []);

	const handleNextClick = (nextTab) => {
		validation.submitForm();
		currencyValidate()
			.validate(validation.values)
			.then(() => {
				validateRemainingCurrency(nextTab);
			})
			.catch((err) => {
				console.log('Error in currency = ', err?.errors);
			});
	};

	return (
		<div>
			<Card className="px-1 text-center">
				<Row>
					<Col sm={12} lg={4} className="">
						<label
							htmlFor="currencyId"
							style={{ fontSize: '14px' }}
							className="d-flex align-items-left"
						>
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
					{currencyFields()?.map(({ name, label, placeholder, type }) => (
						<Col sm={12} lg={4} className="my-2 text-start" key={name}>
							<label
								htmlFor={name}
								style={{ fontSize: '14px' }}
								className="d-flex align-items-left"
							>
								{label}
							</label>
							<CustomInputField
								name={name}
								value={validation?.values?.[name]}
								// onBlur={(e) => {
								// 	validation?.handleBlur(e);
								// 	updateRemainingCurrencyDetails(validation.values);
								// }}
								onChange={validation?.handleChange}
								placeholder={placeholder}
								type={type}
								required
							/>
							<span className="text-danger">
								{validation.errors[name] || ''}
							</span>
						</Col>
					))}
				</Row>
				{/* {validation?.values?.currencyId
					? currencies?.currencies
						?.filter(
							(curr) =>
								curr.id !== validation.values.currencyId &&
								curr.type !== 'point'
						)
						.map((currency) => (
							<Row className="mt-4">
								<Col sm={12} lg={4} className="">
									<label htmlFor="currencyId" style={{ fontSize: '14px' }} className='d-flex align-items-left'>
										Currency
									</label>
									<CustomInputField value={currency.name} disabled />
								</Col>
								{currencyFields()?.map(({ name, label, placeholder, type }) => (
									<Col sm={12} lg={4} className="" key={name}>
										<label htmlFor={name} style={{ fontSize: '14px' }} className='d-flex align-items-left'>
											{label}
										</label>
										<CustomInputField
											name={name}
											value={remainingCurrency[currency.id]?.[name] || ''}
											onChange={(e) =>
												handleRemainingCurrency(e, currency, name)
											}
											placeholder={placeholder}
											type={type}
											required
										/>
									</Col>
								))}
							</Row>
						))
					: null} */}
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
