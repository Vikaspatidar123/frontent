/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Card, CardBody } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import DivLoader from '../../../components/Common/Loader/divLoader';
import { NoDataLoggedInContainer } from '../style';

const LoggedInPlayer = (props) => {
	const { loggedInOptions, isLivePlayerLoading } = props;
	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<h4 className="card-title mb-4">Logged In Players</h4>

					<div>
						<div id="donut-chart">
							{!isLivePlayerLoading && loggedInOptions?.series?.length > 0 && (
								<ReactApexChart
									options={loggedInOptions}
									series={loggedInOptions.series}
									type="donut"
									height={260}
									className="apex-charts"
								/>
							)}
							{isLivePlayerLoading && (
								<NoDataLoggedInContainer>
									<DivLoader isSmall loaderVarient="text-secondary" />
								</NoDataLoggedInContainer>
							)}
						</div>
					</div>

					{/* <div className="text-center text-muted">
						<Row>
							<Col xs="4">
								<div className="mt-4">
									<p className="mb-2 text-truncate">
										<i className="mdi mdi-circle text-primary me-1" /> Product A
									</p>
									<h5>$ 2,132</h5>
								</div>
							</Col>
							<Col xs="4">
								<div className="mt-4">
									<p className="mb-2 text-truncate">
										<i className="mdi mdi-circle text-success me-1" /> Product B
									</p>
									<h5>$ 1,763</h5>
								</div>
							</Col>
							<Col xs="4">
								<div className="mt-4">
									<p className="mb-2 text-truncate">
										<i className="mdi mdi-circle text-danger me-1" /> Product C
									</p>
									<h5>$ 973</h5>
								</div>
							</Col>
						</Row>
					</div> */}
				</CardBody>
			</Card>
		</Col>
	);
};

export default LoggedInPlayer;
