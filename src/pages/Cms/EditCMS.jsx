import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import CrudSection from '../../components/Common/CrudSection';
import { projectName } from '../../constants/config';
import useEditCms from './hooks/useEditCms';
import FormPage from '../../components/Common/FormPage';

const EditCMS = () => {
	// Set meta title
	document.title = projectName;

	const {
		header,
		validation,
		formFields,
		galleryList,
		customComponent,
		cmsByPageId,
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
						<Card>
							<CrudSection
								buttonList={galleryList}
								title={`Edit CMS - ${cmsByPageId?.page?.slug}`}
							/>
							<FormPage
								formTitle={header}
								validation={validation}
								responsiveFormFields={formFields}
								customComponent={customComponent}
								submitLabel="Submit"
								customColClasses=""
								isSubmitLoading={false}
								formClass="ms-3"
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default EditCMS;
