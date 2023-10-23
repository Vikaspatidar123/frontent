/* eslint-disable react/no-unknown-property */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-use-before-define */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import * as moment from 'moment';
import { Badge } from 'reactstrap';

const formateDate = (date, format) => {
	const dateFormat = format || 'DD MMM Y';
	const date1 = moment(new Date(date)).format(dateFormat);
	return date1;
};
const toLowerCase1 = (str) =>
	str === '' || str === undefined ? '' : str.toLowerCase();

const CheckBox = (cell) => (cell.value ? cell.value : '');

const OrderId = (cell) => (
	<Link to="#" className="text-body fw-bold">
		{cell.value ? cell.value : ''}
	</Link>
);

const BillingName = (cell) => (cell.value ? cell.value : '');

const Date = (cell) => (cell.value ? cell.value : '');

const Total = (cell) => (cell.value ? cell.value : '');

const PaymentStatus = (cell) => (
	<div
		className={`badge font-size-12 badge-soft-${
			cell.value === 'Paid'
				? 'success'
				: 'danger' && cell.value === 'Refund'
				? 'warning'
				: 'danger'
		}`}
		pill="true"
	>
		{cell.value}
	</div>
);
const PaymentMethod = (cell) => (
	<span>
		<i
			className={
				cell.value === 'Paypal'
					? 'fab fa-cc-paypal me-1'
					: '' || cell.value === 'COD'
					? 'fab fas fa-money-bill-alt me-1'
					: '' || cell.value === 'Mastercard'
					? 'fab fa-cc-mastercard me-1'
					: '' || cell.value === 'Visa'
					? 'fab fa-cc-visa me-1'
					: ''
			}
		/>{' '}
		{cell.value}
	</span>
);
export {
	CheckBox,
	OrderId,
	BillingName,
	Date,
	Total,
	PaymentStatus,
	PaymentMethod,
};
