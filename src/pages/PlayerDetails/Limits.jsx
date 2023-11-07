/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Col, Container, Row, Spinner } from 'reactstrap';
import useEditLimits from './hooks/useEditLimits';
import SingleLimitCard from './components/SingleLimitCard';
import LimitCard from './components/LimitCard';
import SelfExclusionCard from './components/SelfExclusionCard';

const Limits = ({ userDetails, userId, userDetailsLoading }) => {
	const { limitLabels, userLimits } = useEditLimits({ userDetails });

	return (
		<Container fluid className="bg-white">
			<Card className="p-2">
				<h4 className="text-center p-2">Limits</h4>
				{userDetailsLoading ? (
					<Spinner
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<Row>
						{limitLabels?.map((limit) => (
							<Col md={4}>
								<SingleLimitCard
									limit={limit}
									currencyCode={userDetails?.currencyCode}
									userId={userId}
								/>
							</Col>
						))}
						<Col>
							<LimitCard
								limit={{
									placeholder: 'Enter Days',
									label: 'Take A Break',
									name: 'Time Period',
									value: userDetails?.selfExclusion
										? Math.ceil(
												Math.abs(
													new Date(userDetails?.selfExclusion) - new Date()
												) /
													(1000 * 60 * 60 * 24)
										  )
										: '',
								}}
								userId={userId}
							/>
						</Col>
						<Col>
							<LimitCard
								limit={{
									label: 'Session Limit',
									name: 'Time Period',
									placeholder: 'Enter Hours',
									value: userLimits?.timeLimit || '',
								}}
								userId={userId}
							/>
						</Col>
						<Col>
							<SelfExclusionCard
								limit={{
									label: 'Self Exclusion',
									type: 'SELF_EXCLUSION',
									days: userLimits?.isSelfExclusionPermanent
										? -1
										: userLimits?.selfExclusion
										? Math.ceil(
												Math.abs(
													new Date(userLimits?.selfExclusion) - new Date()
												) /
													(1000 * 60 * 60 * 24 * 30)
										  )
										: '',
									portal: userLimits?.selfExclusionType,
								}}
								userId={userId}
								currencyCode={userDetails?.currencyCode}
							/>
						</Col>
					</Row>
				)}
			</Card>
		</Container>
	);
};

export default Limits;
