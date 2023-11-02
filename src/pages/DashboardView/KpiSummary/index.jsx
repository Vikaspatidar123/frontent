/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
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
							>
								Export Details
								<i className="bx bx-download align-baseline ms-1" />
							</button>
						</div>
					</div>
					<h4 className="card-title mb-4">KPI Summary</h4>

					<Nav pills className="bg-light rounded" role="tablist">
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
						<NavItem>
							<NavLink
								className={classnames({
									active: activeKpiSummTab === 'sports',
								})}
								onClick={() => setActiveKpiSummTab('sports')}
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
					</Nav>
					<TabContent
						activeTab={activeKpiSummTab}
						className="mt-4 kpi-dashboard-tab"
					>
						<TabPane tabId="banking">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPISummaryColumn || []}
									data={kPISummary?.Banking}
									isGlobalFilter={false}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={kPISummary?.Banking?.length}
									// tbodyHeight="300"
									// isLoading={!isLoading}
								/>
							</SimpleBar>
						</TabPane>
						<TabPane tabId="sports">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPISummaryColumn || []}
									data={kPISummary.SPORTS}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									// isLoading={!isLoading}
									// tbodyHeight="300"
								/>
							</SimpleBar>
						</TabPane>

						<TabPane tabId="casino">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={kPISummaryColumn || []}
									data={kPISummary.CASINO}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
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
};
KpiSummary.defaultProps = {
	activeKpiSummTab: PropTypes.string,
	setActiveKpiSummTab: PropTypes.func,
	kPISummaryColumn: PropTypes.arrayOf,
	kPISummary: PropTypes.arrayOf,
};
export default KpiSummary;
