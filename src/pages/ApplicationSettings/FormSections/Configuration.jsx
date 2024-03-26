import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import {
	adminSiteConfigSchema,
	getSiteConfigInitialValues,
	leftStaticSiteConfigFormFields,
	rightStaticSiteConfigFormFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';

import FormPage from '../../../components/Common/FormPage';
import {
	updateSiteConfigurationStart,
	updateLogo,
} from '../../../store/actions';

const SiteConfig = ({ details }) => {
	const dispatch = useDispatch();

	const customBlurHandler = (e) => {
		e.preventDefault();
		const { name, value, files, type } = e.target;
		if (type === 'file') {
			dispatch(
				updateLogo({
					file: files[0],
				})
			);
		} else if (name && value) {
			dispatch(updateSiteConfigurationStart({ [name]: value }));
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
		initialValues: getSiteConfigInitialValues(details),
		validationSchema: adminSiteConfigSchema,
		leftStaticFormFields: leftStaticSiteConfigFormFields(
			details,
			customBlurHandler
		),
		rightStaticFormFields: rightStaticSiteConfigFormFields(
			details,
			customBlurHandler
		),
	});

	useEffect(() => {
		if (Object.keys(details || {}).length > 0) {
			setLeftFormFields(
				leftStaticSiteConfigFormFields(details, customBlurHandler)
			);
			setRightFormFields(
				rightStaticSiteConfigFormFields(details, customBlurHandler)
			);
		}
	}, [details]);

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
