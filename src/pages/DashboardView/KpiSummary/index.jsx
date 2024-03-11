/* eslint-disable jsx-a11y/control-has-associated-label */
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
import { CSVLink } from 'react-csv';
import moment from 'moment';
import TableContainer from '../../../components/Common/TableContainer';
import { tableCustomClass } from '../../../constants/config';

const KpiSummary = (props) => {
	const {
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		formattedKpiSummary,
		isKpiSummaryLoading,
		kpiSummaryStartDate,
		kpiSummaryEndDate,
		setKpiSummaryStartDate,
		setKpiSummaryEndDate,
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
							<InputGroup>
								<Flatpickr
									className="form-control dashboard-range-picker"
									value={[kpiSummaryStartDate, kpiSummaryEndDate]}
									placeholder="Select Date"
									options={{
										mode: 'range',
										dateFormat: 'Y-m-d',
										minDate: moment().subtract(100, 'years').utc().toDate(),
										maxDate: moment().utc().startOf('day').toDate(),
									}}
									onChange={(date) => {
										setKpiSummaryStartDate(date[0]);
										setKpiSummaryEndDate(date[1]);
									}}
									monthsShown={2}
								/>
								<div className="input-group-append">
									<span className="input-group-text">
										<i className="mdi mdi-clock-outline" />
									</span>
								</div>
							</InputGroup>
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
						{/* <NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === 'banking',
								})}
								onClick={() => setActiveKpiSummTab('banking')}
							>
								Banking
							</NavLink>
						</NavItem> */}
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
	kpiSummaryStartDate: PropTypes.string.isRequired,
	kpiSummaryEndDate: PropTypes.string.isRequired,
	setKpiSummaryStartDate: PropTypes.func.isRequired,
	setKpiSummaryEndDate: PropTypes.func.isRequired,
	loadKPISummary: PropTypes.func.isRequired,
};

export default KpiSummary;
