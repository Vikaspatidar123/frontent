import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { addCommasToNumber } from '../utils/helpers';

const DepositWithdrawalInfo = ({ currencyId, values }) => {
	const { defaultCurrency, currencyById } = useSelector(
		(state) => state.Currencies
	);
	// const cols = 12 / (values?.length || 1);

	return (
		<div className="my-1 d-flex">
			{values?.map(({ label, value, type }) => (
				<div
					className={`badge ${
						type === 'in' ? 'bg-success-subtle' : 'bg-danger-subtle'
					} text-dark p-3 fs-4 rounded-4 me-3`}
					style={{ marginBottom: '10px' }}
				>
					<h6 className="mb-0 font-weight-bold">
						<span
							className={`${type === 'in' ? 'text-success' : 'text-danger'}`}
						>
							{label} :{' '}
						</span>{' '}
						{currencyId
							? currencyById[currencyId]?.symbol || ''
							: defaultCurrency?.symbol || ''}{' '}
						{addCommasToNumber(Number(value || 0)?.toFixed(2))}
					</h6>
				</div>
			))}
		</div>
	);
};

export default DepositWithdrawalInfo;

DepositWithdrawalInfo.propTypes = {
	currencyId: PropTypes.string.isRequired,
	values: PropTypes.arrayOf(PropTypes.string).isRequired,
};
