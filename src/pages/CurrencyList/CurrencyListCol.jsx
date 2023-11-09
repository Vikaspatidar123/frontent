/* eslint-disable react/destructuring-assignment */
import React from 'react';
import { Badge } from 'reactstrap';

const Id = (cell) => (cell.value ? cell.value : '');

const Name = (cell) =>
	cell.value ? (
		<>
			{cell.value}{' '}
			{cell.row.original.isPrimary && (
				<Badge className="bg-success">Primary</Badge>
			)}
		</>
	) : (
		''
	);

const Code = (cell) => (cell.value ? cell.value : '');

const ExchangeRate = (cell) => (cell.value ? cell.value : '');

const LoyaltyPoints = (cell) => (cell.value ? cell.value : '');

const Type = (cell) => (cell.value === 1 ? 'Fiat' : 'Crypto');

const Actions = () => <i className="dripicons-dots-3" />;

export { Id, Name, Actions, Code, Type, LoyaltyPoints, ExchangeRate };
