import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Col, Row } from 'reactstrap';
import { useSelector } from 'react-redux';

const DepositWithdrawalInfo = ({ currencyId, values }) => {
	const { defaultCurrency, currencyById } = useSelector(
		(state) => state.Currencies
	);
	const cols = 12 / (values?.length || 1);

	return (
		<Row className="my-1">
			{values?.map(({ label, value, colorClass }) => (
				<Col md={cols}>
					<Card className="m-0">
						<CardBody className="d-flex justify-content-between align-items-center m-0 p-2 table-info-deposit">
							<CardTitle className="mb-0">{label} : </CardTitle>
							<h4 className={`${colorClass || 'text-success'} mb-0`}>
								{currencyId
									? currencyById[currencyId]?.symbol || ''
									: defaultCurrency?.symbol || ''}{' '}
								{Number(value || 0)?.toFixed(2)}
							</h4>
						</CardBody>
					</Card>
				</Col>
			))}
		</Row>
	);
};

export default DepositWithdrawalInfo;

DepositWithdrawalInfo.propTypes = {
	currencyId: PropTypes.string.isRequired,
	values: PropTypes.arrayOf(PropTypes.string).isRequired,
};
