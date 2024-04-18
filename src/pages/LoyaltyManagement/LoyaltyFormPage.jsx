import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row, Form, Card, UncontrolledTooltip, Button } from 'reactstrap';
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
															{
																...field,
																isDisabled: field?.disabled || bonusDetails,
															},
															validation
														)}
													</div>
												</div>
											</Col>
										)
								)}
								<Col lg={1} sm={1}>
									{formFields.length - 1 === index ? (
										<Button
											className="btn-sm m-1"
											color="danger"
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
										</Button>
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
							<Button
								type="submit"
								className="waves-effect waves-light"
								color="primary"
								disabled={isSubmitLoading || bonusDetails}
							>
								{submitLabel}
							</Button>
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
	bonusDetails: null,
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
