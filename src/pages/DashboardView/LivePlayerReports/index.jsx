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
import { addCommasToNumber } from '../../../utils/helpers';

const Reports = (props) => {
	const { statsDataLoading, statsData, dashFilters } = props;
	const { defaultCurrency, currencyById } = useSelector(
		(state) => state.Currencies
	);
	const { isGranted } = usePermission();

	const { GGR, overAllGgr } = useMemo(() => {
		const isCasino = dashFilters?.categories?.find(
			(cate) => cate.value === 'casino'
		);
		const isSportsbook = dashFilters?.categories?.find(
			(cate) => cate.value === 'sportsbook'
		);
		const isBoth = isCasino && isSportsbook;
		let ggr = 0;

		statsData?.grouped?.forEach(
			({
				total_casino_bet_amount,
				total_casino_win_amount,
				total_sportsbook_bet_amount,
				total_sportsbook_win_amount,
			}) => {
				let betAmount = 0;
				let winAmount = 0;
				if (isBoth) {
					betAmount +=
						Number(total_casino_bet_amount || 0) +
						Number(total_sportsbook_bet_amount || 0);
					winAmount +=
						Number(total_casino_win_amount || 0) +
						Number(total_sportsbook_win_amount || 0);
				} else if (isCasino) {
					betAmount += Number(total_casino_bet_amount || 0);
					winAmount += Number(total_casino_win_amount || 0);
				} else if (isSportsbook) {
					betAmount += Number(total_sportsbook_bet_amount || 0);
					winAmount += Number(total_sportsbook_win_amount || 0);
				}

				ggr += betAmount - winAmount;
			}
		);

		let totalGgr = 0;

		statsData?.overAllGgr?.forEach(
			({
				currency_id,
				total_casino_bet_amount,
				total_casino_win_amount,
				total_sportsbook_bet_amount,
				total_sportsbook_win_amount,
				total_tournament_win,
				total_tournament_buy,
			}) => {
				const exchangeRate = Number(
					currencyById?.[currency_id]?.exchangeRate || 1
				);
				totalGgr +=
					(Number(total_casino_bet_amount || 0) +
						Number(total_sportsbook_bet_amount || 0) +
						Number(total_tournament_buy || 0) -
						(Number(total_casino_win_amount || 0) +
							Number(total_sportsbook_win_amount || 0) +
							Number(total_tournament_win || 0))) *
					exchangeRate;
			}
		);
		return { GGR: ggr.toFixed(2), overAllGgr: totalGgr?.toFixed(2) };
	}, [statsData, currencyById, dashFilters]);

	const reportList = useMemo(
		() => [
			{
				title: 'Overall GGR',
				description: `${defaultCurrency?.symbol || ''} ${addCommasToNumber(
					overAllGgr || 0.0
				)}`,
				iconClass: 'bx bx-money',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.success,
			},
			{
				title: 'GGR',
				description: `${defaultCurrency?.symbol || ''} ${addCommasToNumber(
					GGR || 0.0
				)}`,
				iconClass: 'bx bxs-dollar-circle',
				reportClass: 'reportList1',
				customClass: TAB_COLORS.info,
			},
			{
				title: 'Total Players',
				description: `${statsData?.totalPlayers || 0}`,
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
				description: `${statsData?.totalRegistrationToday || 0}`,
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
				description: `${statsData?.depositConvRate || 0} %`,
				iconClass: 'bx bxs-credit-card',
				reportClass: 'reportList4',
				customClass: TAB_COLORS.success,
			},
		],
		[GGR, statsData]
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
							isLoading={statsDataLoading}
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
	statsDataLoading: false,
	statsData: {},
};

Reports.propTypes = {
	statsDataLoading: PropTypes.bool,
	statsData: PropTypes.shape({
		activeUsersCount: PropTypes.number,
		totalGames: PropTypes.number,
	}),
};

export default Reports;
