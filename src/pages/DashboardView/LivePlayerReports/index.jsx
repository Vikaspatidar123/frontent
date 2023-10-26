import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import ReportList from './ReportList';

const Reports = (props) => {
	const { livePlayerData, isLivePlayerLoading } = props;
	return (
		<Row>
			<Col md="3">
				<ReportList
					title="Today GGR"
					description={`€ ${livePlayerData.todayTotalGgr || 0}`}
					iconClass="bx bxs-dollar-circle"
					isLoading={isLivePlayerLoading}
				/>
			</Col>
			<Col md="3">
				<ReportList
					title="Total Players"
					description={`${livePlayerData.totalPlayers || 0}`}
					iconClass="bx bxs-user-plus"
					isLoading={isLivePlayerLoading}
				/>
			</Col>
			<Col md="3">
				<ReportList
					title="Registration Rate"
					description={`€ ${livePlayerData.registrationConvRate || 0} %`}
					iconClass="bx bxs-contact"
					isLoading={isLivePlayerLoading}
				/>
			</Col>
			<Col md="3">
				<ReportList
					title="Deposite Conv. Rate"
					description={`${livePlayerData.depositConvRate || 0}  %`}
					iconClass="bx bxs-credit-card"
					isLoading={isLivePlayerLoading}
				/>
			</Col>
		</Row>
	);
};
Reports.propTypes = {
	livePlayerData: PropTypes.string,
	isLivePlayerLoading: PropTypes.bool,
};
Reports.defaultProps = {
	livePlayerData: PropTypes.string,
	isLivePlayerLoading: PropTypes.bool,
};
export default Reports;
