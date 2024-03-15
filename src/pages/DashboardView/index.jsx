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
// import KpiSummary from './KpiSummary';
// import KpiReport from './KpiReport';
// import GameReport from './GameReport';
import LoggedInPlayer from './LoggedInPlayer';

import './dashboard.scss';
// import DivLoader from '../../components/Common/Loader/divLoader';

const KpiSummary = lazy(() => import('./KpiSummary'));
const KpiReport = lazy(() => import('./KpiReport'));
const GameReport = lazy(() => import('./GameReport'));

const DashboardView = ({ t }) => {
	// meta title
	document.title = projectName;

	const {
		isLivePlayerLoading,
		livePlayerData,
		demoGrapFormatedData,
		demoGraphOptions,
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReport,
		kPIReportColumn,
		activeGameReportTab,
		setActiveGameReportTab,
		gameReportColumn,
		gameReport,
		demoGraphicData,
		demoGraphColumn,
		demoDateOptions,
		setDemoDateOptions,
		isDemographicLoading,
		loggedInOptions,
		isKpiReportLoading,
		formattedKpiSummary,
		isKpiSummaryLoading,
		isGameReportLoading,
		kpiSummaryDate,
		setKpiSummaryDate,
		kpiReportDateOption,
		setKpiReportDateOption,
		gameReportDateOption,
		setGameReportDateOption,
		fetchData,
		loadKPISummary,
		loadKPIReport,
		loadGameReport,
	} = useDashboardView();
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
						<Row>
							<LivePlayerReports
								isLivePlayerLoading={isLivePlayerLoading}
								livePlayerData={livePlayerData}
							/>
						</Row>
						<Row>
							<DemographicReport
								demoGrapFormatedData={demoGrapFormatedData}
								demoGraphOptions={demoGraphOptions}
								demoGraphicData={demoGraphicData}
								demoGraphColumn={demoGraphColumn}
								demoDateOptions={demoDateOptions}
								setDemoDateOptions={setDemoDateOptions}
								isDemographicLoading={isDemographicLoading}
								fetchData={fetchData}
							/>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col xl="12">
						<Row>
							<Suspense>
								<KpiSummary
									activeKpiSummTab={activeKpiSummTab}
									setActiveKpiSummTab={setActiveKpiSummTab}
									kPISummaryColumn={kPISummaryColumn}
									kPISummary={kPISummary}
									formattedKpiSummary={formattedKpiSummary}
									isKpiSummaryLoading={isKpiSummaryLoading}
									kpiSummaryDate={kpiSummaryDate}
									setKpiSummaryDate={setKpiSummaryDate}
									loadKPISummary={loadKPISummary}
								/>
							</Suspense>
						</Row>
					</Col>
					<Col xl="12">
						<Row>
							<Suspense>
								<KpiReport
									activeKpiReportTab={activeKpiReportTab}
									setActiveKpiReportTab={setActiveKpiReportTab}
									kPIReportColumn={kPIReportColumn}
									kPIReport={kPIReport}
									isKpiReportLoading={isKpiReportLoading}
									kpiReportDateOption={kpiReportDateOption}
									setKpiReportDateOption={setKpiReportDateOption}
									loadKPIReport={loadKPIReport}
								/>
							</Suspense>
						</Row>
					</Col>
					<Col xl="12">
						<Row>
							<Suspense>
								<GameReport
									activeGameReportTab={activeGameReportTab}
									setActiveGameReportTab={setActiveGameReportTab}
									gameReportColumn={gameReportColumn}
									gameReport={gameReport}
									isGameReportLoading={isGameReportLoading}
									gameReportDateOption={gameReportDateOption}
									setGameReportDateOption={setGameReportDateOption}
									loadGameReport={loadGameReport}
								/>
							</Suspense>
						</Row>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

DashboardView.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(DashboardView);
