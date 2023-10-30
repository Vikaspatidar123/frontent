import React from 'react';
import { Card, Col, Collapse, Row, Form, Label, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { getField } from '../../helpers/customForms';
import { experienceData, jobType } from '../../common/data';

const Filters = ({
	filterFields,
	validation,
	actionButtons,
	isAdvanceOpen,
}) => (
	<Row>
		<Col lg={12}>
			<Card className="job-filter">
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						validation.handleSubmit();
						return false;
					}}
				>
					<Row className="g-3">
						{filterFields?.map(
							(field) =>
								!field?.isHide && (
									<Col xxl={2} lg={4}>
										<div className="position-relative">
											{getField(field, validation)}
										</div>
									</Col>
								)
						)}
						{actionButtons?.map(
							({ label, icon, handleClick, isHide, color, type }) =>
								!isHide && (
									<Col xxl={1} xl={1} lg={1} md={2} sm={2}>
										<div className="position-relative h-100 hstack gap-3">
											<button
												type={type === 'button' ? 'button' : 'submit'}
												className={`btn h-100 w-100 ${color || 'btn-primary'}`}
												onClick={handleClick}
											>
												<i className={`${icon} align-middle`} />
												{`  ${label}`}
											</button>
										</div>
									</Col>
								)
						)}
						<Collapse isOpen={isAdvanceOpen} id="advanceCollapse">
							<div>
								<Row className="g-3">
									<Col xxl={4} lg={6}>
										<div>
											<Label
												htmlFor="experience"
												className="form-label fw-semibold"
											>
												Experience
											</Label>
										</div>
										{(experienceData || []).map((item) => (
											<div
												className="form-check form-check-inline"
												key={item?.id}
											>
												<Input
													className="form-check-input"
													type="checkbox"
													id={`inlineCheckbox${item.id}`}
													value={item.value}
												/>
												<Label
													className="form-check-label"
													htmlFor={`inlineCheckbox${item.id}`}
												>
													{item.label}
												</Label>
											</div>
										))}
									</Col>
									<Col xxl={4} lg={6}>
										<div>
											<Label
												htmlFor="jobType"
												className="form-label fw-semibold"
											>
												Job Type
											</Label>
										</div>
										{(jobType || []).map((item) => (
											<div
												className="form-check form-check-inline"
												key={item.id}
											>
												<Input
													type="checkbox"
													id={`inlineCheckbox${item.id}`}
													value={item.value}
												/>
												<Label
													className="form-check-label"
													htmlFor={`inlineCheckbox${item.id}`}
												>
													{item.label}
												</Label>
											</div>
										))}
									</Col>
									<Col xxl={4} lg={4}>
										<div className="position-relative">
											<Label
												htmlFor="qualificationInput"
												className="fw-semibold"
											>
												Qualification
											</Label>
											<Input
												type="text"
												id="qualificationInput"
												autoComplete="off"
												placeholder="Qualification"
											/>
											<i className="ri-government-line filter-icon" />
										</div>
									</Col>
								</Row>
							</div>
						</Collapse>
					</Row>
				</Form>
			</Card>
		</Col>
	</Row>
);

Filters.defaultProps = {
	isAdvanceOpen: false,
};

Filters.propTypes = {
	filterFields: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
	validation: PropTypes.objectOf.isRequired,
	actionButtons: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
	isAdvanceOpen: PropTypes.bool,
};

export default Filters;
