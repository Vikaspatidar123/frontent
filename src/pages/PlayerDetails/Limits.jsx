/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import useEditLimits from './hooks/useEditLimits';
import SingleLimitCard from './components/SingleLimitCard';

const Limits = ({ userDetails, userId }) => {
	const { limitLabels } = useEditLimits({ userDetails });

	return (
		<Container fluid className="bg-white">
			<Card className="p-2">
				<h4 className="text-center">Limits</h4>
				<Row>
					{limitLabels.map((limit) => (
						<Col md={4}>
							<SingleLimitCard
								limit={limit}
								currencyCode={userDetails?.currencyCode}
								userId={userId}
							/>
						</Col>
					))}
				</Row>
			</Card>
		</Container>
	);
};

export default Limits;
