/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Form, Card } from 'reactstrap';
import { getField } from '../../helpers/customForms';

const CmsFormPage = ({
	validation,
	staticFormFields,
	submitLabel,
	customColClasses,
	customComponent,
	isSubmitLoading,
	formTitle,
}) => (
	<Card className="p-3">
		<Row>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					validation.handleSubmit();
					return false;
				}}
			>
				{formTitle && <div className="mb-4 card-title">{formTitle}</div>}
				<Row>
					{staticFormFields?.map((field) => (
						<Col lg={4}>
							{!field?.isHide && (
								<div className="mb-3">{getField(field, validation)}</div>
							)}
						</Col>
					))}
				</Row>
				<Row>{customComponent}</Row>
				<Row>
					<Col>
						<div className="text-end">
							<button
								type="submit"
								className="btn btn-primary waves-effect waves-light"
								disabled={isSubmitLoading}
							>
								{submitLabel}
							</button>
						</div>
					</Col>
				</Row>
			</Form>
		</Row>
	</Card>
);

CmsFormPage.defaultProps = {
	validation: {},
	submitLabel: 'Save',
	customColClasses: '',
	customComponent: <div />,
	isSubmitLoading: false,
	staticFormFields: [],
	isSubmit: true,
	isEdit: false,
	enableEdit: () => {},
	formTitle: '',
};

CmsFormPage.propTypes = {
	validation: PropTypes.objectOf,
	leftFormFields: PropTypes.arrayOf.isRequired,
	rightFormFields: PropTypes.arrayOf.isRequired,
	staticFormFields: PropTypes.arrayOf,
	submitLabel: PropTypes.string,
	isSubmit: PropTypes.bool,
	isEdit: PropTypes.bool,
	enableEdit: PropTypes.func,
	customColClasses: PropTypes.string,
	customComponent: PropTypes.element,
	isSubmitLoading: PropTypes.bool,
	formTitle: PropTypes.string,
};

export default CmsFormPage;
