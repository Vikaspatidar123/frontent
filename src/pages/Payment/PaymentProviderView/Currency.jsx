/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { Card, CardHeader, Col, Row } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
	CustomInputField,
	CustomSelectField,
} from '../../../helpers/customForms';
import { currencyFields } from '../constants';
import { fetchCurrenciesStart } from '../../../store/actions';

const Currencies = ({ paymentDetails }) => {
	const dispatch = useDispatch();
	const { currencies } = useSelector((state) => state.Currencies);

	useEffect(() => {
		if (!currencies) dispatch(fetchCurrenciesStart({}));
	}, []);

	return (
		<Card className="p-3">
			<CardHeader>
				<h3>Currency Limits</h3>
			</CardHeader>

			{paymentDetails?.providerLimits?.length ? (
				paymentDetails?.providerLimits?.map((currency, idx) => (
					<Row className="px-1 text-center d-flex my-3">
						<Col sm={12} lg={2} className="mx-1">
							{idx === 0 && (
								<label htmlFor="currencyId" style={{ fontSize: '14px' }}>
									Currency
								</label>
							)}
							<CustomSelectField
								id="currencyId"
								type="select"
								name="currencyId"
								disabled
								options={
									<option value={null} selected disabled>
										{currencies?.currencies?.find(
											(cur) => cur.id === currency.currencyId
										)?.name || ''}
									</option>
								}
							/>
						</Col>
						{currencyFields?.map(({ key, label }) => (
							<Col sm={12} lg={2} className="mx-1">
								{idx === 0 && (
									<label htmlFor={key} style={{ fontSize: '14px' }}>
										{label}
									</label>
								)}
								<CustomInputField
									name={key}
									value={currency?.[key]}
									type="number"
									disabled
								/>
							</Col>
						))}
					</Row>
				))
			) : (
				<Row className="px-1 text-center d-flex my-3">
					<Col sm={12} className="text-align-center m-4">
						<h6 className="text-nowrap">No Data Found</h6>
					</Col>
				</Row>
			)}
		</Card>
	);
};

Currencies.defaultProps = {
	paymentDetails: {},
};

Currencies.propTypes = {
	paymentDetails: PropTypes.objectOf,
};

export default Currencies;
