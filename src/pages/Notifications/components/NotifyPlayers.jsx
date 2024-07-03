import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { projectName } from '../../../constants/config';
import useNotifyPlayer from '../hooks/useNotifyPlayer';
import FormPage from '../../../components/Common/FormPage';
import ConfirmationModal from '../../../components/Common/ConfirmationModal';
import { formPageTitle } from '../../../components/Common/constants';

const CreateWageringTemplate = () => {
	// Set meta title
	document.title = projectName;

	const {
		validation,
		leftFormFields,
		rightFormFields,
		customComponent,
		createWageringTemplateDetailLoading,
		showModal,
		setShowModal,
		navigate,
		existingFilledData,
	} = useNotifyPlayer();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Wagering Template"
					breadcrumbItem="Create"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
					values={validation.values}
					setShowModal={setShowModal}
				/>
				<Row>
					<Col lg="12">
						<FormPage
							formTitle="Create Wagering Template"
							validation={validation}
							leftFormFields={leftFormFields}
							rightFormFields={rightFormFields}
							customComponent={customComponent}
							submitLabel="Submit"
							customColClasses=""
							isSubmitLoading={createWageringTemplateDetailLoading}
						/>
						<ConfirmationModal
							openModal={showModal}
							setOpenModal={setShowModal}
							navigate={navigate}
							validation={existingFilledData}
							pageType={formPageTitle.wageringTemplate}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default CreateWageringTemplate;
