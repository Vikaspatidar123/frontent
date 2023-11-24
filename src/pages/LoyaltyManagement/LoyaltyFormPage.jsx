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
	bonusDetails,
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
				<Row lg={12} sm={12}>
					{[
						'Levels *',
						'Loyalty Point Start *',
						'Loyalty Point End *',
						'Percentage *',
					].map((item, idx) => (
						<Col
							lg={idx === 0 ? 2 : 3}
							sm={idx === 0 ? 2 : 3}
							key={item}
							className="mb-2 fw-bold"
						>
							{item}
						</Col>
					))}
				</Row>
				<Row>
					<Col lg={12} sm={12}>
						{formFields?.map((fields, index) => (
							<Row>
								{fields?.map(
									(field, idx) =>
										!field?.isHide && (
											<Col lg={idx === 0 ? 2 : 3} sm={idx === 0 ? 2 : 3}>
												<div className="d-flex mb-3 pr-2">
													{idx === 1 && (
														<div className="form-control w-auto h-25 font-monospace bg-dark-subtle">
															{'>'}
														</div>
													)}
													<div className="w-100">
														{getField(
															{ ...field, isDisabled: bonusDetails },
															validation
														)}
													</div>
												</div>
											</Col>
										)
								)}
								<Col lg={1} sm={1}>
									{formFields.length - 1 === index ? (
										<button
											type="button"
											className="btn btn-sm btn-soft-danger m-1"
											onClick={() => {
												deleteLevel();
											}}
											disabled={bonusDetails}
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
								disabled={isSubmitLoading || bonusDetails}
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
	bonusDetails: {},
};

LoyaltyFormPage.propTypes = {
	validation: PropTypes.objectOf,
	formFields: PropTypes.arrayOf,
	submitLabel: PropTypes.string,
	isSubmitLoading: PropTypes.bool,
	deleteLevel: PropTypes.func,
	bonusDetails: PropTypes.objectOf,
};

export default LoyaltyFormPage;
