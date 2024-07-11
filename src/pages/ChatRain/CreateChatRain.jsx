import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import FormPage from '../../components/Common/FormPage';
import {
	resetLinearProgress,
	showLinearProgress,
} from '../../store/progressLoading/actions';
import ConfirmationModal from '../../components/Common/ConfirmationModal';
import { formPageTitle } from '../../components/Common/constants';
import useCreate from './hooks/useCreate';

const CreateChatRain = () => {
	const dispatch = useDispatch();
	const {
		validation,
		customComponent,
		leftFormFields,
		rightFormFields,
		isAddSuperUserLoading,
		showModal,
		setShowModal,
		navigate,
	} = useCreate();

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
				title="Chat Rain"
				breadcrumbItem="Add"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
				values={validation?.values}
				setShowModal={setShowModal}
			/>
			<Container fluid>
				<FormPage
					formTitle="Add new chat rain"
					validation={validation}
					leftFormFields={leftFormFields}
					rightFormFields={rightFormFields}
					submitLabel="Add"
					customColClasses=""
					customComponent={customComponent}
					isSubmitLoading={isAddSuperUserLoading}
				/>
			</Container>
			<ConfirmationModal
				openModal={showModal}
				setOpenModal={setShowModal}
				validation={validation}
				navigate={navigate}
				pageType={formPageTitle.staff}
			/>
		</div>
	);
};

CreateChatRain.propTypes = {
	// t: PropTypes.func.isRequired,
};

export default CreateChatRain;
