/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import {
	Col,
	Card,
	Nav,
	CardBody,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
} from 'reactstrap';
import classnames from 'classnames';

// Simple bar
import SimpleBar from 'simplebar-react';
import TableContainer from '../../../components/Common/TableContainer';
import { tableCustomClass } from '../../../constants/config';
import { objectToarrayKpiReport } from './supportFunction';

const KpiReport = (props) => {
	const {
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReportColumn,
		kPIReport,
	} = props;
	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<h4 className="card-title mb-4">KPI Report</h4>

					<Nav pills className="bg-light rounded" role="tablist">
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiReportTab === 'game',
								})}
								onClick={() => {
									setActiveKpiReportTab('game');
								}}
							>
								GAME
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiReportTab === 'provider',
								})}
								onClick={() => {
									setActiveKpiReportTab('provider');
								}}
							>
								PROVIDER
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent
						activeTab={activeKpiReportTab}
						className="mt-4 kpi-dashboard-tab"
					>
						<TabPane tabId="game">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPIReportColumn || []}
									data={objectToarrayKpiReport(kPIReport, 'game')}
									isGlobalFilter={false}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={
										objectToarrayKpiReport(kPIReport, 'game').length
									}
									// tbodyHeight="300"
									// isLoading={!isLoading}
								/>
							</SimpleBar>
						</TabPane>
						<TabPane tabId="provider">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPIReportColumn || []}
									data={objectToarrayKpiReport(kPIReport, 'provider')}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									customPageSize={
										objectToarrayKpiReport(kPIReport, 'provider')?.length
									}
									// isLoading={!isLoading}
									// tbodyHeight="300"
								/>
							</SimpleBar>
						</TabPane>
					</TabContent>
				</CardBody>
			</Card>
		</Col>
	);
};
KpiReport.propTypes = {
	activeKpiReportTab: PropTypes.string,
	setActiveKpiReportTab: PropTypes.func,
	kPIReportColumn: PropTypes.arrayOf,
	kPIReport: PropTypes.arrayOf,
};
KpiReport.defaultProps = {
	activeKpiReportTab: PropTypes.string,
	setActiveKpiReportTab: PropTypes.func,
	kPIReportColumn: PropTypes.arrayOf,
	kPIReport: PropTypes.arrayOf,
};

export default KpiReport;
