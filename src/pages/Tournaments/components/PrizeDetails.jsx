/* eslint-disable react/prop-types */
import React from 'react';
import { Badge, Col, Row } from 'reactstrap';

const PrizeDetails = ({ tournamentDetail }) => {
	let prizesArray = {};

	tournamentDetail?.tournamentPrizes?.map((prize) => {
		prizesArray = {
			...prizesArray,
			[prize?.rank]: prize?.type === 'cash' ? prize?.amount : prize?.item,
		};
		return '';
	});

	return (
		<Row className="px-5 py-3">
			<Row lg={12} className="p-2 border-bottom">
				<Col
					lg={4}
					className="fw-semibold py-2 d-flex justify-content-center font-size-16"
				>
					Position
				</Col>
				<Col
					lg={8}
					className="fw-semibold py-2 d-flex justify-content-center font-size-16"
				>
					Prize
				</Col>
			</Row>
			{Object.entries(prizesArray || []).map(([winner, prize]) => (
				<Row lg={12} key={winner} className="py-2 border-bottom">
					<Col
						lg={4}
						className="fw-semibold d-flex justify-content-center font-size-16"
					>
						{winner}
					</Col>
					<Col
						lg={8}
						className="py-2 d-flex justify-content-center font-size-16"
					>
						{typeof prize === 'string' ? (
							<div className="d-flex justify-content-center align-items-center ms-4">
								{prize}{' '}
								<Badge className="bg-success font-size-10 ms-1">Non Cash</Badge>
							</div>
						) : (
							`${
								tournamentDetail?.prizeSettlementMethod !== 'percentage'
									? ''
									: ''
							} ${prize} ${
								tournamentDetail?.prizeSettlementMethod === 'percentage'
									? '%'
									: ''
							}`
						)}
					</Col>
				</Row>
			))}
		</Row>
	);
};

export default PrizeDetails;
