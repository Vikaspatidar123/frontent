import React, { useState } from 'react';
import { Container } from 'reactstrap';
import TabsPage from '../../components/Common/TabsPage';
import RestrictedCountries from './components/RestrictedCountries';
import AddToRestrictedCountries from './components/AddToRestrictedCountries';
import RemoveFromRestrictedCountries from './components/RemoveFromRestrictedCountries';

const ViewBlockedCountries = () => {
	const [activeTab, setActiveTab] = useState(1);

	const tabData = [
		{
			id: 1,
			title: 'Restricted Countries',
			component: <RestrictedCountries />,
		},
		{
			id: 2,
			title: 'Add to Restricted Countries',
			component: <AddToRestrictedCountries />,
		},
		{
			id: 3,
			title: 'Remove from Restricted Countries',
			component: <RemoveFromRestrictedCountries />,
		},
	];

	return (
		<div className="page-content">
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

export default ViewBlockedCountries;
