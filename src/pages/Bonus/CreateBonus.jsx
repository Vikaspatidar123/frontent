import React from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateBonus from './hooks/useCreateBonus';
import StepFormTabs from '../../components/Common/StepFormTabs';

const CreateBonus = () => {
	const {
		tabData,
		toggleTab,
		activeTab,
		onNextClick,
		isNextDisabled,
		createBonusLoading,
	} = useCreateBonus({ isEdit: false });

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
					isNextDisabled={isNextDisabled}
					isPrevDisabled={isNextDisabled}
					submitButtonText="Create Bonus"
					submitButtonLoading={createBonusLoading}
				/>
			</Container>
		</div>
	);
};

CreateBonus.propTypes = {};

export default CreateBonus;
