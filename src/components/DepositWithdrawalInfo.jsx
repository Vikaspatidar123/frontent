import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';

const DepositWithdrawalInfo = ({
	totalDepositAmount,
	totalWithdrawAmount,
	currencyId,
	labels = ['Total Deposit : ', 'Total Withdrawal : ', 'Total Liquidity : '],
}) => {
	const { defaultCurrency, currencyById } = useSelector(
		(state) => state.Currencies
	);
	const liquidity = (
		Number(totalDepositAmount || 0) - Number(totalWithdrawAmount || 0)
	)?.toFixed(2);
	return (
		<Row className="my-1">
			<Col md="4">
				<Card className="m-0">
					<CardBody className="d-flex justify-content-between align-items-center m-0 p-2 table-info-deposit">
						<CardTitle className="mb-0">{labels[0]}</CardTitle>
						<h4 className="text-success mb-0">
							{currencyId
								? currencyById[currencyId]?.symbol || ''
								: defaultCurrency?.symbol || ''}{' '}
							{Number(totalDepositAmount || 0)?.toFixed(2)}
						</h4>
					</CardBody>
				</Card>
			</Col>
			<Col md="4">
				<Card className="m-0">
					<CardBody className="d-flex justify-content-between align-items-center m-0 p-2 table-info-deposit">
						<CardTitle className="mb-0">{labels[1]}</CardTitle>
						<h4 className="text-danger mb-0">
							{currencyId
								? currencyById[currencyId]?.symbol || ''
								: defaultCurrency?.symbol || ''}{' '}
							{Number(totalWithdrawAmount || 0)?.toFixed(2)}
						</h4>
					</CardBody>
				</Card>
			</Col>
			<Col md="4">
				<Card className="m-0">
					<CardBody className="d-flex justify-content-between align-items-center m-0 p-2 table-info-deposit">
						<CardTitle className="mb-0">{labels[2]}</CardTitle>
						<h4
							className={`${
								liquidity > 0 ? 'text-success' : 'text-danger'
							} mb-0`}
						>
							{currencyId
								? currencyById[currencyId]?.symbol || ''
								: defaultCurrency?.symbol || ''}{' '}
							{liquidity}
						</h4>
					</CardBody>
				</Card>
			</Col>
		</Row>
	);
};

export default DepositWithdrawalInfo;

DepositWithdrawalInfo.propTypes = {
	totalDepositAmount: PropTypes.number.isRequired,
	totalWithdrawAmount: PropTypes.number.isRequired,
	currencyId: PropTypes.string.isRequired,
	labels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
