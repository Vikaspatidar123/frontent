import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { getItem } from '../network/storageUtils';

const Authmiddleware = ({ children, location }) => {
	if (!getItem('access-token')) {
		return <Navigate to={{ pathname: '/login', state: { from: location } }} />;
	}
	return children;
};

Authmiddleware.defaultState = {
	children: <div />,
	location: '',
};

Authmiddleware.propTypes = {
	children: PropTypes.element.isRequired,
	location: PropTypes.string.isRequired,
};

export default Authmiddleware;
