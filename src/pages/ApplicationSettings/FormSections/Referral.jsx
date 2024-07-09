import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
	getReferralInitialValues,
	leftStaticReferralFormFields,
	referralSchema,
	rightStaticReferralFormFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';

import FormPage from '../../../components/Common/FormPage';
import { updateReferral } from '../../../store/actions';

const Referral = ({ details = {} }) => {
	const dispatch = useDispatch();
	const referralValue =
		typeof details?.referral?.value === 'string'
			? JSON.parse(details.referral.value)
			: details?.referral?.value;

	const handleUpdate = async (e) => {
		e.preventDefault();
		const { name, value, checked } = e.target;
		try {
			if (name !== 'status')
				await referralSchema.validate({ [name]: value }, { abortEarly: false });
			dispatch(
				updateReferral({ [name]: name === 'status' ? !checked : value })
			);
		} catch (err) {
			console.log('Error in referral ', err?.message);
		}
	};

	const {
		leftFormFields,
		rightFormFields,
		setLeftFormFields,
		setRightFormFields,
		validation,
	} = useForm({
		initialValues: getReferralInitialValues(referralValue),
		validationSchema: referralSchema,
		leftStaticFormFields: leftStaticReferralFormFields(
			referralValue,
			handleUpdate
		),
		rightStaticFormFields: rightStaticReferralFormFields(
			referralValue,
			handleUpdate
		),
	});

	useEffect(() => {
		if (referralValue) {
			setLeftFormFields(
				leftStaticReferralFormFields(referralValue, handleUpdate)
			);
			setRightFormFields(
				rightStaticReferralFormFields(referralValue, handleUpdate)
			);
		}
	}, [details?.referral?.value]);

	return (
		<Row>
			<Col lg="12">
				<FormPage
					validation={validation}
					leftFormFields={leftFormFields}
					rightFormFields={rightFormFields}
					// submitLabel="Submit"
					isSubmit={false}
					customColClasses=""
				/>
			</Col>
		</Row>
	);
};

Referral.defaultProps = {
	details: [],
};

Referral.propTypes = {
	details: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.oneOfType([PropTypes.number, PropTypes.node, PropTypes.string])
		)
	),
};

export default Referral;
