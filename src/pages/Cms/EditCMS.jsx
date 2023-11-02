import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import useEditCms from './hooks/useEditCms';
import CmsFormPage from './CMSFormPage';

const EditCMS = () => {
	// Set meta title
	document.title = projectName;

	const { header, validation, formFields, galleryList, customComponent } =
		useEditCms();

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
						<Card>
							<CrudSection buttonList={galleryList} title="CMS" />
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

export default EditCMS;
