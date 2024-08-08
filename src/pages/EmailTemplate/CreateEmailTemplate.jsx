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

const CreateEmailTemplate = () => {
	// Set meta title
	document.title = projectName;

	const {
		galleryList,
		validation,
		formFields,
		customComponent,
		showModal,
		setShowModal,
		navigate,
		existingFilledFields,
		onBackClick,
	} = useCreateEmailTemplate();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Email Template"
					breadcrumbItem="Create"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
					callBack={onBackClick}
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
								formClass="ms-2"
							/>
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
