/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Card, CardBody, UncontrolledTooltip } from 'reactstrap';
import GraphicChart from './GraphicChart';
import DemoGraphicTable from './DemoGraphicTable';
import { dateConstants } from '../constant';

const DemographicReport = (props) => {
	const {
		demoGrapFormatedData,
		demoGraphOptions,
		demoGraphicData,
		demoGraphColumn,
		demoDateOptions,
		setDemoDateOptions,
		isDemographicLoading,
		exportReport,
		isRefresh,
		setIsRefresh,
	} = props;

	return (
		<Col xl="12">
			<Card>
				<CardBody>
					<div className="float-end">
						<div className="d-flex justify-content-between align-items-center">
							<select
								value={demoDateOptions}
								className="form-select form-select-sm me-2"
								onChange={(e) => {
									setDemoDateOptions(e.target.value);
								}}
							>
								{dateConstants?.map((item) => (
									<option value={item.value} key={item.value}>
										{item.label}
									</option>
								))}
							</select>
							<button
								type="button"
								id="demograph-export-tool"
								className="btn btn-sm btn-primary"
								onClick={exportReport}
							>
								<i className="bx bx-download align-baseline" />
							</button>
							<UncontrolledTooltip target="demograph-export-tool">
								Export Details
							</UncontrolledTooltip>
						</div>
					</div>

					<div className="d-flex align-items-center">
						<h4 className="card-title font-size-16">Demographic Report</h4>
						<i
							className="mdi mdi-refresh mx-2 font-size-20 mb-1"
							style={{ cursor: 'pointer' }}
							id="refresh"
							onClick={() => setIsRefresh(!isRefresh)}
							onKeyDown={(e) => {
								if (e.key === 'Enter') {
									setIsRefresh(!isRefresh);
								}
							}}
							tabIndex="0"
						/>
						<UncontrolledTooltip placement="top" target="refresh">
							Refresh
						</UncontrolledTooltip>
					</div>

					<Row>
						<Col xl="4">
							<GraphicChart
								demoGrapFormatedData={demoGrapFormatedData}
								demoGraphOptions={demoGraphOptions}
							/>
						</Col>
						<Col xl="8">
							<DemoGraphicTable
								demoGraphicData={demoGraphicData}
								demoGraphColumn={demoGraphColumn}
								isDemographicLoading={isDemographicLoading}
							/>
						</Col>
					</Row>
				</CardBody>
			</Card>
		</Col>
	);
};
DemographicReport.propTypes = {
	demoGraphOptions: PropTypes.arrayOf,
	demoGraphicData: PropTypes.arrayOf,
	demoGraphColumn: PropTypes.arrayOf,
	demoDateOptions: PropTypes.arrayOf,
	setDemoDateOptions: PropTypes.func,
	isDemographicLoading: PropTypes.bool,
	demoGrapFormatedData: PropTypes.arrayOf,
	exportReport: PropTypes.func.isRequired,
	isRefresh: PropTypes.bool,
	setIsRefresh: PropTypes.func,
};

DemographicReport.defaultProps = {
	demoGraphOptions: PropTypes.arrayOf,
	demoGraphicData: PropTypes.arrayOf,
	demoGraphColumn: PropTypes.arrayOf,
	demoDateOptions: PropTypes.arrayOf,
	setDemoDateOptions: PropTypes.func,
	isDemographicLoading: PropTypes.bool,
	demoGrapFormatedData: PropTypes.arrayOf,
	isRefresh: PropTypes.bool,
	setIsRefresh: PropTypes.func,
};
export default DemographicReport;
