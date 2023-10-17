import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Form, Card } from 'reactstrap';
import { getField } from '../../helpers/customForms';

const FormPage = ({
	validation,
	leftFormFields,
	rightFormFields,
	submitLabel,
	customColClasses,
	customComponent,
	isSubmitLoading,
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
							<button
								type="submit"
								disabled={isSubmitLoading}
								className="btn btn-success save-user"
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

FormPage.defaultProps = {
	validation: {},
	submitLabel: 'Save',
	customColClasses: '',
	customComponent: <div />,
	isSubmitLoading: false,
};

FormPage.propTypes = {
	validation: PropTypes.objectOf,
	leftFormFields: PropTypes.arrayOf.isRequired,
	rightFormFields: PropTypes.arrayOf.isRequired,
	submitLabel: PropTypes.string,
	customColClasses: PropTypes.string,
	customComponent: PropTypes.element,
	isSubmitLoading: PropTypes.bool,
};

export default FormPage;
