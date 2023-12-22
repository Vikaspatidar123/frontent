import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';
import { currencyTypes } from './constants';

const Id = ({ value }) => value ?? '';

const Name = ({ cell }) =>
	cell.value ? (
		<>
			{cell.value}{' '}
			{cell.row.original.default && (
				<Badge className="bg-success">Primary</Badge>
			)}
		</>
	) : (
		''
	);

const Code = ({ value }) => value ?? '';

const ExchangeRate = ({ value }) => value ?? '';

const LoyaltyPoints = ({ value }) => value ?? '';

const Type = ({ value }) =>
	value
		? currencyTypes.find((currency) => currency.value === value)?.optionLabel
		: '';

const Actions = () => <i className="dripicons-dots-3" />;

export { Id, Name, Actions, Code, Type, LoyaltyPoints, ExchangeRate };

Name.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				default: PropTypes.bool.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};
