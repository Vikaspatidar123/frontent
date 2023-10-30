import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';
import useCreateWageringTemplate from './hooks/useCreateWagringTemplate';
import FormPage from '../../components/Common/FormPage';

const CreateWageringTemplate = () => {
	// Set meta title
	document.title = projectName;

	const {
		validation,
		leftFormFields,
		rightFormFields,
		customComponent,
		createWageringTemplateDetailLoading,
	} = useCreateWageringTemplate();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Wagering Template"
					breadcrumbItem="Create"
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
							formTitle="Create Wagering Template"
							validation={validation}
							leftFormFields={leftFormFields}
							rightFormFields={rightFormFields}
							customComponent={customComponent}
							submitLabel="Submit"
							customColClasses=""
							isSubmitLoading={createWageringTemplateDetailLoading}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default CreateWageringTemplate;
