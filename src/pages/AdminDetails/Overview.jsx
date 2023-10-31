/* eslint-disable react/prop-types */
import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

const OverView = ({ details, t }) => {
	const overViewCol = [
		{
			row: 1,
			firstCol: { name: 'firstName', label: 'First Name' },
			secondCol: { name: 'lastName', label: 'Last Name' },
		},
		{
			row: 2,
			firstCol: { name: 'email', label: 'Email' },
			secondCol: { name: 'adminUsername', label: 'Username' },
		},
		{
			row: 3,
			firstCol: { name: 'role', label: 'Role' },
			secondCol: { name: 'group', label: 'Group' },
		},
	];

	return (
		<Row>
			<Col lg={12}>
				<Card>
					<CardBody>
						{overViewCol.map((item) => (
							<div key={item.row} className="row">
								<div className="col">
									<p>
										{t(`${item.firstCol.label}`)} :{' '}
										{item.firstCol.name !== 'role'
											? details[item.firstCol.name]
											: details?.AdminRole?.name}
									</p>
								</div>
								<div className="col">
									<p>
										{t(`${item.secondCol.label}`)} :{' '}
										{details[item.secondCol.name]}
									</p>
								</div>
							</div>
						))}
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};

export default OverView;
