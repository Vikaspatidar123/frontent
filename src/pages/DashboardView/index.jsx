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
// import WelcomeComp from './WelcomeComp'
// import MonthlyEarning from './MonthlyEarning'
// import SocialSource from './SocialSource'
// import ActivityComp from './ActivityComp'
// import TopCities from './TopCities'
// import LatestTranaction from './LatestTranaction'

// Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useDashboardView from './hooks/useDashboardView';
import Reports from './Reports';

// i18n

// redux

const DashboardView = ({ t }) => {
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

	const { isLivePlayerLoading, livePlayerData } = useDashboardView();
	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumbs title={t('Dashboards')} breadcrumbItem={t('Dashboard')} />

				<Row>
					{/* <Col xl='3'>
              <WelcomeComp /> 
             <MonthlyEarning />
             </Col> */}
					<Col xl="12">
						<Row>
							<Reports
								isLivePlayerLoading={isLivePlayerLoading}
								livePlayerData={livePlayerData}
							/>
						</Row>

						{/* <Card>
                <CardBody>
                  <div className='d-sm-flex flex-wrap'>
                    <h4 className='card-title mb-4'>Email Sent</h4>
                    <div className='ms-auto'>
                      <ul className='nav nav-pills'>
                        <li className='nav-item'>
                          <Button
														// to="#"
                          className={classNames(
														  { active: periodType === 'weekly' },
														  'nav-link'
                          )}
                          onClick={() => {
														  onChangeChartPeriod('weekly')
                          }}
                          id='one_month'
                        >
                          Week
                        </Button>{' '}
                        </li>
                        <li className='nav-item'>
                          <Button
														// to="#"
                          className={classNames(
														  { active: periodType === 'monthly' },
														  'nav-link'
                          )}
                          onClick={() => {
														  onChangeChartPeriod('monthly')
                          }}
                          id='one_month'
                        >
                          Month
                        </Button>
                        </li>
                        <li className='nav-item'>
                          <Button
														// to="#"
                          className={classNames(
														  { active: periodType === 'yearly' },
														  'nav-link'
                          )}
                          onClick={() => {
														  onChangeChartPeriod('yearly')
                          }}
                          id='one_month'
                        >
                          Year
                        </Button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <StackedColumnChart
                    periodData={periodData}
                    dataColors='["--bs-primary", "--bs-warning", "--bs-success"]'
                  />
                </CardBody>
              </Card> */}
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
