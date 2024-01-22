/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import PropTypes from 'prop-types';
import Flatpickr from 'react-flatpickr';
import {
	Col,
	Card,
	Nav,
	CardBody,
	NavItem,
	NavLink,
	TabContent,
	TabPane,
	InputGroup,
	UncontrolledTooltip,
} from 'reactstrap';
import classnames from 'classnames';

// Simple bar
import SimpleBar from 'simplebar-react';
import TableContainer from '../../../components/Common/TableContainer';
import { tableCustomClass } from '../../../constants/config';

const KpiSummary = (props) => {
	const {
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		exportReport,
		formattedKpiSummary,
		isKpiSummaryLoading,
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
							<InputGroup>
								<Flatpickr
									className="form-control dashboard-range-picker"
									// placeholder="dd M,yyyy"
									options={{
										mode: 'range ',
										dateFormat: 'Y-m-d',
										defaultDate: [new Date(), lastDate],
									}}
								/>
								<div className="input-group-append">
									<span className="input-group-text">
										<i className="mdi mdi-clock-outline" />
									</span>
								</div>
							</InputGroup>
							<button
								type="button"
								className="btn btn-primary dashboard-export-btn"
								onClick={exportReport}
							>
								Export Details{' '}
								<i className="bx bx-download align-baseline ms-1" />
							</button>
						</div>
					</div>

					<div className="d-flex align-items-center">
						<h4 className="card-title font-size-16 mb-3">KPI Summary</h4>
						<i
							className="mdi mdi-refresh mx-2 font-size-20 mb-3"
							style={{ cursor: 'pointer' }}
							id="refresh"
							// onClick={}
							// onKeyDown={}
							tabIndex="0"
						/>
						<UncontrolledTooltip placement="top" target="refresh">
							Refresh
						</UncontrolledTooltip>
					</div>

					<Nav pills className="bg-light rounded" role="tablist">
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === 'sport',
								})}
								onClick={() => setActiveKpiSummTab('sport')}
							>
								Sports
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === 'casino',
								})}
								onClick={() => setActiveKpiSummTab('casino')}
							>
								Casino
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === 'banking',
								})}
								onClick={() => setActiveKpiSummTab('banking')}
							>
								Banking
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent
						activeTab={activeKpiSummTab}
						className="mt-4 kpi-dashboard-tab"
					>
						<TabPane tabId="banking">
							<SimpleBar style={{ maxHeight: '300px' }}>
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
							<SimpleBar style={{ maxHeight: '330px' }}>
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
							<SimpleBar style={{ maxHeight: '330px' }}>
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
	activeKpiSummTab: PropTypes.string,
	setActiveKpiSummTab: PropTypes.func,
	kPISummaryColumn: PropTypes.arrayOf,
	kPISummary: PropTypes.arrayOf,
	exportReport: PropTypes.func.isRequired,
	formattedKpiSummary: PropTypes.arrayOf,
	isKpiSummaryLoading: PropTypes.bool,
};
KpiSummary.defaultProps = {
	activeKpiSummTab: PropTypes.string,
	setActiveKpiSummTab: PropTypes.func,
	kPISummaryColumn: PropTypes.arrayOf,
	kPISummary: PropTypes.arrayOf,
	formattedKpiSummary: PropTypes.arrayOf,
	isKpiSummaryLoading: PropTypes.bool,
};
export default KpiSummary;
