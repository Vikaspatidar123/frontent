/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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
import { convertAmountOptions } from '../constants';
import { showToastr } from '../../../utils/helpers';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getCreateBonusInitialValues } from '../formDetails';
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
}) => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);
	const { bonusCurrencies, bonusCurrenciesFetched } = useSelector(
		(state) => state.AllBonusDetails
	);

	const handleSubmit = (values) => {
		setAllFields((prev) => ({ ...prev, currencyDetails: values }));
		window.scrollTo(0, 0);
	};

	const { validation } = useForm({
		initialValues: getCreateBonusInitialValues()?.currencyDetails,
		validationSchema: currencyValidate(),
		onSubmitEntry: (values) => handleSubmit(values),
	});

	useEffect(() => {
		if (bonusDetails) {
			validation.setValues(bonusDetails.currencyDetails);
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
		const isAnyErrors = !isEmpty(validation.errors);
		if (nextPressed.currentTab === 'currency') {
			validation.submitForm();
			if (isAnyErrors) {
				showToastr({
					message: 'Please fill every required field',
					type: 'error',
				});
			} else {
				if (nextPressed.nextTab !== 'submit') setActiveTab(nextPressed.nextTab);
				setNextPressed({});
			}
		} else if (nextPressed.nextTab === 'currency') {
			validation.submitForm();
		}
	}, [nextPressed]);

	useEffect(() => {
		setNextDisabled(!isEmpty(validation.errors));
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
			{convertAmountOptions?.map(({ key, label }) => (
				<Col sm={12} lg={2} className="mx-1">
					<label htmlFor={key} style={{ fontSize: '14px' }}>
						{label}
					</label>
					<CustomInputField
						name={key}
						value={validation?.values[key]}
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
