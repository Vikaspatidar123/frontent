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

const GameReport = (props) => {
	const {
		activeGameReportTab,
		setActiveGameReportTab,
		gameReportColumn,
		gameReport,
	} = props;

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<h4 className="card-title mb-4">Game Report</h4>

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
						className="mt-4 kpi-dashboard-tab"
					>
						<TabPane tabId="game">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={gameReportColumn || []}
									data={gameReport?.game}
									isGlobalFilter={false}
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass="kpiTableWrap"
									// theadClass={theadClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									pageCount={1}
									customPageSize={gameReport?.game?.length}
									// tbodyHeight="300"
									// isLoading={!isLoading}
								/>
							</SimpleBar>
						</TabPane>
						<TabPane tabId="provider">
							<SimpleBar style={{ maxHeight: '330px' }}>
								<TableContainer
									columns={gameReportColumn || []}
									data={gameReport.provider}
									isGlobalFilter
									isPagination={false}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									// tbodyClass={tbodyClass}
									// theadClass={theadClass}
									customPageSize={gameReport?.provider?.length}
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
};
GameReport.defaultProps = {
	activeGameReportTab: PropTypes.string,
	setActiveGameReportTab: PropTypes.func,
	gameReportColumn: PropTypes.arrayOf,
	gameReport: PropTypes.arrayOf,
};
export default GameReport;
