import React from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types'
import Breadcrumbs from '../../components/Common/Breadcrumb';
import useActions from './hooks/useActions';
import FormPage from '../../components/Common/FormPage';

const AddAdmin = () => {
	const {
		validation,
		customComponent,
		leftFormFields,
		rightFormFields,
		isAddSuperUserLoading,
	} = useActions();

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Staff"
				breadcrumbItem="Add"
				titleLink="/staff"
				leftTitle={<i className="fas fa-angle-left" />}
			/>
			<Container fluid>
				<FormPage
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
