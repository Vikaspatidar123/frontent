import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import useCreateCms from './hooks/useCreateCms';
import FormPage from '../../components/Common/FormPage';
import ConfirmationModal from '../../components/Common/ConfirmationModal';
import { formPageTitle } from '../../components/Common/constants';

const CreateCMS = () => {
	// Set meta title
	document.title = projectName;

	const {
		validation,
		formFields,
		galleryList,
		customComponent,
		showModal,
		setShowModal,
		navigate,
		existingFilledFields,
		onBackClick,
	} = useCreateCms();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Create CMS"
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
							<CrudSection buttonList={galleryList} title="CMS" />
							<FormPage
								// formTitle={header}
								validation={validation}
								responsiveFormFields={formFields}
								customComponent={customComponent}
								submitLabel="Submit"
								customColClasses=""
								isSubmitLoading={false}
							/>
							<ConfirmationModal
								openModal={showModal}
								setOpenModal={setShowModal}
								validation={existingFilledFields}
								navigate={navigate}
								pageType={formPageTitle.cms}
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default CreateCMS;
