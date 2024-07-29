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

	// date(pin):"2024-05-25T00:00:00.000Z"
	// deposit_count(pin):"2"
	// withdraw_count(pin):"3"
	// total_deposit_amount(pin):"6616.00"
	// total_withdraw_amount(pin):"7072.00"
	// casino_bet_count(pin):"0"
	// casino_win_count(pin):"0"
	// total_casino_bet_amount(pin):null
	// total_casino_win_amount(pin):null
	// sportsbook_bet_count(pin):"10"
	// sportsbook_win_count(pin):"0"
	// total_sportsbook_bet_amount(pin):"202.96"
	// total_sportsbook_win_amount(pin):null

	const { ttlDeposit, ttlWithdraw, ttlBets } = useMemo(() => {
		let deposit = 0;
		let withdraw = 0;
		let bets = 0;

		statsData?.stats?.forEach(
			({
				total_deposit_amount,
				total_withdraw_amount,
				casino_bet_count,
				sportsbook_bet_count,
			}) => {
				deposit += Number(total_deposit_amount || 0);
				withdraw += Number(total_withdraw_amount || 0);
				bets +=
					Number(casino_bet_count || 0) + Number(sportsbook_bet_count || 0);
			}
		);

		return {
			ttlDeposit: deposit?.toFixed(2),
			ttlWithdraw: withdraw?.toFixed(2),
			ttlBets: bets,
		};
	}, [statsData]);

	const reportList = useMemo(
		() => [
			{
				title: "Today's GGR",
				description: `${defaultCurrency?.symbol || ''} ${todayGGR}`,
				iconClass: 'bx bxs-dollar-circle',
				reportClass: 'reportList1',
				customClass: TAB_COLORS.primary,
			},
			{
				title: 'Total Players',
				description: `${livePlayerData.totalPlayers || 0}`,
				iconClass: 'bx bxs-user-plus',
				reportClass: 'reportList2',
				customClass: TAB_COLORS.info,
			},
			{
				title: 'Active Players',
				description: `${statsData?.activeUsersCount || 0}`,
				iconClass: 'bx bxs-user-check',
				reportClass: 'reportList2',
				customClass: TAB_COLORS.success,
			},
			// {
			// 	title: "Today's registrations",
			// 	description: `${livePlayerData.totalRegistrationToday || 0}`,
			// 	iconClass: 'bx bxs-contact',
			// 	reportClass: 'reportList3',
			// 	customClass: TAB_COLORS.primary,
			// },
			{
				title: 'Number of Bets',
				description: `${ttlBets || 0}`,
				iconClass: 'bx bxs-credit-card',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.info,
			},
			{
				title: 'Total Deposits',
				description: `${ttlDeposit || 0}`,
				iconClass: 'bx bx-money',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.success,
			},
			{
				title: 'Total Withdrawals',
				description: `${ttlWithdraw || 0}`,
				iconClass: 'bx bxs-credit-card-alt',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.danger,
			},
			{
				title: 'Total Games',
				description: `${statsData?.totalGames || 0}`,
				iconClass: 'bx bx-play',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.info,
			},
			{
				title: 'Total Providers',
				description: `${statsData?.totalProviders || 0}`,
				iconClass: 'bx bxs-chip',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.info,
			},
			// {
			// 	title: 'Deposit Conv. Rate',
			// 	description: `${livePlayerData.depositConvRate || 0} %`,
			// 	iconClass: 'bx bxs-credit-card',
			// 	reportClass: 'reportList4',
			// 	customClass: TAB_COLORS.success,
			// },
		],
		[livePlayerData, isLivePlayerLoading, todayGGR]
	);

	return (
		<Row>
			{isGranted(modules.livePlayerDetail, 'R') ? (
				reportList.map((report) => (
					<Col md="4" lg="4" xl="3" className="mb-2">
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
	livePlayerData: 0,
	isLivePlayerLoading: 0,
	statsData: {},
};

Reports.propTypes = {
	livePlayerData: PropTypes.string,
	isLivePlayerLoading: PropTypes.bool,
	defaultCurrency: PropTypes.shape({
		symbol: PropTypes.string,
	}).isRequired,
	statsData: PropTypes.objectOf({
		activeUsersCount: PropTypes.number,
	}),
};

export default Reports;
