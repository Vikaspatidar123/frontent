/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Row, Col, CardBody, Card } from 'reactstrap';
import ReportList from './ReportList';
import { modules } from '../../../constants/permissions';
import { LIVE_PLAYER } from '../../../constants/messages';
import usePermission from '../../../components/Common/Hooks/usePermission';
import { TAB_COLORS } from '../constant';

const Reports = (props) => {
	const { livePlayerData, isLivePlayerLoading, statsData } = props;
	const { defaultCurrency, currencyById } = useSelector(
		(state) => state.Currencies
	);
	const { isGranted } = usePermission();

	const todayGGR = useMemo(() => {
		const sportsGGR =
			livePlayerData?.sportsbookBetData?.reduce(
				(acc, { currency_id, totalWinAmount, totalBetAmount }) => {
					const exchangeRate = Number(
						currencyById?.[currency_id]?.exchangeRate || 1
					);
					const betAmount = Number(totalBetAmount || 0);
					const winAmount = Number(totalWinAmount || 0);
					const ggr = (betAmount - winAmount) * exchangeRate;
					return acc + ggr;
				},
				0
			) || 0;

		const casinoGGR =
			livePlayerData?.casinoBetData?.reduce(
				(acc, { currency_id, totalWinAmount, totalBetAmount }) => {
					const exchangeRate = Number(
						currencyById?.[currency_id]?.exchangeRate || 1
					);
					const betAmount = Number(totalBetAmount || 0);
					const winAmount = Number(totalWinAmount || 0);
					const ggr = (betAmount - winAmount) * exchangeRate;
					return acc + ggr;
				},
				0
			) || 0;

		return (sportsGGR + casinoGGR)?.toFixed(2);
	}, [livePlayerData, currencyById]);

	const reportList = useMemo(
		() => [
			{
				title: 'Overall GGR',
				description: `${defaultCurrency?.symbol || ''} ${todayGGR}`,
				iconClass: 'bx bx-money',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.success,
			},
			{
				title: 'GGR',
				description: `${defaultCurrency?.symbol || ''} ${todayGGR}`,
				iconClass: 'bx bxs-dollar-circle',
				reportClass: 'reportList1',
				customClass: TAB_COLORS.info,
			},
			{
				title: 'Total Players',
				description: `${livePlayerData.totalPlayers || 0}`,
				iconClass: 'bx bxs-user-plus',
				reportClass: 'reportList2',
				customClass: TAB_COLORS.primary,
			},
			{
				title: 'Active Players',
				description: `${statsData?.activeUsersCount || 0}`,
				iconClass: 'bx bxs-user-check',
				reportClass: 'reportList2',
				customClass: TAB_COLORS.success,
			},
			{
				title: 'Registrations',
				description: `${livePlayerData.totalRegistrationToday || 0}`,
				iconClass: 'bx bxs-contact',
				reportClass: 'reportList3',
				customClass: TAB_COLORS.primary,
			},
			{
				title: 'Total Games',
				description: `${statsData?.totalGames || 0}`,
				iconClass: 'bx bx-play',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.warn,
			},
			{
				title: 'Total Providers',
				description: `${statsData?.totalProviders || 0}`,
				iconClass: 'bx bxs-chip',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.info,
			},
			{
				title: 'Deposit Conv. Rate',
				description: `${livePlayerData.depositConvRate || 0} %`,
				iconClass: 'bx bxs-credit-card',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.success,
			},
		],
		[livePlayerData, isLivePlayerLoading, todayGGR, statsData]
	);

	return (
		<Row>
			{isGranted(modules.livePlayerDetail, 'R') ? (
				reportList.map((report) => (
					<Col md="6" lg="3" xl="3" key={report?.title}>
						<ReportList
							title={report.title}
							description={report.description}
							iconClass={report.iconClass}
							isLoading={isLivePlayerLoading}
							reportClass={report.reportClass}
							customClass={report.customClass}
						/>
					</Col>
				))
			) : (
				<Col xl="12">
					<Card>
						<CardBody>
							<h6>{LIVE_PLAYER}</h6>
						</CardBody>
					</Card>
				</Col>
			)}
		</Row>
	);
};

Reports.defaultProps = {
	livePlayerData: {},
	isLivePlayerLoading: 0,
	statsData: {},
};

Reports.propTypes = {
	livePlayerData: PropTypes.shape({
		sportsbookBetData: PropTypes.arrayOf(
			PropTypes.shape({
				totalWinAmount: PropTypes.number,
			})
		),
		depositConvRate: PropTypes.string,
		totalRegistrationToday: PropTypes.string,
	}),
	isLivePlayerLoading: PropTypes.bool,
	statsData: PropTypes.shape({
		activeUsersCount: PropTypes.number,
		totalGames: PropTypes.number,
	}),
};

export default Reports;
