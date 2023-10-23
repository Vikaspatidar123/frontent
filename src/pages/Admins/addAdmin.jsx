import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';

import Breadcrumbs from '../../components/Common/Breadcrumb';
import useActions from './hooks/useActions';
import FormPage from '../../components/Common/FormPage';
import {
	resetLinearProgress,
	showLinearProgress,
} from '../../store/progressLoading/actions';

const AddAdmin = () => {
	const dispatch = useDispatch();

	const {
		validation,
		customComponent,
		leftFormFields,
		rightFormFields,
		isAddSuperUserLoading,
	} = useActions();

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
				title="Staff"
				breadcrumbItem="Add"
				titleLink="/staff"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
			/>
			<Container fluid>
				<FormPage
					formTitle="Add new staff"
					validation={validation}
					leftFormFields={leftFormFields}
					rightFormFields={rightFormFields}
					submitLabel="Add"
					customColClasses=""
					customComponent={customComponent}
					isSubmitLoading={isAddSuperUserLoading}
				/>
			</Container>
		</div>
	);
};

AddAdmin.propTypes = {
	// t: PropTypes.func.isRequired,
};

export default AddAdmin;
