import React from 'react';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import StepFormTabs from '../../components/Common/StepFormTabs';
import useCreateTournaments from './hooks/useCreateTournament';

const EditTournament = () => {
	const {
		tabData,
		toggleTab,
		activeTab,
		onNextClick,
		isNextDisabled,
		isUpdateTournamentLoading,
	} = useCreateTournaments({
		isEdit: true,
	});

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Tournaments"
				breadcrumbItem="Edit"
				titleLink="/tournaments"
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
					isPrevDisabled={false}
					submitButtonText="Update Tournament"
					submitButtonLoading={isUpdateTournamentLoading}
				/>
			</Container>
		</div>
	);
};

EditTournament.propTypes = {};

export default EditTournament;
