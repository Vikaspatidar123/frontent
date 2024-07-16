/* eslint-disable no-nested-ternary */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody, Spinner } from 'reactstrap';
import { getRandomColor } from '../../../helpers/common';

const DisputeDetails = ({ disputeDetails, detailsLoading }) => (
	<div className="email-rightbar mb-3">
		<Card className="details-card overflow-scroll-hide">
			{detailsLoading ? (
				<Spinner
					color="primary"
					className="position-absolute top-50 start-50 mt-100"
				/>
			) : (
				disputeDetails?.threadMessages?.map(
					({ content, threadAttachements, user }) => (
						<CardBody className="">
							<div className="d-flex mb-4">
								<div className="avatar-xs">
									<span
										className={`m-2 avatar-title rounded-circle bg-${getRandomColor()}-subtle text-${getRandomColor()}`}
									>
										{user?.username?.[0]?.toUpperCase() || '#'}
									</span>
								</div>
								<div className="ms-4">
									<h5 className="font-size-14 mt-1">{user?.username || '-'}</h5>
									<small className="text-muted">{user?.email || '-'}</small>
								</div>
							</div>

							<h4 className="mt-0 font-size-16">{content}</h4>
							<hr />
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
						</CardBody>
					)
				)
			)}
		</Card>
	</div>
);

export default DisputeDetails;

DisputeDetails.propTypes = {
	disputeDetails: PropTypes.objectOf({
		disputeMessages: PropTypes.objectOf({
			id: PropTypes.string,
		}),
	}),
	detailsLoading: PropTypes.bool,
};

DisputeDetails.defaultProps = {
	disputeDetails: null,
	detailsLoading: false,
};
