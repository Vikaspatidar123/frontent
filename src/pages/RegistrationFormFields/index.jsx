/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';

import { Col, Container, Row } from 'reactstrap';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import Spinners from '../../components/Common/Spinner';
import FormPage from '../../components/Common/FormPage';
import useFormFields from './hooks/useFormFields';
import { projectName } from '../../constants/config';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const RegistrationFields = ({ t }) => {
	// meta title
	document.title = projectName;
	const { isGranted } = usePermission();

	const { leftFormFields, rightFormFields, validation, isformFieldsLoading } =
		useFormFields();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Site Configurations')}
					breadcrumbItem={t('Registration Fields')}
				/>
				<Row>
					<Col lg="12">
						{isformFieldsLoading ? (
							<Spinners
								color="primary"
								className="position-absolute top-50 start-50"
							/>
						) : (
							<FormPage
								validation={validation}
								leftFormFields={leftFormFields}
								rightFormFields={rightFormFields}
								isSubmit={isGranted(modules.RegistrationField, 'U')}
								submitLabel="Submit"
								customColClasses=""
								isSubmitLoading={isformFieldsLoading}
							/>
						)}
					</Col>
				</Row>
			</Container>
		</div>
	);
};

RegistrationFields.propTypes = {
	t: PropTypes.func,
};

RegistrationFields.defaultProps = {
	t: (string) => string,
};

export default RegistrationFields;
