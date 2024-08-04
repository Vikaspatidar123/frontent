/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */

import React from 'react';
import { Badge, Card, CardHeader, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import { selectedLanguage } from '../../../constants/config';
import NoDataFound from '../../../components/Common/NoDataFound';

const GeneralDetails = ({ paymentDetails }) => (
	<Card className="p-3">
		<Row className="align-items-center">
			<Col sm={4} className="text-align-center">
				{paymentDetails?.image ? (
					<img
						src={paymentDetails?.image}
						alt="Payment Provider"
						style={{ width: '20vw' }}
					/>
				) : (
					<NoDataFound height="200px" width="300px" />
				)}
			</Col>
			<Col sm={8}>
				<CardHeader className="mb-4">
					<Row>
						<Col>
							<h3>
								{paymentDetails?.name?.[selectedLanguage]
									? Parser(paymentDetails?.name?.[selectedLanguage])
									: '-'}
							</h3>
						</Col>
					</Row>
				</CardHeader>
				<Row>
					<Col>
						<h6 className="text-nowrap">Name:</h6>
					</Col>
					<Col>
						<p>
							{paymentDetails?.name?.[selectedLanguage]
								? Parser(paymentDetails?.name?.[selectedLanguage])
								: '-'}
						</p>
					</Col>
				</Row>
				{/* <Row>
					<Col>
						<h6 className="text-nowrap">Title:</h6>
					</Col>
					<Col>
						<p>{paymentDetails?.displayName?.[selectedLanguage] || '-'}</p>
					</Col>
				</Row> */}
				<Row>
					<Col>
						<h6 className="text-nowrap">Description:</h6>
					</Col>
					<Col>
						{paymentDetails?.description?.[selectedLanguage]
							? Parser(paymentDetails?.description?.[selectedLanguage])
							: '-'}
					</Col>
				</Row>
				<Row>
					<Col>
						<h6 className="text-nowrap">Category:</h6>
					</Col>
					<Col>
						<p>{paymentDetails?.category?.toUpperCase()}</p>
					</Col>
				</Row>

				<Row>
					<Col>
						<h6 className="text-nowrap">Aggregator:</h6>
					</Col>
					<Col>
						<p>{paymentDetails?.aggregator}</p>
					</Col>
				</Row>

				<Row>
					<Col>
						<h6 className="text-nowrap">Provider Status:</h6>
					</Col>
					<Col>
						<Badge
							className={`mb-3 ${
								paymentDetails?.isActive ? 'bg-success' : 'bg-danger'
							}`}
						>
							{paymentDetails?.isActive ? (
								<i className="mdi mdi-check-outline"> Active </i>
							) : (
								<i className="mdi mdi-clock-outline"> Inactive </i>
							)}
						</Badge>
					</Col>
				</Row>
				<Row>
					<Col>
						<h6 className="text-nowrap">Deposit Allowed:</h6>
					</Col>
					<Col>
						<Badge
							className={`mb-3 ${
								paymentDetails?.depositAllowed ? 'bg-success' : 'bg-danger'
							}`}
						>
							{paymentDetails?.depositAllowed ? (
								<i className="mdi mdi-check-outline"> Yes </i>
							) : (
								<i className="mdi mdi-clock-outline"> No </i>
							)}
						</Badge>
					</Col>
				</Row>
				<Row>
					<Col>
						<h6 className="text-nowrap">Withdraw Allowed:</h6>
					</Col>
					<Col>
						<Badge
							className={`mb-3 ${
								paymentDetails?.depositAllowed ? 'bg-success' : 'bg-danger'
							}`}
							bg={paymentDetails?.withdrawAllowed ? 'success' : 'dark'}
						>
							{paymentDetails?.withdrawAllowed ? (
								<i className="mdi mdi-check-outline"> Yes </i>
							) : (
								<i className="mdi mdi-clock-outline"> No </i>
							)}
						</Badge>
					</Col>
				</Row>
			</Col>
		</Row>
	</Card>
);

GeneralDetails.defaultProps = {
	paymentDetails: {},
};

GeneralDetails.propTypes = {
	paymentDetails: PropTypes.objectOf,
};

export default GeneralDetails;
