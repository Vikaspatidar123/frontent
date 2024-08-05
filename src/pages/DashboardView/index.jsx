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
import FormModal from '../../components/Common/FormModal';
import { DASH_REPORTS } from './formFields';

const KpiSummary = lazy(() => import('./KpiSummary'));
const KpiReport = lazy(() => import('./KpiReport'));
const GameReport = lazy(() => import('./GameReport'));

const DashboardView = ({ t }) => {
	// meta title
	document.title = projectName;

	const {
		statsDataLoading,
		loggedInOptions,
		dashFilters,
		handleDashFilters,
		statsData,
		layoutModeType,
		showElementControl,
		setShowElementControl,
		formFields,
		validation,
	} = useDashboardView();

	const elementsToShow = validation.values;

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Dashboards')}
					breadcrumbItem={t('Dashboard')}
					showRightInfo={false}
					showElementControl
					paddingBottom="10px"
					toggleElementControl={() => setShowElementControl((prev) => !prev)}
				/>
				<DashboardFilters handleDashFilters={handleDashFilters} />
				{elementsToShow?.[DASH_REPORTS.reportCards] ? (
					<Row>
						<LivePlayerReports
							dashFilters={dashFilters}
							statsDataLoading={statsDataLoading}
							statsData={statsData}
						/>
					</Row>
				) : null}
				<Row>
					{elementsToShow?.[DASH_REPORTS.depositWithdraw] ? (
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
					) : null}
					{elementsToShow?.[DASH_REPORTS.betsChart] ? (
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
					) : null}
				</Row>
				<Row>
					{elementsToShow?.[DASH_REPORTS.ggrReport] ? (
						<Card>
							<CardBody>
								<h4 className="card-title font-size-16 d-flex align-items-center">
									<span className="mdi mdi-finance fs-1 me-3 text-success" />{' '}
									GGR Report ({' '}
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
									statsDataLoading={statsDataLoading}
									dashFilters={dashFilters}
								/>
							</CardBody>
						</Card>
					) : null}
				</Row>
				<Row>
					{elementsToShow?.[DASH_REPORTS.playerLogin] ? (
						<Col xl="3">
							<LoggedInPlayer
								loggedInOptions={loggedInOptions}
								statsDataLoading={statsDataLoading}
							/>
						</Col>
					) : null}
					{elementsToShow?.[DASH_REPORTS.activePlayers] ? (
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
					) : null}
				</Row>
				{elementsToShow?.[DASH_REPORTS.demographic] ? (
					<Row>
						<Col xl="12">
							<DemographicReport />
						</Col>
					</Row>
				) : null}
				<Row>
					{elementsToShow?.[DASH_REPORTS.kpiSummary] ? (
						<Suspense>
							<KpiSummary />
						</Suspense>
					) : null}

					{elementsToShow?.[DASH_REPORTS.topGames] ? (
						<Suspense>
							<GameReport />
						</Suspense>
					) : null}

					{elementsToShow?.[DASH_REPORTS.topPlayers] ? (
						<Suspense>
							<PlayerReport />
						</Suspense>
					) : null}

					{elementsToShow?.[DASH_REPORTS.kpiReport] ? (
						<Suspense>
							<KpiReport />
						</Suspense>
					) : null}
				</Row>
			</Container>
			<FormModal
				isOpen={showElementControl}
				setIsOpen={() => setShowElementControl((prev) => !prev)}
				header="Dashboard Reports"
				validation={validation}
				responsiveFormFields={formFields}
				customColClasses="col-md-12"
				isSubmitLoading={false}
				colOptions={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4, xxl: 4 }}
				isSubmit={false}
				modalSize="lg"
			/>
		</div>
	);
};

DashboardView.propTypes = {
	t: PropTypes.func.isRequired,
};

export default withTranslation()(DashboardView);
