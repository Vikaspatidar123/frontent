// eslint-disable-next-line no-unused-vars
import React from 'react';
// import { Badge } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const COUNTRY = ({ cell }) => cell.value ?? '';

const SIGNUPS = ({ cell }) => cell.value ?? '';

const DEPOSITORS = ({ cell }) => cell.value ?? '';

const DEPOSITAMOUNT = ({ cell }) => cell.value ?? '';

const CONVERSIONRATE = ({ cell }) => cell.value ?? '';

export { COUNTRY, SIGNUPS, DEPOSITORS, DEPOSITAMOUNT, CONVERSIONRATE };
