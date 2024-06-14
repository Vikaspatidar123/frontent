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
import { currencyFields } from '../constants';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getInitialValues } from '../formDetails';
import { currencyValidate } from '../Validation/schema';
import { filterEmptyPayload } from '../../../network/networkUtils';
import Actions from './Actions';

const Currencies = ({
	setAllFields,
	paymentDetails,
	allFields,
	activeTab,
	submitButtonLoading,
	tabsToShow,
	toggleTab,
}) => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);
	const [currencyObj, setCurrencyObj] = useState({});

	const { validation } = useForm({
		initialValues: getInitialValues()?.currencyDetails,
		validationSchema: currencyValidate(),
	});

	const handleSubmit = () =>
		new Promise((resolve) => {
			setAllFields((prev) => {
				const updateFields = {
					...prev,
					providerLimit: [
						// eslint-disable-next-line no-unsafe-optional-chaining
						...Object.values(currencyObj)?.map((remCurr) =>
							filterEmptyPayload(remCurr)
						),
					],
				};
				resolve(updateFields);
				return updateFields;
			});
		});

	const validateCurrency = async (nextTab) => {
		const currencyArr = Object.values(currencyObj);
		if (currencyArr?.length) {
			const updateFields = await handleSubmit();
			toggleTab(nextTab, updateFields);
			
		} else {
			setAllFields({
				...allFields,
				providerLimit: [],
			});
			toggleTab(nextTab);
		}
	};

	const handleCurrencyChange = (currId) => {
		const remCur = {
			...currencyObj,
			[currId]: currencyObj?.[currId]
				? currencyObj?.[currId]
				: {
						currencyId: currId,
						minDeposit: null,
						maxDeposit: null,
						minWithdraw: null,
						maxWithdraw: null,
				  },
		};

		validation.setValues(
			currencyObj?.[currId] ? currencyObj?.[currId] : remCur?.[currId]
		);
		setCurrencyObj(remCur);
	};

	useEffect(() => {
		if (!isEmpty(paymentDetails)) {
			const currency = filterEmptyPayload(
				getInitialValues(paymentDetails)?.providerLimits
			);
			setCurrencyObj(currency);
		}
	}, [paymentDetails, currencyFields, currencies]);

	useEffect(() => {
		dispatch(fetchCurrenciesStart({}));
	}, []);

	const handleNextClick = (nextTab) => {
		currencyValidate()
			.validate(validation.values)
			.then(() => {
				validateCurrency(nextTab);
			})
			.catch((err) => {
				console.log('Error in currency', err?.errors);
			});
	};

	return (
		<div>
			<Card className="px-1 text-center">
				<Row>
					<Col sm={12} lg={3} className="mb-4">
						<label htmlFor="currencyId" style={{ fontSize: '14px' }}>
							Select currency
						</label>
						<CustomSelectField
							id="currencyId"
							type="select"
							name="currencyId"
							value={validation?.values?.currencyId}
							onChange={(e) => {
								validation.handleChange(e);
								handleCurrencyChange(e?.target?.value);
							}}
							options={
								<>
									<option value={null} selected disabled>
										Select currency
									</option>
									{currencies?.currencies
										?.filter((curr) => curr.type !== 'point')
										?.map(({ id, name }) => (
											<option key={id} value={id} title={name}>
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
				</Row>
				<Row>
					{validation?.values?.currencyId &&
						currencyFields?.map(({ key, label }) => (
							<Col sm={12} lg={3}>
								<label htmlFor={key} style={{ fontSize: '14px' }}>
									{label}
								</label>
								<CustomInputField
									name={key}
									value={
										validation?.values?.[key] === null
											? ''
											: validation?.values?.[key]
									}
									onChange={(e) => {
										validation.handleChange(e);
										validation.setValues({
											...currencyObj?.[validation?.values?.currencyId],
											[key]: e.target.value,
										});
										setCurrencyObj({
											...currencyObj,
											[validation?.values?.currencyId]: {
												...currencyObj?.[validation?.values?.currencyId],
												[key]: e.target.value,
											},
										});
									}}
									isError
									errorMsg={validation.errors?.[key]}
									type="number"
									required
								/>
								<span className="text-danger">
									{validation.errors[key] || ''}
								</span>
							</Col>
						))}
				</Row>
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
