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
					<h4 className="card-title my-4">Logged In Players</h4>

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
				</CardBody>
			</Card>
		</Col>
	);
};

export default LoggedInPlayer;
