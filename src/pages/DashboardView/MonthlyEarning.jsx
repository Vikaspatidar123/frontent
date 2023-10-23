/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';

import ApexRadial from './ApexRadial';

const MonthlyEarning = () => (
	<>
		{' '}
		<Card>
			<CardBody>
				<CardTitle className="mb-4">Monthly Earning</CardTitle>
				<Row>
					<Col sm="6">
						<p className="text-muted">This month</p>
						<h3>$34,252</h3>
						<p className="text-muted">
							<span className="text-success me-2">
								{' '}
								12% <i className="mdi mdi-arrow-up" />{' '}
							</span>{' '}
							From previous period
						</p>
						<div className="mt-4">
							<Link
								to=""
								className="btn btn-primary waves-effect waves-light btn-sm"
							>
								View More <i className="mdi mdi-arrow-right ms-1" />
							</Link>
						</div>
					</Col>
					<Col sm="6">
						<div className="mt-4 mt-sm-0">
							<ApexRadial dataColors='["--bs-primary"]' />
						</div>
					</Col>
				</Row>
				<p className="text-muted mb-0">
					We craft digital, graphic and dimensional thinking.
				</p>
			</CardBody>
		</Card>
	</>
);

export default MonthlyEarning;
