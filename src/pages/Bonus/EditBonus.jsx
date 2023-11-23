import React from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateBonus from './hooks/useCreateBonus';
import StepFormTabs from '../../components/Common/StepFormTabs';

const EditBonus = () => {
	const {
		tabData,
		toggleTab,
		activeTab,
		onNextClick,
		isNextDisabled,
		updateBonusLoading,
	} = useCreateBonus({ isEdit: true });

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Bonus"
				breadcrumbItem="Edit"
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
					submitButtonText="Update Bonus"
					submitButtonLoading={updateBonusLoading}
				/>
			</Container>
		</div>
	);
};

EditBonus.propTypes = {};

export default EditBonus;
