import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAccessToken } from '../network/storageUtils';
import { getSuperAdminStart } from '../store/auth/permissionDetails/actions';
import { getRolesStart } from '../store/auth/roles/actions';

const Authmiddleware = ({ children, location }) => {
	const accessToken = getAccessToken();
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) {
			dispatch(getSuperAdminStart());
			dispatch(getRolesStart());
			// dispatch(getTenantRoleStart())
			// dispatch(getSiteDetails());
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
