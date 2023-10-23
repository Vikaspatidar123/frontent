import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Form, Card } from 'reactstrap';
import { getField } from '../../helpers/customForms';

const FormPage = ({
	validation,
	leftFormFields,
	rightFormFields,
	staticFormFields,
	submitLabel,
	customColClasses,
	customComponent,
	isSubmitLoading,
	isSubmit = true,
	isEdit = false,
	enableEdit,
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
				<Row className="justify-content-center">
					<Col lg={6}>
						{staticFormFields?.map(
							(field) =>
								!field?.isHide && (
									<div className="mb-3">{getField(field, validation)}</div>
								)
						)}
					</Col>
				</Row>
				<Row>
					<Col className={`lg-6 ${customColClasses}`}>
						{leftFormFields?.map(
							(field) =>
								!field?.isHide && (
									<div className="mb-3">{getField(field, validation)}</div>
								)
						)}
					</Col>
					<Col className={`lg-6 ${customColClasses}`}>
						{rightFormFields?.map(
							(field) =>
								!field?.isHide && (
									<div className="mb-3">{getField(field, validation)}</div>
								)
						)}
					</Col>
				</Row>
				<Row>{customComponent}</Row>
				<Row>
					<Col>
						<div className="text-end">
							{isSubmit && (
								<button
									type="submit"
									className="btn btn-primary waves-effect waves-light"
									disabled={isSubmitLoading}
								>
									{submitLabel}
								</button>
							)}
						</div>
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="text-end">
							{isEdit && (
								<button
									className="btn btn-primary waves-effect waves-light"
									disabled={isSubmitLoading}
									type="button"
									onClick={() => enableEdit(false)}
								>
									Edit
								</button>
							)}
						</div>
					</Col>
				</Row>
			</Form>
		</Row>
	</Card>
);

FormPage.defaultProps = {
	validation: {},
	submitLabel: 'Save',
	customColClasses: '',
	customComponent: <div />,
	isSubmitLoading: false,
	staticFormFields: [],
	isSubmit: true,
	isEdit: false,
	enableEdit: () => {},
};

FormPage.propTypes = {
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
};

export default FormPage;
