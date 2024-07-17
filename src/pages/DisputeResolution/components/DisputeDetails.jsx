/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardBody, Spinner, Button } from 'reactstrap';
import { CustomInputField } from '../../../helpers/customForms';

const DisputeDetails = ({
	disputeDetails,
	detailsLoading,
	setShowReplyForm,
	showReplyForm,
	validation,
	sendMessageLoading,
}) => {
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);

	const messages = useMemo(
		() =>
			disputeDetails?.threadMessages?.map(
				({ content, threadAttachements, user, adminId, createdAt }) => {
					const username = adminId ? superAdminUser?.username : user?.username;
					const email = adminId ? superAdminUser?.email : user?.email;
					return (
						<>
							<div className="d-flex mb-4">
								<div className="avatar-xs">
									<span
										className={`m-2 avatar-title rounded-circle ${
											adminId ? 'bg-gradient' : 'bg-success'
										} text-white`}
									>
										{username?.[0]?.toUpperCase() || '#'}
									</span>
								</div>
								<div className="ms-4">
									<h5 className="font-size-14 mt-1">{username || '-'}</h5>
									<small className="text-muted">{email || '-'}</small>
								</div>
								{createdAt ? (
									<div className="ms-auto">
										{moment(createdAt).format('MMM Do YY, h:mm a')}
									</div>
								) : null}
							</div>

							<h4 className="mt-0 mb-3 font-size-16">{content}</h4>
							<Row>
								{threadAttachements?.map(({ filePath }) => (
									<Col xl="4" xs="6">
										<Card>
											<img
												className="card-img-top img-fluid"
												src={filePath}
												alt={filePath}
											/>
										</Card>
									</Col>
								))}
							</Row>
							{/* <hr className="bold-line" /> */}
							<hr />
						</>
					);
				}
			),
		[disputeDetails?.threadMessages, superAdminUser]
	);

	return (
		<div className="email-rightbar mb-3">
			<Card className="details-card overflow-scroll-hide">
				{detailsLoading ? (
					<Spinner
						color="primary"
						className="position-absolute top-50 start-50 mt-100"
					/>
				) : (
					<>
						<CardBody>{messages}</CardBody>
						{!showReplyForm ? (
							<div className="mb-4 ms-4">
								<Button
									className="btn btn-secondary  mt-4"
									onClick={() => {
										validation.resetForm();
										setShowReplyForm(true);
										const element = document.getElementsByClassName(
											'overflow-scroll-hide'
										)[0];
										if (element) element.scrollTop = element.scrollHeight;
									}}
								>
									<i className="mdi mdi-reply" /> Reply
								</Button>
							</div>
						) : (
							<Row>
								<Col xl="12" sm="12" className="px-5 pb-5">
									<CustomInputField
										name="message"
										id="message"
										type="textarea"
										onChange={validation.handleChange}
										value={validation.values?.message}
										placeholder="Enter message"
										invalid={
											!!(
												validation?.touched?.message &&
												validation?.errors?.message
											)
										}
										isError
										errorMsg={
											validation?.touched?.message &&
											validation?.errors?.message
										}
									/>
									<Dropzone
										onDrop={(acceptedFiles) => {
											// Handle the dropped files here
											validation.setFieldValue('files', acceptedFiles);
										}}
										accept="image/*"
										multiple
									>
										{({ getRootProps, getInputProps }) => (
											<div
												{...getRootProps()}
												className="dropzone mt-2"
												style={{
													border: '2px dashed #ccc',
													padding: '10px', // Decreased height
													textAlign: 'center',
												}}
											>
												<input {...getInputProps()} />
												{!validation.values.files?.length && (
													<>
														<div className="mb-3">
															<i className="display-4 text-muted bx bxs-cloud-upload" />
														</div>
														<h4>
															Drag & drop attachments here, or click to select
															files.
														</h4>
													</>
												)}
												<Row className="justify-content-center mt-4">
													{validation.values.files?.map((file) => (
														<Col xl={6} key={uuid()} className="text-center">
															<img
																src={URL.createObjectURL(file)}
																className="img-thumbnail"
																alt="thumbnail"
															/>
														</Col>
													))}
												</Row>
											</div>
										)}
									</Dropzone>
									{validation.touched?.files && (
										<p className="text-danger">
											{validation.errors.files?.[0]}
										</p>
									)}

									<div className="">
										<Button
											disabled={sendMessageLoading}
											className="btn btn-success  mt-4"
											onClick={() => validation.submitForm()}
										>
											{sendMessageLoading ? (
												<i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />
											) : (
												'Send'
											)}{' '}
											<i className="mdi mdi-send" />
										</Button>
									</div>
								</Col>
							</Row>
						)}
					</>
				)}
			</Card>
		</div>
	);
};

export default DisputeDetails;

DisputeDetails.propTypes = {
	disputeDetails: PropTypes.objectOf({
		disputeMessages: PropTypes.objectOf({
			id: PropTypes.string,
		}),
	}),
	detailsLoading: PropTypes.bool,
	values: PropTypes.objectOf({
		message: PropTypes.string,
	}).isRequired,
	validation: PropTypes.objectOf({
		values: PropTypes.objectOf({
			message: PropTypes.string,
		}),
	}).isRequired,
	showReplyForm: PropTypes.bool.isRequired,
	setShowReplyForm: PropTypes.func.isRequired,
	sendMessageLoading: PropTypes.bool.isRequired,
};

DisputeDetails.defaultProps = {
	disputeDetails: null,
	detailsLoading: false,
};
