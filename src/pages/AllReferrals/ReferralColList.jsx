/* eslint-disable react/prop-types */

import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';

const KeyValueCellNA = ({ value }) => value ?? '-';

const UserName = ({ cell }) =>
	cell.value && cell?.row?.original?.id ? (
		<Link to={`/player-details/${cell?.row?.original?.id}/6`}>
			{cell.value}
		</Link>
	) : (
		cell.value || '-'
	);
const IsActive = ({ value }) => {
	switch (value) {
		case true:
			return <Badge className="bg-success">Active</Badge>;
		case false:
			return <Badge className="bg-danger">Inactive</Badge>;
		default:
			return '';
	}
};
const KycStatus = ({ value }) => {
	switch (value) {
		case true:
			return <Badge color="primary">Approved</Badge>;
		case false:
			return <Badge color="warning">Pending</Badge>;
		default:
			return '-';
	}
};

const Earned = ({ value, defaultCurrency }) => (
	<p className="text-success">
		{defaultCurrency.symbol} {value ?? 0}
	</p>
);

export { KeyValueCellNA, UserName, IsActive, KycStatus, Earned };
