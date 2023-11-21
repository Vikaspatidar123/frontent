import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '../network/storageUtils';
import { getRolesStart } from '../store/auth/roles/actions';
import { getSuperAdminStart } from '../store/auth/permissionDetails/actions';

const Authmiddleware = ({ children, location }) => {
	const accessToken = getAccessToken();
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) {
			dispatch(getRolesStart());
			// dispatch(getTenantRoleStart())
			dispatch(getSuperAdminStart());
		}
	}, []);

	if (!accessToken) {
		return <Navigate to={{ pathname: '/login', state: { from: location } }} />;
	}
	return children;
};

Authmiddleware.defaultProps = {
	children: <div />,
	location: '',
};

Authmiddleware.propTypes = {
	children: PropTypes.element,
	location: PropTypes.string,
};

export default Authmiddleware;
