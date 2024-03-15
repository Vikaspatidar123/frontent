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
import { tableCustomClass } from '../../../constants/config';
import { TABS, dateConstants } from '../constant';

const KpiSummary = (props) => {
	const {
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		formattedKpiSummary,
		isKpiSummaryLoading,
		kpiSummaryDate,
		setKpiSummaryDate,
		loadKPISummary,
	} = props;
	const lastDate = new Date();

	// add a day
	lastDate.setDate(lastDate.getDate() + 1);
	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<select
								value={kpiSummaryDate}
								className="form-select ms-2"
								onChange={(e) => {
									setKpiSummaryDate(e.target.value);
								}}
							>
								{dateConstants?.map((item) => (
									<option value={item.value} key={item.value}>
										{item.label}
									</option>
								))}
							</select>
							<CSVLink
								data={formattedKpiSummary || []}
								filename="downloaded_data.csv"
								className="btn btn-primary dashboard-export-btn"
							>
								Export Details <i className="bx bx-download align-baseline" />
							</CSVLink>
						</div>
					</div>

					<div className="d-flex align-items-center">
						<h4 className="card-title font-size-18 mb-3">KPI Summary</h4>
						<i
							role="button"
							tabIndex="0"
							className="mdi mdi-refresh mx-2 font-size-24 mb-3"
							style={{ cursor: 'pointer' }}
							id="refreshKpiSummary"
							onClick={loadKPISummary}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									loadKPISummary();
								}
							}}
						/>
						<UncontrolledTooltip placement="top" target="refreshKpiSummary">
							Refresh
						</UncontrolledTooltip>
					</div>

					<Nav pills className="bg-light rounded" role="tablist">
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === TABS.SPORT,
								})}
								onClick={() => setActiveKpiSummTab(TABS.SPORT)}
							>
								Sports
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === TABS.CASINO,
								})}
								onClick={() => setActiveKpiSummTab(TABS.CASINO)}
							>
								Casino
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent
						activeTab={activeKpiSummTab}
						className="mt-2 kpi-dashboard-tab"
					>
						<TabPane tabId="banking">
							<SimpleBar style={{ maxHeight: '310px' }}>
								<TableContainer
									isLoading={isKpiSummaryLoading}
									columns={kPISummaryColumn || []}
									data={formattedKpiSummary || []}
									isGlobalFilter={false}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={kPISummary?.count || 100}
									// tbodyHeight="300"
									// isLoading={!isLoading}
								/>
							</SimpleBar>
						</TabPane>
						<TabPane tabId="sport">
							<SimpleBar style={{ maxHeight: '310px' }}>
								<TableContainer
									isLoading={isKpiSummaryLoading}
									columns={kPISummaryColumn || []}
									data={formattedKpiSummary || []}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={kPISummary?.count || 100}
									// isLoading={!isLoading}
									// tbodyHeight="300"
								/>
							</SimpleBar>
						</TabPane>

						<TabPane tabId="casino">
							<SimpleBar style={{ maxHeight: '310px' }}>
								<TableContainer
									isLoading={isKpiSummaryLoading}
									columns={kPISummaryColumn || []}
									data={formattedKpiSummary || []}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={kPISummary?.count || 100}
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
KpiSummary.propTypes = {
	activeKpiSummTab: PropTypes.string.isRequired,
	setActiveKpiSummTab: PropTypes.func.isRequired,
	kPISummaryColumn: PropTypes.arrayOf.isRequired,
	kPISummary: PropTypes.arrayOf.isRequired,
	formattedKpiSummary: PropTypes.arrayOf.isRequired,
	isKpiSummaryLoading: PropTypes.bool.isRequired,
	kpiSummaryDate: PropTypes.string.isRequired,
	setKpiSummaryDate: PropTypes.func.isRequired,
	loadKPISummary: PropTypes.func.isRequired,
};

export default KpiSummary;
