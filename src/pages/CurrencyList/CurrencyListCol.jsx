import React from 'react';
import { Badge } from 'reactstrap';
import PropTypes from 'prop-types';

const Id = ({ value }) => value ?? '';

const Name = ({ cell }) =>
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

const Code = ({ value }) => value ?? '';

const ExchangeRate = ({ value }) => value ?? '';

const LoyaltyPoints = ({ value }) => value ?? '';

const Type = ({ value }) => (value === 1 ? 'Fiat' : 'Crypto');

const Actions = () => <i className="dripicons-dots-3" />;

export { Id, Name, Actions, Code, Type, LoyaltyPoints, ExchangeRate };

Name.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				isPrimary: PropTypes.bool.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
};
