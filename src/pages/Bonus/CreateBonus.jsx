import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import useCreateBonus from './hooks/useCreateBonus';
import {
	resetLinearProgress,
	showLinearProgress,
} from '../../store/progressLoading/actions';
import TabsPage from '../../components/Common/TabsPage';

const CreateBonus = () => {
	const dispatch = useDispatch();

	const {
		tabData,
		toggleTab,
		activeTab,

		// validation,
		// customComponent,
		// leftFormFields,
		// rightFormFields,
		isAddSuperUserLoading,
	} = useCreateBonus();

	useEffect(() => {
		if (isAddSuperUserLoading) {
			dispatch(showLinearProgress());
		} else {
			dispatch(resetLinearProgress());
		}
	}, [isAddSuperUserLoading]);

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
				<TabsPage activeTab={activeTab} tabsData={tabData} toggle={toggleTab} />
			</Container>
		</div>
	);
};

CreateBonus.propTypes = {
	// t: PropTypes.func.isRequired,
};

export default CreateBonus;
