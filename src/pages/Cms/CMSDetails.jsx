import React from 'react';
import { Card, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';
import useCmsDetail from './hooks/useCmsDetails';
import FormPage from '../../components/Common/FormPage';
import CrudSection from '../../components/Common/CrudSection';

const CMSDetails = () => {
	// Set meta title
	document.title = projectName;

	const { header, validation, formFields, customComponent, cmsByPageId } =
		useCmsDetail();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="CMS"
					breadcrumbItem="View"
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
								buttonList={[]}
								title={`View CMS - ${cmsByPageId?.page?.slug}`}
							/>
							<FormPage
								formTitle={header}
								validation={validation}
								responsiveFormFields={formFields}
								customComponent={customComponent}
								submitLabel="Submit"
								customColClasses=""
								isSubmitLoading={false}
								isSubmit={false}
								formClass="ms-2"
							/>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default CMSDetails;
