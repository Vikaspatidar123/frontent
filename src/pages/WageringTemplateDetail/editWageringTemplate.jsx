import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';
import useEditWageringTemplate from './hooks/useEditWageringTemplate';
import FormPage from '../../components/Common/FormPage';

const editWageringTemplate = () => {
	// Set meta title
	document.title = projectName;

	const { validation, leftFormFields, rightFormFields, customComponent } =
		useEditWageringTemplate();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Wagering Template"
					breadcrumbItem="Edit"
					titleLink="/wagering-template"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
				/>
				<Row>
					<Col lg="12">
						<FormPage
							formTitle="Edit Wagering Template"
							validation={validation}
							leftFormFields={leftFormFields}
							rightFormFields={rightFormFields}
							customComponent={customComponent}
							submitLabel="Submit"
							customColClasses=""
							isSubmitLoading={false}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default editWageringTemplate;
