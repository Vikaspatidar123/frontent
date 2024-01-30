import React, { useState } from 'react';
import { Container } from 'reactstrap';
import TabsPage from '../../components/Common/TabsPage';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import AddGamesToCasinoSubcategory from './components/AddGamesToCasinoSubcategory';
import AddedGamesInCasinoSubcategory from './components/AddedGamesInCasinoSubcategory';
import RemoveGamesFromCasinoSubcategory from './components/RemoveGamesFromCasinoSubcategory';

const AddGamesCasinoSubcategory = () => {
	const [activeTab, setActiveTab] = useState(1);
	const tabData = [
		{
			id: 1,
			title: 'Added Games',
			component: <AddedGamesInCasinoSubcategory />,
		},
		{
			id: 2,
			title: 'Add Games to Casino SubCategory',
			component: <AddGamesToCasinoSubcategory />,
		},
		{
			id: 3,
			title: 'Remove Games from Casino SubCategory',
			component: <RemoveGamesFromCasinoSubcategory />,
		},
	];

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs showBackButton showRightInfo={false} />
				<TabsPage
					activeTab={activeTab}
					tabsData={tabData}
					toggle={setActiveTab}
				/>
			</Container>
		</div>
	);
};

export default AddGamesCasinoSubcategory;
