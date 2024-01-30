import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { isEmpty } from 'lodash';
import { getAccessToken, removeLoginToken } from '../network/storageUtils';
import { getSuperAdminStart } from '../store/auth/permissionDetails/actions';
import { getRolesStart } from '../store/auth/roles/actions';
import { getSiteDetails } from '../store/actions';
import usePermission from '../components/Common/Hooks/usePermission';

const Authmiddleware = ({ children, location, modules, operation, isHome }) => {
	const accessToken = getAccessToken();
	const { isGranted, permissions } = usePermission();
	const navigate = useNavigate();
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
		const lastLoginTime = localStorage.getItem('loggedInTime');
		if (accessToken && lastLoginTime) {
			const currentTime = moment().format('YYYY-MM-DD HH:mm:ss');
			const diff = moment(currentTime).diff(moment(lastLoginTime), 'hours');
			if (diff > 11) {
				localStorage.clear();
				window.location.reload();
			}
		}
	}, []);

	const preLoaderDisplay = (dis) => {
		const pre = document.getElementById('preloader');
		const sta = document.getElementById('status');
		if (sta && pre) {
			pre.style.display = dis;
			sta.style.display = dis;
		}
	};

	useEffect(() => {
		if (isEmpty(permissions)) {
			preLoaderDisplay('block');
		} else {
			preLoaderDisplay('none');
		}
	}, [permissions]);

	if (!accessToken) {
		return <Navigate to={{ pathname: '/login', state: { from: location } }} />;
	}

	if (modules?.length && operation && !isEmpty(permissions)) {
		const grantedList = modules.filter((module) =>
			isGranted(module, operation)
		);
		if (!grantedList?.length) {
			if (isHome) {
				removeLoginToken();
				navigate('/login');
				return null;
			}
			return <Navigate to={{ pathname: '/', state: { from: location } }} />;
		}
	}

	return children;
};

Authmiddleware.defaultProps = {
	children: <div />,
	location: '',
	modules: [],
	operation: '',
	isHome: false,
};

Authmiddleware.propTypes = {
	children: PropTypes.element,
	location: PropTypes.string,
	modules: PropTypes.arrayOf(PropTypes.string),
	operation: PropTypes.string,
	isHome: PropTypes.bool,
};

export default Authmiddleware;
