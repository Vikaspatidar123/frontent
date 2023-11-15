import React from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types'
// import { useDispatch } from 'react-redux';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateBonus from './hooks/useCreateBonus';
import StepFormTabs from '../../components/Common/StepFormTabs';

const CreateBonus = () => {
	const { tabData, toggleTab, activeTab, onNextClick } = useCreateBonus();

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Bonus"
				breadcrumbItem="Create"
				titleLink="/bonus"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				<StepFormTabs
					activeTab={activeTab}
					tabsData={tabData}
					toggleTab={toggleTab}
					onNextClick={onNextClick}
				/>
			</Container>
		</div>
	);
};

CreateBonus.propTypes = {
	// t: PropTypes.func.isRequired,
};

export default CreateBonus;
