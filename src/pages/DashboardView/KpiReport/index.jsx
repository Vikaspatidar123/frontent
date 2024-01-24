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
import { CSVLink } from 'react-csv';
import TableContainer from '../../../components/Common/TableContainer';
// import { tableCustomClass } from '../../../constants/config';
import { dateConstants } from '../constant';
import { tableCustomClass } from '../../../constants/config';

const KpiReport = (props) => {
	const {
		activeKpiReportTab,
		setActiveKpiReportTab,
		kPIReportColumn,
		kPIReport,
		isKpiReportLoading,
	} = props;
	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<select
								// value={demoDateOptions}
								className="form-select ms-2"
								onChange={() => {
									// setDemoDateOptions(e.target.value);
								}}
							>
								{dateConstants?.map((item) => (
									<option value={item.value} key={item.value}>
										{item.label}
									</option>
								))}
							</select>
							<CSVLink
								data={kPIReport || []}
								filename="downloaded_data.csv"
								className="btn btn-primary dashboard-export-btn"
							>
								Export Details <i className="bx bx-download align-baseline" />
							</CSVLink>
						</div>
					</div>
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
									isLoading={isKpiReportLoading}
									columns={kPIReportColumn || []}
									data={kPIReport || []}
									isGlobalFilter={false}
									customPageSize={kPIReport?.length || 50}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
								/>
							</SimpleBar>
						</TabPane>
						<TabPane tabId="provider">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									isLoading={isKpiReportLoading}
									columns={kPIReportColumn || []}
									data={kPIReport || []}
									isGlobalFilter={false}
									customPageSize={kPIReport?.length || 50}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
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
	isKpiReportLoading: PropTypes.bool,
};
KpiReport.defaultProps = {
	activeKpiReportTab: PropTypes.string,
	setActiveKpiReportTab: PropTypes.func,
	kPIReportColumn: PropTypes.arrayOf,
	kPIReport: PropTypes.arrayOf,
	isKpiReportLoading: PropTypes.bool,
};

export default KpiReport;
