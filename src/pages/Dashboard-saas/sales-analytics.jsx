/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import getChartColorsArray from '../../components/Common/ChartsDynamicColor';

const SalesAnalytics = ({ dataColors }) => {
	const apexsaleschartColors = getChartColorsArray(dataColors);
	const series = [56, 38, 26];
	const options = {
		labels: ['Series A', 'Series B', 'Series C'],
		colors: apexsaleschartColors,
		legend: { show: !1 },
		plotOptions: {
			pie: {
				donut: {
					size: '50%',
				},
			},
		},
	};

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<h4 className="card-title mb-4">Sales Analytics</h4>

					<div>
						<div id="donut-chart">
							<ReactApexChart
								options={options}
								series={series}
								type="donut"
								height={160}
								className="apex-charts"
							/>
						</div>
					</div>

					<div className="text-center text-muted">
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
					</div>
				</CardBody>
			</Card>
		</Col>
	);
};

export default SalesAnalytics;
