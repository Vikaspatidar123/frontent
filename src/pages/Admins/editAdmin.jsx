import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types'
// import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useActions from './hooks/useActions';
import FormPage from '../../components/Common/FormPage';
// import {
// 	getPermissionsStart,
// 	resetAdminDetails,
// } from '../../store/auth/permissionDetails/actions';
// import {
// 	resetLinearProgress,
// 	showLinearProgress,
// } from '../../store/progressLoading/actions';
import { getInitialValues } from './formDetails';
import { STORAGE_KEY } from '../../components/Common/constants';
import { decryptCredentials } from '../../network/storageUtils';

const EditAdmin = () => {
	// const dispatch = useDispatch();
	const { adminUserId } = useParams();

	const {
		validation,
		customComponent,
		leftFormFields,
		rightFormFields,
		isUpdateSuperUserLoading,
		// isAdminLoading,
		// adminDetails,
	} = useActions(true);

	useEffect(() => {
		const savedDetails = decryptCredentials(
			localStorage.getItem(`${STORAGE_KEY.ADMIN_EDIT}_${adminUserId}`)
		);
		validation.resetForm(getInitialValues(JSON.parse(savedDetails)));
	}, []);

	// resetting admin details redux state
	// useEffect(() => () => dispatch(resetAdminDetails()), []);

	// useEffect(() => {
	// 	if (adminDetails && !isAdminLoading) {
	// 		validation.resetForm(getInitialValues(adminDetails));
	// 		dispatch(resetLinearProgress());
	// 	}
	// }, [adminDetails, isAdminLoading]);

	// useEffect(() => {
	// 	if (isUpdateSuperUserLoading) {
	// 		dispatch(showLinearProgress());
	// 	} else {
	// 		dispatch(resetLinearProgress());
	// 	}
	// }, [isUpdateSuperUserLoading]);
	return (
		<div className="page-content">
			<Breadcrumbs
				title="Staff"
				breadcrumbItem="Edit"
				titleLink="/staff"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				<FormPage
					formTitle="Edit staff"
					validation={validation}
					leftFormFields={leftFormFields}
					rightFormFields={rightFormFields}
					submitLabel="Submit"
					customColClasses=""
					customComponent={customComponent}
					isSubmitLoading={isUpdateSuperUserLoading}
				/>
			</Container>
		</div>
	);
};

EditAdmin.propTypes = {
	// t: PropTypes.func.isRequired,
};

export default EditAdmin;
