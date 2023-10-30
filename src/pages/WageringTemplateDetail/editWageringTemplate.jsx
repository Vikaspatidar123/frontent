import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';
import useEditWageringTemplate from './hooks/useEditWageringTemplate';
import FormPage from '../../components/Common/FormPage';
import { getWageringTemplateDetail } from '../../store/actions';
import { getInitialValues } from './formDetails';

const editWageringTemplate = () => {
	// Set meta title
	document.title = projectName;
	const { wageringTemplateId } = useParams();
	const [page] = useState();
	const dispatch = useDispatch();

	const {
		validation,
		leftFormFields,
		rightFormFields,
		customComponent,
		SAWageringTemplate,
		itemsPerPage,
		SAWageringTemplateLoading,
	} = useEditWageringTemplate();

	useEffect(() => {
		dispatch(
			getWageringTemplateDetail({
				wageringTemplateId: Number(wageringTemplateId),
				providerId: '',
				limit: itemsPerPage,
				pageNo: page,
				search: '',
			})
		);
	}, [itemsPerPage, page]);

	useEffect(() => {
		if (SAWageringTemplate && !SAWageringTemplateLoading) {
			validation.setValues(getInitialValues(SAWageringTemplate));
		}
	}, [SAWageringTemplate, SAWageringTemplateLoading]);

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Wagering Template"
					breadcrumbItem="Edit"
					titleLink="/wagering-template"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
				/>
				<Row>
					<Col lg="12">
						<FormPage
							formTitle="Edit Wagering Template"
							validation={validation}
							leftFormFields={leftFormFields}
							rightFormFields={rightFormFields}
							customComponent={customComponent}
							submitLabel="Submit"
							customColClasses=""
							isSubmitLoading={false}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default editWageringTemplate;
