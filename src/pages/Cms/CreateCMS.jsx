import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import useCreateCms from './hooks/useCreateCms';
import CmsFormPage from './CMSFormPage';

const CreateCMS = () => {
	// Set meta title
	document.title = projectName;

	const { header, validation, formFields, galleryList, customComponent } =
		useCreateCms();

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
						<Card>
							<CrudSection buttonList={galleryList} title="CMS Listing" />
							<CmsFormPage
								formTitle={header}
								validation={validation}
								staticFormFields={formFields}
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

export default CreateCMS;
