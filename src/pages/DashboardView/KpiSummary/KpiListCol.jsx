// import React from 'react';
// import { Badge } from 'reactstrap';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const RowName = ({ cell }) => cell.value ?? '';

const Today = ({ cell }) => cell.value ?? '';

const Yesterday = ({ cell }) => cell.value ?? '';

const MonthToDate = ({ cell }) => cell.value ?? '';

const CustomDate = ({ cell }) => cell.value ?? '';

const Delta = ({ cell }) => cell.value ?? '';

export { RowName, Today, Yesterday, MonthToDate, CustomDate, Delta };
