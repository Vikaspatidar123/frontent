import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import useCreateCms from './hooks/useCreateCms';
import FormPage from '../../components/Common/FormPage';
import Modal from '../../components/Common/Modal';
import { CustomComponent } from './CmsListCol';

const CreateCMS = () => {
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
	} = useCreateCms();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="CMS"
					breadcrumbItem="Create"
					titleLink="/cms"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
				/>
				<Row>
					<Col lg="12">
						<Card key={`content[${validation?.values?.language}]`}>
							<CrudSection buttonList={galleryList} title="CMS" />
							<FormPage
								formTitle={header}
								validation={validation}
								responsiveFormFields={formFields}
								submitLabel="Submit"
								customColClasses="mb-0"
								isSubmitLoading={false}
								customComponent={
									<CustomComponent
										validation={validation}
										languages={languageOptions}
									/>
								}
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

export default CreateCMS;
