import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import ReportList from './ReportList';

const Reports = (props) => {
	const { livePlayerData, isLivePlayerLoading } = props;

	const reportList = useMemo(
		() => [
			{
				title: 'Today GGR',
				description: `€ ${
					livePlayerData.todayTotalCasinoGGR +
						livePlayerData.todayTotalSportsbookGGR || 0
				}`,
				iconClass: 'bx bxs-dollar-circle',
				reportClass: 'reportList1',
			},
			{
				title: 'Today Players',
				description: `€ ${livePlayerData.totalPlayers || 0}`,
				iconClass: 'bx bxs-user-plus',
				reportClass: 'reportList2',
			},
			{
				title: 'Total registrations',
				description: `€ ${livePlayerData.totalRegistrationToday || 0}`,
				iconClass: 'bx bxs-contact',
				reportClass: 'reportList3',
			},
			{
				title: 'Deposit Conv. Rate',
				description: `€ ${livePlayerData.depositConvRate || 0}`,
				iconClass: 'bx bxs-credit-card',
				reportClass: 'reportList4',
			},
		],
		[livePlayerData, isLivePlayerLoading]
	);

	return (
		<Row>
			{reportList.map((report) => (
				<Col md="6" lg="6" xl="3">
					<ReportList
						title={report.title}
						description={report.description}
						iconClass={report.iconClass}
						isLoading={isLivePlayerLoading}
						reportClass={report.reportClass}
					/>
				</Col>
			))}
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
