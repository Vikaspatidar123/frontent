import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'reactstrap';
import TabsPage from '../../components/Common/TabsPage';
import Breadcrumb from '../../components/Common/Breadcrumb';
import RestrictedProviders from './components/RestrictedProviders';
import AddRestrictedProviders from './components/AddRestrictedProviders';
import RemoveRestrictedProviders from './components/RemoveRestrictedProviders';
import {
	resetRestrictedItemsData,
	resetUnrestrictedItemsData,
} from '../../store/actions';

const ViewRestrictedProviders = () => {
	const dispatch = useDispatch();
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);
	const [activeTab, setActiveTab] = useState(1);
	const tabData = [
		{
			id: 1,
			title: 'Restricted Providers',
			component: <RestrictedProviders />,
		},
		{
			id: 2,
			title: 'Add to Restricted Providers',
			component: <AddRestrictedProviders />,
		},
		{
			id: 3,
			title: 'Remove from Restricted Providers',
			component: <RemoveRestrictedProviders />,
		},
	];

	// resetting restricted and unrestricted list redux state
	useEffect(
		() => () => {
			dispatch(resetRestrictedItemsData());
			dispatch(resetUnrestrictedItemsData());
		},
		[]
	);

	return (
		<div className="page-content">
			{showBreadcrumb && (
				<Breadcrumb
					title="Site Configurations"
					breadcrumbItem="View Restricted Providers"
					showBackButton
				/>
			)}
			<Container fluid>
				<TabsPage
					activeTab={activeTab}
					tabsData={tabData}
					toggle={setActiveTab}
				/>
			</Container>
		</div>
	);
};

export default ViewRestrictedProviders;
