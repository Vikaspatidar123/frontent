/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-nested-ternary */

import React from 'react';
import { Badge, Card, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

import { selectedLanguage } from '../../../constants/config';

const GeneralDetails = ({ paymentDetails }) => (
	<Row>
		<Col sm={4}>
			<Card className="p-3">
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
			</Card>
		</Col>
		<Col sm={4}>
			<Card className="p-3">
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
							className="mb-3"
							bg={paymentDetails?.isActive ? 'success' : 'dark'}
						>
							{paymentDetails?.isActive ? (
								<i className="mdi mdi-check-outline"> Active </i>
							) : (
								<i className="mdi mdi-clock-outline"> In-Active </i>
							)}
						</Badge>
					</Col>
				</Row>
			</Card>
		</Col>

		<Col sm={4}>
			<Card className="p-3">
				<Row>
					<Col sm={4}>
						<h6 className="text-nowrap">Deposit Allowed:</h6>
					</Col>
					<Col>
						<Badge
							className="mb-3"
							bg={paymentDetails?.depositAllowed ? 'success' : 'dark'}
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
					<Col sm={4}>
						<h6 className="text-nowrap">Withdraw Allowed:</h6>
					</Col>
					<Col>
						<Badge
							className="mb-3"
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
			</Card>
		</Col>
	</Row>
);

GeneralDetails.defaultProps = {
	paymentDetails: {},
};

GeneralDetails.propTypes = {
	paymentDetails: PropTypes.objectOf,
};

export default GeneralDetails;
