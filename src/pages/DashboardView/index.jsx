import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import {
	Container,
	Row,
	Col,
	//   Button,
	//   Card,
	//   CardBody,
} from 'reactstrap';

// import classNames from 'classnames'

// import Charts
import { withTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { projectName } from '../../constants/config';
// import StackedColumnChart from './StackedColumnChart'

// import action
// import { getChartsData as onGetChartsData } from '../../store/actions'

// Pages Components
import WelcomeComp from './WelcomeComp';
// import MonthlyEarning from './MonthlyEarning'
// import SocialSource from './SocialSource'
// import TopCities from './TopCities'
// import LatestTranaction from './LatestTranaction'

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useDashboardView from './hooks/useDashboardView';
import LivePlayerReports from './LivePlayerReports';
import DemographicReport from './DemographicReport';
import KpiSummary from './KpiSummary';
import KpiReport from './KpiReport';
import GameReport from './GameReport';
import LoggedInPlayer from './LoggedInPlayer';

import './dashboard.scss';

const DashboardView = ({ t }) => {
	// const [activeKpiSummTab, setActiveKpiSummTab] = useState('banking');
	//   const dispatch = useDispatch()

	const selectDashboardState = (state) => state.Dashboard;
	const DashboardProperties = createSelector(
		selectDashboardState,
		(dashboard) => ({
			chartsData: dashboard.chartsData,
		})
	);

	const { chartsData } = useSelector(DashboardProperties);

	//   const [periodData, setPeriodData] = useState([])
	//   const [periodType, setPeriodType] = useState('yearly')

	useEffect(() => {
		// setPeriodData(chartsData)
	}, [chartsData]);

	//   const onChangeChartPeriod = (pType) => {
	//     setPeriodType(pType)
	//     dispatch(onGetChartsData(pType))
	//   }

	//   useEffect(() => {
	//     // dispatch(onGetChartsData('yearly'))
	//   }, [dispatch])

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
		exportReport,
		exportGameReport,
		exportKPIReport,
		exportKPISummaryReport,
	} = useDashboardView();
	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumbs title={t('Dashboards')} breadcrumbItem={t('Dashboard')} />

				<Row>
					<Col xl="3">
						<WelcomeComp />
						{/* <MonthlyEarning /> */}
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
								exportReport={exportReport}
							/>
						</Row>
					</Col>
				</Row>
				<Row>
					<Col xl="12">
						<Row>
							<KpiSummary
								activeKpiSummTab={activeKpiSummTab}
								setActiveKpiSummTab={setActiveKpiSummTab}
								kPISummaryColumn={kPISummaryColumn}
								kPISummary={kPISummary}
								exportReport={exportKPISummaryReport}
							/>
						</Row>
					</Col>
					<Col xl="12">
						<Row>
							<KpiReport
								activeKpiReportTab={activeKpiReportTab}
								setActiveKpiReportTab={setActiveKpiReportTab}
								kPIReportColumn={kPIReportColumn}
								kPIReport={kPIReport}
								exportReport={exportKPIReport}
							/>
						</Row>
					</Col>
					<Col xl="12">
						<Row>
							<GameReport
								activeGameReportTab={activeGameReportTab}
								setActiveGameReportTab={setActiveGameReportTab}
								gameReportColumn={gameReportColumn}
								gameReport={gameReport}
								exportReport={exportGameReport}
							/>
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
