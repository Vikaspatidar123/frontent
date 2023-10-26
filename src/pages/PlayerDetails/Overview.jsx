/* eslint-disable react/prop-types */
import React from 'react';
import { Card, Col, Row, Spinner } from 'reactstrap';
import useUserOverview from './hooks/useUserOverview';

const Overview = ({ userDetails, userDetailsLoading }) => {
	const { basicInfo, contactInfo, kycInfo } = useUserOverview({
		user: userDetails,
	});

	return (
		<div>
			{userDetailsLoading ? (
				<Spinner
					color="primary"
					className="position-absolute top-50 start-50"
				/>
			) : (
				<Row>
					<Col xs={12} lg={4} className="col-padding">
						<Card className="card-overview">
							<h4 className="h4-overview text-center mt-3">
								Basic Info <hr className="h4-hr" />
							</h4>
							<div className="div-overview">
								{basicInfo?.map(({ label, value, subValue }) =>
									userDetails?.kycMethod !== 1 && label === 'Applicant Id'
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
					<Col xs={12} lg={4} className="col-padding">
						<Card className="card-overview">
							<h4 className="h4-overview text-center mt-3">
								Account Actions <hr className="h4-hr" />
							</h4>
							<div className="div-overview" />
						</Card>
					</Col>
					<Col xs={12} lg={4} className="col-padding">
						<Card className="card-overview">
							<h4 className="h4-overview text-center mt-3">
								Other Info <hr className="h4-hr" />
							</h4>
							<div className="div-overview">
								<h5 className="px-2 mx-1">
									Contact Info <hr className="h5-hr m-0 mt-2" />
								</h5>
								{contactInfo?.map(({ label, value, subValue }) =>
									userDetails?.kycMethod !== 1 && label === 'Applicant Id'
										? ''
										: (label === 'Reason' && value
												? true
												: label !== 'Reason') && (
												<div
													key={label}
													className="d-flex justify-content-between m-1"
												>
													<h6 className="px-2 overview-leftlabel">{label}</h6>
													<span className={`${subValue} px-2`}>
														{value || 'NA'}
													</span>
												</div>
										  )
								)}

								<h5 className="px-2 mx-1 mt-2">
									Affiliate Info <hr className="h5-hr m-0 mt-2" />
								</h5>
								<div className="d-flex justify-content-between m-1">
									<h6 className="px-2 overview-leftlabel">Affiliate Token</h6>
									<span className="px-2">
										{userDetails?.trackingToken || 'NA'}
									</span>
								</div>
								<div className="d-flex justify-content-between m-1">
									<h6 className="px-2 overview-leftlabel">Affiliate Status</h6>
									{userDetails?.affiliateStatus ? (
										<span className="text-success px-2">Linked</span>
									) : (
										<span className="text-danger px-2">Not Linked</span>
									)}
								</div>

								<h5 className="px-2 mx-1 mt-2">
									KYC Info <hr className="h5-hr m-0 mt-2" />
								</h5>
								{kycInfo?.map(({ label, value, subValue }) =>
									userDetails?.kycMethod !== 1 && label === 'Applicant Id'
										? ''
										: (label === 'Reason' && value
												? true
												: label !== 'Reason') && (
												<div
													key={label}
													className="d-flex justify-content-between m-1"
												>
													<h6 className="px-2 overview-leftlabel">{label}</h6>
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
			)}
		</div>
	);
};

export default Overview;
