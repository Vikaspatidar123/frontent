/* eslint-disable */
import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import FormPage from '../../components/Common/FormPage';
import useEditEmailTemplate from './hooks/useEditEmailTemplate';
import { CustomComponent } from './EmailTemplateListCol';
import Modal from '../../components/Common/Modal';

const EditEmailTemplate = () => {
	// Set meta title
	document.title = projectName;

	const {
		galleryList,
		validation,
		formFields,
		emailTemplate,
		languageOptions,
		imageComponent,
		header,
		showGallery,
		setShowGallery,
	} = useEditEmailTemplate();

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
								title={`Edit Email Template - ${emailTemplate?.label}`}
							/>
							<FormPage
								formTitle={header}
								validation={validation}
								responsiveFormFields={formFields}
								customComponent={
									<CustomComponent
										validation={validation}
										languages={languageOptions}
										isEdit
									/>
								}
								submitLabel="Submit"
								customColClasses="mb-0"
								isSubmitLoading={false}
							/>
							<Modal
								openModal={showGallery}
								toggleModal={() => setShowGallery(!showGallery)}
								headerTitle="Gallery"
								hideFooter
								className="modal-dialog modal-lg"
							>
								{imageComponent}
							</Modal>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default EditEmailTemplate;
