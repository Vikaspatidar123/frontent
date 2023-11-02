/* eslint-disable */
import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import FormPage from '../../components/Common/FormPage';
import useCreateEmailTemplate from './hooks/useCreateEmailTemplate';

const CreateEmailTemplate = () => {
	// Set meta title
	document.title = projectName;

	const { galleryList, validation, formFields, customComponent } =
		useCreateEmailTemplate();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Email Template"
					breadcrumbItem="Create"
					titleLink="/email-templates"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={galleryList}
								title="Create Email Template"
							/>
							<FormPage
								validation={validation}
								responsiveFormFields={formFields}
								customComponent={customComponent}
								submitLabel="Submit"
								customColClasses=""
								isSubmitLoading={false}
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default CreateEmailTemplate;
