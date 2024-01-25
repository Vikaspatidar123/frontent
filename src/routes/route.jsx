import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { getAccessToken } from '../network/storageUtils';
import { getSuperAdminStart } from '../store/auth/permissionDetails/actions';
import { getRolesStart } from '../store/auth/roles/actions';
import { getSiteDetails } from '../store/actions';

const Authmiddleware = ({ children, location }) => {
	const accessToken = getAccessToken();
	const dispatch = useDispatch();

	useEffect(() => {
		if (accessToken) {
			dispatch(getSuperAdminStart());
			dispatch(getRolesStart());
			// dispatch(getTenantRoleStart())
			dispatch(getSiteDetails());
		}
	}, []);

	useEffect(() => {
		if (accessToken && window.localStorage.getItem('loggedInTime')) {
			const loggedInTime = window.localStorage.getItem('loggedInTime');
			const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
			const diff = moment(currentTime).diff(moment(loggedInTime), 'minutes');
			if (diff > 12) {
				localStorage.clear();
				window.location.reload();
			}
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
