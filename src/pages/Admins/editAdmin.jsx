/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types'
// import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();
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
		if (savedDetails) {
			let data = JSON.parse(savedDetails);
			data = {
				...data,
				permission: {
					...data.permission,
					permission: data?.permission?.permission
						? typeof data?.permission?.permission === 'string'
							? JSON.parse(data?.permission?.permission)
							: data.permission.permission
						: {},
				},
			};
			validation.resetForm(getInitialValues(data));
		} else {
			navigate('/staff');
		}

		return () =>
			localStorage.removeItem(`${STORAGE_KEY.ADMIN_EDIT}_${adminUserId}`);
	}, []);

	console.log('Outside', validation.values);

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
