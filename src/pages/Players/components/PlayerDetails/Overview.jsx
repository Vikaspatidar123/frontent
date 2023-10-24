import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import useUserOverview from './hooks/useUserOverview';

const Overview = () => {
	const user = {
		username: 'Test User',
	};
	const { basicInfo } = useUserOverview({ user });

	return (
		<div>
			<Row>
				<Col xs={5} className="col-padding">
					<Card className="card-overview">
						<h4 className="h4-overview">
							Basic Info <hr className="h4-hr" />
						</h4>
						<div className="div-overview">
							{basicInfo?.map(({ label, value, subValue }) =>
								user?.kycMethod !== 1 && label === 'Applicant Id'
									? ''
									: (label === 'Reason' && value
											? true
											: label !== 'Reason') && (
											<div
												key={label}
												className="d-flex justify-content-between m-1"
											>
												<h6 className="px-2">{label}</h6>
												<span className={`${subValue} px-2`}>
													{value || 'NA'}
												</span>
											</div>
									  )
							)}
						</div>
					</Card>
				</Col>
			</Row>
		</div>
	);
};

export default Overview;
