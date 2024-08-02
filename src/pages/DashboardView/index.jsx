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
import BetsChart from './BetsChart.jsx';
import ActivePlayerChart from './ActivePlayerChart';

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
		handleDashFilters,
		statsData,
		layoutModeType,
	} = useDashboardView();
	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Dashboards')} breadcrumbItem={t('Dashboard')} />
				<DashboardFilters handleDashFilters={handleDashFilters} />
				<Row>
					<LivePlayerReports
						dashFilters={dashFilters}
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
					<Col sm={12} md={12} lg={12} xl={6}>
						<Card>
							<CardBody>
								<BetsChart
									dashFilters={dashFilters}
									statsData={statsData}
									layoutModeType={layoutModeType}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row>
					<Card>
						<CardBody>
							<h4 className="card-title font-size-16 d-flex align-items-center">
								<span className="mdi mdi-finance fs-1 me-3 text-success" /> GGR
								Report ({' '}
								{dashFilters?.categories?.map(
									(cate, idx) =>
										`${cate.label} ${
											(dashFilters?.categories?.length || 1) - 1 !== idx
												? '+ '
												: ''
										}`
								) || '-'}{' '}
								)
							</h4>
							<RevenueReport
								statsData={statsData}
								livePlayerData={livePlayerData}
								isLivePlayerLoading={isLivePlayerLoading}
								dashFilters={dashFilters}
							/>
						</CardBody>
					</Card>
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
							<CardBody className="logged-player">
								<h4 className="card-title font-size-16 d-flex align-items-center">
									<span className="mdi mdi-account-star fs-1 me-3 text-success" />{' '}
									Active players
								</h4>
								<ActivePlayerChart
									statsData={statsData}
									layoutModeType={layoutModeType}
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
