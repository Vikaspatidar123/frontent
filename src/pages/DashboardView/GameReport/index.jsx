/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Col, Card, CardBody, UncontrolledTooltip } from 'reactstrap';
import SimpleBar from 'simplebar-react';
import { CSVLink } from 'react-csv';
import TableContainer from '../../../components/Common/TableContainer';
import { tableCustomClass } from '../../../constants/config';
import { TABS, dateConstants } from '../constant';
import { CustomSelectField } from '../../../helpers/customForms';
import TabsPage from '../../../components/Common/TabsPage';
import useGameReport from './hooks/useGameReport';

const GameReport = () => {
	const {
		activeGameReportTab,
		setActiveGameReportTab,
		gameReportColumn,
		gameReport,
		isGameReportLoading,
		gameReportDateOption,
		setGameReportDateOption,
		loadGameReport,
	} = useGameReport();

	const tabComponent = (
		<SimpleBar style={{ maxHeight: '300px' }}>
			<TableContainer
				isLoading={isGameReportLoading}
				columns={gameReportColumn || []}
				data={gameReport || []}
				isGlobalFilter={false}
				customPageSize={gameReport?.length || 300}
				tableClass={`table-bordered align-middle nowrap ${tableCustomClass}`}
			/>
		</SimpleBar>
	);

	const tabData = [
		{
			id: TABS.GAME,
			title: 'GAME',
			component: tabComponent,
		},
		{
			id: TABS.PROVIDER,
			title: 'PROVIDER',
			component: tabComponent,
		},
	];

	const toggle = (tab) => {
		if (activeGameReportTab !== tab) {
			setActiveGameReportTab(tab);
		}
	};

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<CustomSelectField
								name="gameReportDateFilter"
								type="select"
								onChange={(e) => {
									setGameReportDateOption(e.target.value);
								}}
								value={gameReportDateOption}
								key="my_unique_select_key__gameReportDateFilter"
								options={dateConstants?.map((item) => (
									<option value={item.value} key={item.value}>
										{item.label}
									</option>
								))}
							/>
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

					<TabsPage
						activeTab={activeGameReportTab}
						tabsData={tabData}
						toggle={toggle}
						navClass="bg-light rounded p-0"
					/>
				</CardBody>
			</Card>
		</Col>
	);
};

export default GameReport;
