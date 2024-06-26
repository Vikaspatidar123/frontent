import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';

const DepositWithdrawalInfo = ({
	totalDepositAmount,
	totalWithdrawAmount,
	currencyId,
}) => {
	const { defaultCurrency, currencyById } = useSelector(
		(state) => state.Currencies
	);
	return (
		<Row className="my-1">
			<Col md="6">
				<Card className="m-0">
					<CardBody className="d-flex justify-content-between align-items-center m-0 p-2 table-info-deposit">
						<CardTitle className="mb-0">Total Deposit : </CardTitle>
						<h4 className="text-success mb-0">
							{currencyId
								? currencyById[currencyId]?.symbol || ''
								: defaultCurrency?.symbol || ''}{' '}
							{totalDepositAmount || 0}
						</h4>
					</CardBody>
				</Card>
			</Col>
			<Col md="6">
				<Card className="m-0">
					<CardBody className="d-flex justify-content-between align-items-center m-0 p-2 table-info-deposit">
						<CardTitle className="mb-0">Total Withdrawal : </CardTitle>
						<h4 className="text-danger mb-0">
							{currencyId
								? currencyById[currencyId]?.symbol || ''
								: defaultCurrency?.symbol || ''}{' '}
							{totalWithdrawAmount || 0}
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
};
