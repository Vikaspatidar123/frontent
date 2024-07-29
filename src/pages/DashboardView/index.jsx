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

import PlayerReport from './PlayerReport';
import RevenueReport from './RevenueChart';
import DashboardFilters from './DashboardFilters';
import DepositWithdrawChart from './DepositWithdrawChart';

const KpiSummary = lazy(() => import('./KpiSummary'));
const KpiReport = lazy(() => import('./KpiReport'));
const GameReport = lazy(() => import('./GameReport'));

const DashboardView = ({ t }) => {
	// meta title
	document.title = projectName;

	const {
		isLivePlayerLoading,
		livePlayerData,
		loggedInOptions,
		dashFilters,
		setDashFilters,
		handleDashFilters,
		statsData,
		layoutModeType,
	} = useDashboardView();
	// Filter oo be used
	console.log('filter data = ', dashFilters, setDashFilters);
	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Dashboards')} breadcrumbItem={t('Dashboard')} />
				<DashboardFilters handleDashFilters={handleDashFilters} />
				<Row>
					<LivePlayerReports
						isLivePlayerLoading={isLivePlayerLoading}
						livePlayerData={livePlayerData}
						statsData={statsData}
					/>
				</Row>
				<Row>
					<Col sm={12} md={12} lg={12} xl={6}>
						<Card>
							<CardBody>
								<DepositWithdrawChart
									statsData={statsData}
									layoutModeType={layoutModeType}
								/>
							</CardBody>
						</Card>
					</Col>
					{/* <Col sm={12} md={12} lg={12} xl={6}>
						<Card>
							<CardBody>
								<DepositWithdrawChart statsData={statsData} />
							</CardBody>
						</Card>
					</Col> */}
				</Row>
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
								<h4 className="card-title font-size-16 d-flex align-items-center">
									<span className="mdi mdi-finance fs-1 me-3 text-success" />{' '}
									GGR Report
								</h4>
								<RevenueReport
									livePlayerData={livePlayerData}
									isLivePlayerLoading={isLivePlayerLoading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
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
