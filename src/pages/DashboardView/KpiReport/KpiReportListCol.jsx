// import React from 'react';
// import { Badge } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const ProviderName = ({ cell }) => cell.value ?? '';

const GGR = ({ cell }) => cell.value ?? '';

const DELTAGGR = ({ cell }) => cell.value ?? '';

const REALBET = ({ cell }) => cell.value ?? '';

const REALWIN = ({ cell }) => cell.value ?? '';

const BONUSWIN = ({ cell }) => cell.value ?? '';
const BONUSGGR = ({ cell }) => cell.value ?? '';
const TOTALBETS = ({ cell }) => cell.value ?? '';
const DELTATOTALBETS = ({ cell }) => cell.value ?? '';

export {
	ProviderName,
	GGR,
	DELTAGGR,
	REALBET,
	REALWIN,
	BONUSWIN,
	BONUSGGR,
	TOTALBETS,
	DELTATOTALBETS,
};
