import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import useEditCms from './hooks/useEditCms';
import FormPage from '../../components/Common/FormPage';
import Modal from '../../components/Common/Modal';
import { CustomComponent } from './CmsListCol';

const EditCMS = () => {
	// Set meta title
	document.title = projectName;

	const {
		header,
		validation,
		formFields,
		galleryList,
		showGallery,
		setShowGallery,
		imageComponent,
		languageOptions,
	} = useEditCms();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="CMS"
					breadcrumbItem="Edit"
					titleLink="/cms"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
				/>
				<Row>
					<Col lg="12">
						<Card key={validation?.values?.language}>
							<CrudSection buttonList={galleryList} title="CMS" />
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
						</Card>
					</Col>
				</Row>
				<Modal
					openModal={showGallery}
					toggleModal={() => setShowGallery(!showGallery)}
					headerTitle="Gallery"
					hideFooter
					className="modal-dialog modal-lg"
				>
					{imageComponent}
				</Modal>
			</Container>
		</div>
	);
};

export default EditCMS;
