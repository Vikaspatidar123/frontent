import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Form, Card, UncontrolledTooltip } from 'reactstrap';
import { getField } from '../../helpers/customForms';

const LoyaltyFormPage = ({
	validation,
	formFields,
	submitLabel,
	isSubmitLoading,
	deleteLevel,
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
					<Col lg={12} sm={12}>
						{formFields?.map((fields, index) => (
							<Row>
								{fields?.map(
									(field) =>
										!field?.isHide && (
											<Col lg={2} sm={2}>
												<div className="mb-3 pr-2">
													{getField(field, validation)}
												</div>
											</Col>
										)
								)}
								<Col lg={2} sm={2}>
									{formFields.length - 1 === index ? (
										<button
											type="button"
											className="btn btn-sm btn-soft-danger m-1"
											onClick={() => {
												deleteLevel();
											}}
										>
											<i className="mdi mdi-delete" id="deletetooltip" />
											<UncontrolledTooltip
												placement="bottom"
												target="deletetooltip"
											>
												Delete this Level
											</UncontrolledTooltip>
										</button>
									) : (
										''
									)}
								</Col>
							</Row>
						))}
					</Col>
				</Row>
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

LoyaltyFormPage.defaultProps = {
	validation: {},
	submitLabel: 'Save',
	isSubmitLoading: false,
	formFields: [],
	deleteLevel: () => {},
};

LoyaltyFormPage.propTypes = {
	validation: PropTypes.objectOf,
	formFields: PropTypes.arrayOf,
	submitLabel: PropTypes.string,
	isSubmitLoading: PropTypes.bool,
	deleteLevel: PropTypes.func,
};

export default LoyaltyFormPage;
