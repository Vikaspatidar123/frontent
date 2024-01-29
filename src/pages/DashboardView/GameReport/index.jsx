/* eslint-disable import/extensions */
/* eslint-disable react/no-array-index-key */
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
import { dateConstants } from '../constant';

const GameReport = (props) => {
	const {
		activeGameReportTab,
		setActiveGameReportTab,
		gameReportColumn,
		gameReport,
		isGameReportLoading,
		gameReportDateOption,
		setGameReportDateOption,
		loadGameReport,
	} = props;

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<select
								value={gameReportDateOption}
								className="form-select ms-2"
								onChange={(e) => {
									setGameReportDateOption(e.target.value);
								}}
							>
								{dateConstants?.map((item) => (
									<option value={item.value} key={item.value}>
										{item.label}
									</option>
								))}
							</select>
							<CSVLink
								data={gameReport || []}
								filename="downloaded_data.csv"
								className="btn btn-primary dashboard-export-btn"
							>
								Export Details <i className="bx bx-download align-baseline" />
							</CSVLink>
						</div>
					</div>

					<div className="d-flex align-items-center">
						<h4 className="card-title font-size-18 mb-3">Game Report</h4>
						<i
							role="button"
							tabIndex="0"
							className="mdi mdi-refresh mx-2 font-size-24 mb-3"
							style={{ cursor: 'pointer' }}
							id="refreshGameReport"
							onClick={loadGameReport}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									loadGameReport();
								}
							}}
						/>
						<UncontrolledTooltip placement="top" target="refreshGameReport">
							Refresh
						</UncontrolledTooltip>
					</div>

					<Nav pills className="bg-light rounded" role="tablist">
						<NavItem>
							<NavLink
								className={classnames({
									active: activeGameReportTab === 'game',
								})}
								onClick={() => {
									setActiveGameReportTab('game');
								}}
							>
								GAME
							</NavLink>
						</NavItem>
						<NavItem>
							<NavLink
								className={classnames({
									active: activeGameReportTab === 'provider',
								})}
								onClick={() => {
									setActiveGameReportTab('provider');
								}}
							>
								PROVIDER
							</NavLink>
						</NavItem>
					</Nav>
					<TabContent
						activeTab={activeGameReportTab}
						className="mt-2 kpi-dashboard-tab"
					>
						<TabPane tabId="game">
							<SimpleBar style={{ maxHeight: '310px' }}>
								<TableContainer
									isLoading={isGameReportLoading}
									columns={gameReportColumn || []}
									data={gameReport || []}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={gameReport?.length || 50}
									// tbodyHeight="300"
									// isLoading={!isLoading}
								/>
							</SimpleBar>
						</TabPane>
						<TabPane tabId="provider">
							<SimpleBar style={{ maxHeight: '310px' }}>
								<TableContainer
									isLoading={isGameReportLoading}
									columns={gameReportColumn || []}
									data={gameReport || []}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									customPageSize={gameReport?.length || 50}
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
GameReport.propTypes = {
	activeGameReportTab: PropTypes.string,
	setActiveGameReportTab: PropTypes.func,
	gameReportColumn: PropTypes.arrayOf,
	gameReport: PropTypes.arrayOf,
	isGameReportLoading: PropTypes.bool,
	gameReportDateOption: PropTypes.string,
	setGameReportDateOption: PropTypes.func,
	loadGameReport: PropTypes.func,
};
GameReport.defaultProps = {
	activeGameReportTab: PropTypes.string,
	setActiveGameReportTab: PropTypes.func,
	gameReportColumn: PropTypes.arrayOf,
	gameReport: PropTypes.arrayOf,
	isGameReportLoading: PropTypes.bool,
	gameReportDateOption: PropTypes.string,
	setGameReportDateOption: PropTypes.func,
	loadGameReport: PropTypes.func,
};
export default GameReport;
