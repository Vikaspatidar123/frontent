/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { lazy, Suspense, useState } from 'react';
import { Container, Row, Col, CardBody, Card } from 'reactstrap';

// import Charts
import { withTranslation } from 'react-i18next';
import { projectName } from '../../constants/config';

// Pages Components
// import WelcomeComp from './WelcomeComp';

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useDashboardView from './hooks/useDashboardView';
import LivePlayerReports from './LivePlayerReports';
import DemographicReport from './DemographicReport';
import LoggedInPlayer from './LoggedInPlayer';

import './dashboard.scss';
import PlayerReport from './PlayerReport';
import RevenueReport from './RevenueChart';
import { CustomSwitchButton } from '../../helpers/customForms';

const KpiSummary = lazy(() => import('./KpiSummary'));
const KpiReport = lazy(() => import('./KpiReport'));
const GameReport = lazy(() => import('./GameReport'));

const DashboardView = ({ t }) => {
	// meta title
	document.title = projectName;
	const [viewReport, setViewReport] = useState('revenue');

	const { isLivePlayerLoading, livePlayerData, loggedInOptions } =
		useDashboardView();

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumbs title={t('Dashboards')} breadcrumbItem={t('Dashboard')} />
				<Row>
					<LivePlayerReports
						isLivePlayerLoading={isLivePlayerLoading}
						livePlayerData={livePlayerData}
					/>
				</Row>
				<Row>
					<Col xl="3">
						<Card className="mini-stats-wid">
							<CardBody>
								<div className="d-flex">
									<div className="flex-grow-1">
										<div>
											<h4 className="card-title mb-3">View Report</h4>
										</div>
										<div
											className="d-flex cursor-pointer"
											onClick={() => setViewReport('revenue')}
										>
											<CustomSwitchButton
												type="radio"
												checked={viewReport === 'revenue'}
											/>{' '}
											<h4 className="card-title mb-3">Revenue</h4>
										</div>
										<div
											className="d-flex cursor-pointer"
											onClick={() => setViewReport('demographic')}
										>
											<CustomSwitchButton
												type="radio"
												checked={viewReport === 'demographic'}
											/>{' '}
											<h4 className="card-title">Demographic</h4>
										</div>
									</div>
								</div>
							</CardBody>
						</Card>
						<LoggedInPlayer
							loggedInOptions={loggedInOptions}
							isLivePlayerLoading={isLivePlayerLoading}
						/>
					</Col>
					<Col xl="9">
						<Row>
							{viewReport === 'revenue' ? (
								<Col xl="12">
									<Card>
										<CardBody>
											<h4 className="card-title font-size-16">
												Revenue Report
											</h4>
											<RevenueReport
												livePlayerData={livePlayerData}
												isLivePlayerLoading={isLivePlayerLoading}
											/>
										</CardBody>
									</Card>
								</Col>
							) : (
								<Col xl="12">
									<DemographicReport />
								</Col>
							)}
						</Row>
					</Col>
				</Row>
				<Row>
					<Suspense>
						<KpiSummary />
					</Suspense>

					<Suspense>
						<GameReport />
					</Suspense>

					<Suspense>
						<PlayerReport />
					</Suspense>

					<Suspense>
						<KpiReport />
					</Suspense>
				</Row>
			</Container>
		</div>
	);
};

DashboardView.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(DashboardView);
