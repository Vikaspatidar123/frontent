import React from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateChatRain from './hooks/useCreateChatRain';
import StepFormTabs from '../../components/Common/StepFormTabs';

const EditChatrain = () => {
	const {
		tabData,
		toggleTab,
		activeTab,
		onNextClick,
		updateChatrainLoading,
	} = useCreateChatRain({ isEdit: true });

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Chat Rain"
				breadcrumbItem="Edit"
				titleLink="/chat/chat-rain"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				{/* {getChannelDetailsLoading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : ( */}
				<StepFormTabs
					activeTab={activeTab}
					tabsData={tabData}
					dontShowFooter={true}
					toggleTab={toggleTab}
					onNextClick={onNextClick}
					// isNextDisabled={isNextDisabled}
					// isPrevDisabled={isNextDisabled}
					submitButtonText="Update Chat Rain"
					submitButtonLoading={updateChatrainLoading}
				/>
				{/* )} */}
			</Container>
		</div>
	);
};

EditChatrain.propTypes = {};

export default EditChatrain;
