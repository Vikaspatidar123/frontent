import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

import {
	getAppSettingInitialValues,
	leftAppSettingsFormFields,
	rightAppSettingFormFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';

import FormPage from '../../../components/Common/FormPage';
import { updateSiteConfigurationStart } from '../../../store/actions';

const SiteConfig = ({ details }) => {
	const dispatch = useDispatch();

	const customOnChange = (e) => {
		e.preventDefault();
		const { name } = e.target;
		if (name) {
			dispatch(updateSiteConfigurationStart({ key: name }));
		} else {
			console.warn(
				'Something went wrong while submitting application details!!'
			);
		}
	};

	const {
		leftFormFields,
		rightFormFields,
		setLeftFormFields,
		setRightFormFields,
		validation,
	} = useForm({
		initialValues: getAppSettingInitialValues(details),
		validationSchema: {},
		leftStaticFormFields: leftAppSettingsFormFields(details, customOnChange),
		rightStaticFormFields: rightAppSettingFormFields(details, customOnChange),
	});

	useEffect(() => {
		if (!isEmpty(details)) {
			setLeftFormFields(leftAppSettingsFormFields(details, customOnChange));
			setRightFormFields(rightAppSettingFormFields(details, customOnChange));
		}
	}, [details]);

	return (
		<Row>
			<Col lg="12">
				<FormPage
					validation={validation}
					leftFormFields={leftFormFields}
					rightFormFields={rightFormFields}
					isSubmit={false}
					customColClasses=""
				/>
			</Col>
		</Row>
	);
};

SiteConfig.defaultProps = {
	details: [],
};

SiteConfig.propTypes = {
	details: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.oneOfType([PropTypes.number, PropTypes.node, PropTypes.string])
		)
	),
};

export default SiteConfig;
