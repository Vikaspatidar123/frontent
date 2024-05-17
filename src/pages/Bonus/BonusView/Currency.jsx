import React from 'react';
import { Card, Col, Row } from 'reactstrap';
import PropTypes from 'prop-types';
import { CustomInputField } from '../../../helpers/customForms';
import { BONUS_TYPES, commonCurrencyFields } from '../constants';

const Currencies = ({ bonusDetail }) => (
	<Card className="p-3">
		{bonusDetail &&
			bonusDetail?.currency &&
			Object.keys(bonusDetail?.currency).length > 0 &&
			Object.keys(bonusDetail?.currency).map((key, index) => (
				<Row>
					<Col className="mb-3">
						<CustomInputField
							label={index < 1 ? 'Currency' : ''}
							value={key}
							disabled
						/>
					</Col>
					{Object.keys(bonusDetail?.currency[key]).map((currKey, currIndex) => {
						let hide = false;
						if (bonusDetail?.bonusType === 'wagering') {
							hide =
								currKey === 'minDeposit' ||
								currKey === 'maxBonusThreshold' ||
								currKey === 'maxWinAmount';
						} else if (bonusDetail?.bonusType === BONUS_TYPES.JOINING) {
							hide = currKey !== 'joiningAmount';
						} else if (
							bonusDetail?.bonusType === BONUS_TYPES.FREESPINS ||
							bonusDetail?.bonusType === 'cashfreespins'
						) {
							hide =
								currKey !== 'maxWinAmount' && currKey !== 'zeroOutThreshold';
						} else {
							hide = currKey === 'joiningAmount' || currKey === 'minBalance';
						}

						return (
							currKey !== 'minBonusThreshold' &&
							!hide && (
								<Col
									className="px-1 text-center"
									key={`currencyCols ${currIndex + 1}`}
									hidden={hide}
								>
									{index < 1 && !hide && (
										<label htmlFor={currKey} style={{ fontSize: '14px' }}>
											{['depositCashback', 'wagering'].includes(
												bonusDetail?.bonusType
											)
												? commonCurrencyFields?.find((val) =>
														currKey === 'minBalance'
															? val.value === 'minBalanceCash'
															: val.value === currKey
												  )?.label
												: commonCurrencyFields?.find(
														(val) => val.value === currKey
												  )?.label}
											<span className="text-danger"> *</span>
										</label>
									)}
									<CustomInputField
										name={`[${key}][${currKey}]`}
										value={bonusDetail?.currency[key][currKey]}
										hidden={hide}
										type="number"
										disabled
									/>
								</Col>
							)
						);
					})}
				</Row>
			))}
	</Card>
);

Currencies.defaultProps = {
	bonusDetail: {},
};

Currencies.propTypes = {
	bonusDetail: PropTypes.objectOf,
};

export default Currencies;
