/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { Container, Col, Row, Card } from 'reactstrap';
// import Breadcrumbs from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';

import useLoyalty from './hooks/useLoyalty';
import LoyaltyFormPage from './LoyaltyFormPage';
import CrudSection from '../../components/Common/CrudSection';
import Spinners from '../../components/Common/Spinner';

const LoyaltyManagement = () => {
	// meta title
	document.title = projectName;

	const {
		validation,
		formFields,
		buttonList,
		loyaltyLevelLoading,
		deleteLevel,
	} = useLoyalty();

	return (
		<div className="page-content">
			<Container fluid>
				{/* <Breadcrumbs
					title={t('Loyalty Level List')}
					breadcrumbItem={t('Loyalty Management')}
				/> */}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Loyalty Level" />
							{loyaltyLevelLoading ? (
								<Spinners />
							) : (
								<LoyaltyFormPage
									validation={validation}
									formFields={formFields}
									submitLabel="Submit"
									isSubmitLoading={loyaltyLevelLoading}
									deleteLevel={deleteLevel}
								/>
							)}
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

LoyaltyManagement.propTypes = {
	// t: PropTypes.func,
};

LoyaltyManagement.defaultProps = {
	t: (string) => string,
};

export default LoyaltyManagement;
