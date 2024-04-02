import PropTypes from 'prop-types';
import React, { lazy, Suspense } from 'react';
import { Container, Row, Col } from 'reactstrap';

// import Charts
import { withTranslation } from 'react-i18next';
import { projectName } from '../../constants/config';

// Pages Components
import WelcomeComp from './WelcomeComp';

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useDashboardView from './hooks/useDashboardView';
import LivePlayerReports from './LivePlayerReports';
import DemographicReport from './DemographicReport';
import LoggedInPlayer from './LoggedInPlayer';

import './dashboard.scss';

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
					<Col xl="3">
						<WelcomeComp />
						<LoggedInPlayer
							loggedInOptions={loggedInOptions}
							isLivePlayerLoading={isLivePlayerLoading}
						/>
					</Col>
					<Col xl="9">
						<LivePlayerReports
							isLivePlayerLoading={isLivePlayerLoading}
							livePlayerData={livePlayerData}
						/>
						<DemographicReport />
					</Col>
				</Row>
				<Row>
					<Suspense>
						<KpiSummary />
					</Suspense>

					<Suspense>
						<KpiReport />
					</Suspense>

					<Suspense>
						<GameReport />
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
