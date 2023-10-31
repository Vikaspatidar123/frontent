import React, { useEffect, useState } from 'react';
import { Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import TabsPage from '../../components/Common/TabsPage';
import Permissions from '../Profile/FormSections/Permissions';
import { getPermissionsStart } from '../../store/auth/permissionDetails/actions';
import Breadcrumbs from '../../components/Common/Breadcrumb';
// eslint-disable-next-line import/no-unresolved
import OverView from './Overview';
import Spinners from '../../components/Common/Spinner';

const AdminDetails = ({ t }) => {
	const { adminUserId } = useParams();
	const dispatch = useDispatch();

	const [activeTab, setactiveTab] = useState('1');

	const { adminDetails, isAdminLoading } = useSelector(
		(state) => state.PermissionDetails
	);

	useEffect(() => {
		dispatch(getPermissionsStart(Number(adminUserId)));
	}, []);

	const tabData = [
		{
			id: '1',
			title: 'Overview',
			component: <OverView details={adminDetails} t={t} />,
		},
		{
			id: '2',
			title: 'Permissions',
			component: <Permissions details={adminDetails} />,
		},
	];

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setactiveTab(tab);
		}
	};

	return isAdminLoading ? (
		<Spinners />
	) : (
		<div className="page-content">
			<Container fluid onLoad={isAdminLoading}>
				<Breadcrumbs
					showRightInfo={false}
					breadcrumbItem={`${adminDetails?.AdminRole?.name}: ${adminDetails.firstName} ${adminDetails.lastName}`}
				/>
				<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
			</Container>
		</div>
	);
};

AdminDetails.propTypes = {
	t: PropTypes.func,
};

AdminDetails.defaultProps = {
	t: (string) => string,
};

export default AdminDetails;
