/* eslint-disable */
import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import FormPage from '../../components/Common/FormPage';
import useCreateEmailTemplate from './hooks/useCreateEmailTemplate';
import ConfirmationModal from '../../components/Common/ConfirmationModal';
import { formPageTitle } from '../../components/Common/constants';
import { CustomComponent } from './EmailTemplateListCol';
import Modal from '../../components/Common/Modal';

const CreateEmailTemplate = () => {
	// Set meta title
	document.title = projectName;

	const {
		galleryList,
		validation,
		formFields,
		showModal,
		setShowModal,
		navigate,
		existingFilledFields,
		languageOptions,
		imageComponent,
		header,
		showGallery,
		setShowGallery,
	} = useCreateEmailTemplate();

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
								formTitle={header}
								validation={validation}
								responsiveFormFields={formFields}
								customComponent={
									<CustomComponent
										validation={validation}
										languages={languageOptions}
									/>
								}
								submitLabel="Submit"
								customColClasses=""
								isSubmitLoading={false}
								formClass="ms-2"
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
							<ConfirmationModal
								openModal={showModal}
								setOpenModal={setShowModal}
								validation={existingFilledFields}
								navigate={navigate}
								pageType={formPageTitle.crm}
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default CreateEmailTemplate;
