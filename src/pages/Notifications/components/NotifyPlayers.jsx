import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { projectName } from '../../../constants/config';
import useNotifyPlayer from '../hooks/useNotifyPlayer';
import FormPage from '../../../components/Common/FormPage';

const NotifyPlayers = () => {
	// Set meta title
	document.title = projectName;

	const {
		validation,
		leftFormFields,
		rightFormFields,
		customComponent,
		notifyPlayerLoading,
	} = useNotifyPlayer();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Content Management"
					breadcrumbItem="Notify Players"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
					values={validation.values}
					isNotFormModal
				/>
				<Row>
					<Col lg="12">
						<FormPage
							formTitle="Notify players"
							validation={validation}
							leftFormFields={leftFormFields}
							rightFormFields={rightFormFields}
							customComponent={customComponent}
							submitLabel="Notify Players"
							customColClasses=""
							isSubmitLoading={notifyPlayerLoading}
							rowCustomClass="px-4"
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default NotifyPlayers;
