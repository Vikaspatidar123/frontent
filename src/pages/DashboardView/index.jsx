/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';
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

const KpiSummary = lazy(() => import('./KpiSummary'));
const KpiReport = lazy(() => import('./KpiReport'));
const GameReport = lazy(() => import('./GameReport'));

const DashboardView = ({ t }) => {
	// meta title
	document.title = projectName;

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
				<Card>
					<Row>
						<Col xl="3">
							<LoggedInPlayer
								loggedInOptions={loggedInOptions}
								isLivePlayerLoading={isLivePlayerLoading}
							/>
						</Col>
						<Col xl="9">
							<Card>
								<CardBody>
									<h4 className="card-title font-size-16">Revenue Report</h4>
									<RevenueReport
										livePlayerData={livePlayerData}
										isLivePlayerLoading={isLivePlayerLoading}
									/>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Card>
				<Row>
					<Col xl="12">
						<DemographicReport />
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
