/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Form, Card, UncontrolledTooltip } from 'reactstrap';
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
	formTitle,
	colOptions,
	responsiveFormFields,
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
				{/* Single column forms */}
				<Row className="justify-content-center">
					<Col lg={6}>
						{staticFormFields?.map(
							(field) =>
								!field?.isHide && (
									<div className={`mb-3 ${field?.divClass || ''}`}>
										{getField(field, validation)}
									</div>
								)
						)}
					</Col>
				</Row>
				{/* Two column forms */}
				<Row>
					<Col className={`lg-6 ${customColClasses}`}>
						{leftFormFields?.map(
							(field) =>
								!field?.isHide && (
									<div className={`mb-3 ${field?.divClass || ''}`}>
										{getField(field, validation)}
									</div>
								)
						)}
					</Col>
					<Col className={`lg-6 ${customColClasses}`}>
						{rightFormFields?.map(
							(field) =>
								!field?.isHide && (
									<div className={`mb-3 ${field?.divClass || ''}`}>
										{getField(field, validation)}
									</div>
								)
						)}
					</Col>
				</Row>
				{/* Responsive/customizable column forms */}
				<Row className="justify-content-start">
					{responsiveFormFields?.map(
						(field) =>
							!field?.isHide && (
								<>
									{field?.isNewRow && <div className="row" />}
									<Col
										id={`field-${field.name}`}
										{...(field?.fieldColOptions || colOptions)}
										className="mb-3"
									>
										{getField(field, validation)}
									</Col>
									{!!field.tooltipContent && (
										<UncontrolledTooltip
											placement="bottom"
											target={`field-${field.name}`}
										>
											{field.tooltipContent}
										</UncontrolledTooltip>
									)}
								</>
							)
					)}
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
									{isSubmitLoading && (
										<i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />
									)}
									{/* {isSubmitLoading && <i className="bx bx-loader bx-spin font-size-16 align-middle me-2" /> } */}{' '}
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
									className="btn btn-success waves-effect waves-light"
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
	formTitle: '',
	colOptions: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
	responsiveFormFields: [],
};

FormPage.propTypes = {
	validation: PropTypes.objectOf(PropTypes.string),
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
	colOptions: PropTypes.objectOf,
	responsiveFormFields: PropTypes.arrayOf,
};

export default FormPage;
