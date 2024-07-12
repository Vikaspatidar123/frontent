import React from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateChatRain from './hooks/useCreateChatRain';
import StepFormTabs from '../../components/Common/StepFormTabs';

const CreateChatrain = () => {
	const {
		tabData,
		toggleTab,
		activeTab,
		onNextClick,
    createChatrainLoading
	} = useCreateChatRain({ isEdit: false });

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Chat Rain"
				breadcrumbItem="Create"
				titleLink="/chat-rain"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				<StepFormTabs
					activeTab={activeTab}
					dontShowFooter={true}
					tabsData={tabData}
					toggleTab={toggleTab}
					onNextClick={onNextClick}
					// isNextDisabled={isNextDisabled}
					// isPrevDisabled={isNextDisabled}
					submitButtonLoading={createChatrainLoading}
				/>
			</Container>
		</div>
	);
};

CreateChatrain.propTypes = {};

export default CreateChatrain;
