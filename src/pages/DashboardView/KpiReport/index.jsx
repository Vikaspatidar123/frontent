/* eslint-disable jsx-a11y/control-has-associated-label */

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
	UncontrolledTooltip,
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
		kpiReportDateOption,
		setKpiReportDateOption,
		loadKPIReport,
	} = props;
	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<select
								value={kpiReportDateOption}
								className="form-select ms-2"
								onChange={(e) => {
									setKpiReportDateOption(e.target.value);
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

					<div className="d-flex align-items-center">
						<h4 className="card-title font-size-18 mb-3">KPI Report</h4>
						<i
							role="button"
							tabIndex="0"
							className="mdi mdi-refresh mx-2 font-size-24 mb-3"
							style={{ cursor: 'pointer' }}
							id="refreshKpiReport"
							onClick={loadKPIReport}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									loadKPIReport();
								}
							}}
						/>
						<UncontrolledTooltip placement="top" target="refreshKpiReport">
							Refresh
						</UncontrolledTooltip>
					</div>

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
						className="mt-2 kpi-dashboard-tab"
					>
						<TabPane tabId="game">
							<SimpleBar style={{ maxHeight: '310px' }}>
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
							<SimpleBar style={{ maxHeight: '310px' }}>
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
	activeKpiReportTab: PropTypes.string.isRequired,
	setActiveKpiReportTab: PropTypes.func.isRequired,
	kPIReportColumn: PropTypes.arrayOf.isRequired,
	kPIReport: PropTypes.arrayOf.isRequired,
	isKpiReportLoading: PropTypes.bool.isRequired,
	kpiReportDateOption: PropTypes.string.isRequired,
	setKpiReportDateOption: PropTypes.func.isRequired,
	loadKPIReport: PropTypes.func.isRequired,
};

export default KpiReport;
