import React from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateBonus from './hooks/useCreateBonus';
import StepFormTabs from '../../components/Common/StepFormTabs';
import ConfirmationModal from '../../components/Common/ConfirmationModal';
import { formPageTitle } from '../../components/Common/constants';

const CreateBonus = () => {
	const {
		tabData,
		toggleTab,
		activeTab,
		onNextClick,
		isNextDisabled,
		createBonusLoading,
		showModal,
		setShowModal,
		onBackClick,
		existingFilledFields,
		navigate,
	} = useCreateBonus({ isEdit: false });

	const validation = {
		values: existingFilledFields,
	};

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Bonus"
				breadcrumbItem="Create"
				// titleLink="/bonus"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
				callBack={onBackClick}
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
				<ConfirmationModal
					openModal={showModal}
					setOpenModal={setShowModal}
					validation={validation}
					navigate={navigate}
					pageType={formPageTitle.bonusManagement}
				/>
			</Container>
		</div>
	);
};

CreateBonus.propTypes = {};

export default CreateBonus;
