/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import uuid from 'react-uuid';
import { useSelector } from 'react-redux';
import {
	Row,
	Col,
	Card,
	CardBody,
	Spinner,
	Button,
	UncontrolledTooltip,
} from 'reactstrap';
import { CustomInputField } from '../../../helpers/customForms';

const DisputeDetails = ({
	disputeDetails,
	detailsLoading,
	validation,
	sendMessageLoading,
}) => {
	const superAdminUser = useSelector(
		(state) => state.PermissionDetails.superAdminUser
	);
	const cardRef = useRef(null);

	useEffect(() => {
		const scrollToBottom = () => {
			if (cardRef.current) {
				cardRef.current.scrollTop = cardRef.current.scrollHeight;
			}
		};

		setTimeout(scrollToBottom, 100);
	}, [disputeDetails]);

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

							<div className="ps-5 ms-2">
								<h4 className="mt-0 mb-3 font-size-16">{content}</h4>
								<Row>
									{threadAttachements?.map(({ filePath }) => (
										<Col xl="3" xs="4">
											<Card>
												<img className="" src={filePath} alt={filePath} />
											</Card>
										</Col>
									))}
								</Row>
							</div>
							{/* <hr className="bold-line" /> */}
							<hr />
						</>
					);
				}
			),
		[disputeDetails?.threadMessages, superAdminUser]
	);

	const handleDelete = (fileToDelete) => {
		const allFiles = validation.values.files;
		validation.setFieldValue(
			'files',
			allFiles.filter((file) => file !== fileToDelete)
		);
	};

	const attachmentList = useMemo(
		() =>
			validation.values.files?.length ? (
				<div className="attachments ps-3 pe-3 d-flex">
					{validation.values.files?.map((file) => (
						<div className="img-parent h-100 position-relative">
							<img
								key={uuid()}
								src={URL.createObjectURL(file)}
								className="img-thumbnail"
								alt="thumbnail"
								style={{ maxHeight: '100px', marginRight: '10px' }}
							/>
							<Col className="trash-btn position-absolute top-0 end-0">
								<Button
									className="btn btn-sm btn-soft-danger"
									onClick={() => handleDelete(file)}
								>
									<i className="mdi mdi-delete-outline" id="deletetooltip" />
									<UncontrolledTooltip placement="top" target="deletetooltip">
										Delete
									</UncontrolledTooltip>
								</Button>
							</Col>
						</div>
					))}
				</div>
			) : null,
		[validation.values.files]
	);

	return (
		<Card className="email-rightbar mb-3">
			<div className="details-card overflow-scroll-hide">
				{detailsLoading ? (
					<Spinner
						color="primary"
						className="position-absolute top-50 start-50 mt-100"
					/>
				) : (
					<>
						<h5 className="ms-4 mt-4 pe-2">
							Subject: <b>{disputeDetails?.subject}</b>
						</h5>
						<hr />
						<CardBody innerRef={cardRef}>{messages}</CardBody>
					</>
				)}
			</div>
			{attachmentList}
			<div className="d-flex align-items-center p-3">
				<CustomInputField
					rows="1"
					name="message"
					id="message"
					type="textarea"
					onChange={validation.handleChange}
					value={validation.values?.message}
					placeholder="Enter message"
					className="flex-grow-1"
					style={{ resize: 'none' }}
				/>
				<input
					type="file"
					id="files"
					multiple
					className="d-none"
					onChange={(e) =>
						validation.setFieldValue('files', Array.from(e.target.files))
					}
				/>
				<i
					className="mdi mdi-paperclip paper-clip-input"
					onClick={() => document.getElementById('files').click()}
				/>
				<Button
					disabled={sendMessageLoading}
					className="btn btn-success ms-2 w-105"
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
			{validation.touched.message || validation.touched.files ? (
				<p className="text-danger file-input-error">
					{validation.errors.message || validation.errors.files}
				</p>
			) : null}
		</Card>
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
	sendMessageLoading: PropTypes.bool.isRequired,
};

DisputeDetails.defaultProps = {
	disputeDetails: null,
	detailsLoading: false,
};
