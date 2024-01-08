/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
// import { getSiteConfiguration } from '../../network/getRequests';
import Breadcrumbs from '../../components/Common/Breadcrumb';

import { projectName } from '../../constants/config';
import { getSuperAdminStart } from '../../store/auth/permissionDetails/actions';
import {
	getLanguagesStart,
	updateProfileStart,
	updateSiteConfigurationStart,
} from '../../store/actions';

import Overview from './FormSections/Overview';
import SiteConfig from './FormSections/SiteConfiguration';
import Password from './FormSections/Password';
import Permissions from './FormSections/Permissions';
import TabsPage from '../../components/Common/TabsPage';
import HierarchyTree from './HierarchyTree';

const ProfilePage = ({ t }) => {
	// meta title
	document.title = projectName;

	const [activeTab, setActiveTab] = useState('1');
	const [editable, setEditable] = useState(true);
	const [editableSiteConfig, setEditableSiteConfig] = useState(true);
	const [details, setDetails] = useState([]);
	const isTenant = false;

	const toggle = (tab) => {
		if (activeTab !== tab) {
			setActiveTab(tab);
		}
	};
	const { superAdminUser, isSuperAdminLoading } = useSelector(
		(state) => state.PermissionDetails
	);
	const { languageData, languageDataLoading } = useSelector(
		(state) => state.CasinoManagementData
	);
	const { resetProfilePasswordLoading } = useSelector(
		(state) => state.ProfileData
	);

	const dispatch = useDispatch();

	const updateData = (data) => {
		dispatch(
			updateProfileStart({
				data,
				isTenant,
			})
		);
	};

	const updateSiteConfiguration = (data) => {
		dispatch(
			updateSiteConfigurationStart({
				data,
				isTenant,
			})
		);
		setEditableSiteConfig(false);
	};

	useEffect(() => {
		dispatch(getSuperAdminStart());
	}, []);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		// async function fetchData() {
		// 	await getSiteConfiguration().then((res) => {
		// 		setDetails(res?.data?.data?.siteInformation);
		// 	});
		// }
		// fetchData();
		const staticSiteConfiguration = [
			{
				key: 'SENDGRID',
				value: {
					SENDGRID_EMAIL: 'ppatidar@grepruby.io',
					SENDGRID_API_KEY:
						'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',
				},
			},
			{
				key: 'SITE_INFORMATION',
				value: {
					url: 'https://gscore.com/',
					logo: 'development/site-logo/duv5vdxgmmf/1701784252116.png',
					name: 'B2C',
					sport: false,
					casino: true,
					languages: {
						DE: 'German',
						EN: 'English',
						ES: 'Spanish',
						HI: 'Hindi',
						MS: 'Malay',
						NO: 'Norwegian',
						PS: 'Pasto',
						RO: 'Romanian',
						RU: 'Russian',
					},
					maintenance: false,
					supportEmail: 'support@gammastack.com',
				},
			},
		];
		setDetails(staticSiteConfiguration);
	}, []);

	const tabData = [
		{
			id: '1',
			title: 'Overview',
			component: (
				<Overview
					details={superAdminUser}
					isTenant={isTenant}
					isEditable={editable}
					setIsEditable={setEditable}
					updateData={updateData}
					isLoading={isSuperAdminLoading}
				/>
			),
		},
		{
			id: '2',
			title: 'Site Keys',
			component: (
				<SiteConfig
					details={details}
					languageData={languageData}
					editableSiteConfig={editableSiteConfig}
					setEditableSiteConfig={setEditableSiteConfig}
					updateSiteConfiguration={updateSiteConfiguration}
					isLanguageDataLoading={!languageDataLoading}
				/>
			),
		},
		{
			id: '3',
			title: 'Reset Password',
			component: (
				<Password loading={resetProfilePasswordLoading} isTenant={isTenant} />
			),
		},
		{
			id: '4',
			title: 'Permissions',
			component: <Permissions details={superAdminUser} />,
		},
		{
			id: '5',
			title: 'Tree',
			component: !isTenant && superAdminUser && superAdminUser?.id && (
				<HierarchyTree
					adminDetails={{
						name: `${superAdminUser?.firstName} ${superAdminUser?.lastName}`,
						id: superAdminUser?.id,
						children: [],
						isInitial: true,
						data: { superRoleId: superAdminUser?.adminRoleId },
					}}
				/>
			),
		},
	];
	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs title={t('Dashboard')} breadcrumbItem={t('Profile')} />
				<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggle} />
			</Container>
		</div>
	);
};

ProfilePage.propTypes = {
	t: PropTypes.func,
};

ProfilePage.defaultProps = {
	t: (string) => string,
};

export default ProfilePage;
