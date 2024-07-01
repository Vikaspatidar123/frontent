/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Card } from 'reactstrap';
import { useSelector } from 'react-redux';
import getChartColorsArray from '../../../components/Common/ChartsDynamicColor';
import SingleChart from './SingleChart';

const PlayerStats = ({ data = {} }) => {
	const { defaultCurrency } = useSelector((state) => state.Currencies);

	const depositWithdrawData = [
		{ category: 'Deposit', value: data.total_deposit },
		{ category: 'Withdraw', value: data.total_withdraw },
	];

	const winBetData = [
		{ category: 'Casino Wagered', value: data.total_casino_bet },
		{ category: 'Sports Wagered', value: data.total_sb_bet },
		{ category: 'Casino Payout', value: data.total_casino_win },
		{ category: 'Sports Payout', value: data.total_sb_win },
	];

	const countData = [
		{ category: 'Casino Wagered Count', value: data.total_casino_bet_count },
		{ category: 'Sports Wagered Count', value: data.total_sb_bet_count },
		{ category: 'Deposit Count', value: data.total_deposit_count },
	];

	const PnLData = [
		{ category: 'Platform Profit', value: data.profit },
		{ category: 'Total Wagered', value: data.wagered },
		{ category: 'Total Payout', value: data.payout },
	];

	const chartColors = getChartColorsArray(
		'["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
	); // 2 sets of colors for two data points in each chart

	return (
		<Row>
			<Col xl={3} md={6} sm={6}>
				<Card>
					<SingleChart
						data={PnLData}
						colors={chartColors}
						defaultCurrency={defaultCurrency}
						isAmount
						chartTitle="P&L Report"
					/>
				</Card>
			</Col>

			<Col xl={3} md={6} sm={6}>
				<Card>
					<SingleChart
						data={countData}
						colors={chartColors}
						defaultCurrency={defaultCurrency}
						chartTitle="Wagered and Deposit Counts"
					/>
				</Card>
			</Col>

			<Col xl={3} md={6} sm={6}>
				<Card>
					<SingleChart
						data={winBetData}
						colors={chartColors}
						defaultCurrency={defaultCurrency}
						isAmount
						chartTitle="Game Transactions"
					/>
				</Card>
			</Col>

			<Col xl={3} md={6} sm={6}>
				<Card>
					<SingleChart
						data={depositWithdrawData}
						colors={chartColors}
						defaultCurrency={defaultCurrency}
						isAmount
						chartTitle="Wallet Transactions"
					/>
				</Card>
			</Col>

			{/* <Col xl={2} md={6} sm={6}>
                <Card>
                    <div className="p-3">
                        <h5>Profit: <span className="h5 text-success">{defaultCurrency?.symbol || ''}{data.profit}</span></h5>
                    </div>
                    <div className="p-3">
                        <h5>Wagered: <span className="h5 text-success">{data.wagered}</span></h5>
                    </div>
                    <div className="p-3">
                        <h5>Payout: <span className="h5 text-danger">{data.payout}</span></h5>
                    </div>
                </Card>
            </Col> */}
		</Row>
	);
};

export default PlayerStats;
