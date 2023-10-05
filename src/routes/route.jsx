import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '../network/storageUtils';
import { getRolesStart } from '../store/auth/roles/actions';

const Authmiddleware = ({ children, location }) => {
	const accessToken = getAccessToken();
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) {
			dispatch(getRolesStart());
			// dispatch(getTenantRoleStart())
			// dispatch(getSuperAdminDetailsStart({ isTenant: false, onStart: true }))
		}
	}, []);

	if (!accessToken) {
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
