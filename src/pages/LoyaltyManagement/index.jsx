/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Container, Col, Row, Card } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import { projectName } from '../../constants/config';

import useLoyalty from './hooks/useLoyalty';
import LoyaltyFormPage from './LoyaltyFormPage';
import CrudSection from '../../components/Common/CrudSection';
import Spinners from '../../components/Common/Spinner';

const LoyaltyManagement = ({ bonusDetails }) => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		validation,
		formFields,
		buttonList,
		loyaltyLevelLoading,
		deleteLevel,
	} = useLoyalty();

	return (
		<div className={`${!bonusDetails && 'page-content'}`}>
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb
						title="Loyalty Level List"
						breadcrumbItem="Loyalty Management"
					/>
				)}
				<Row>
					<Col lg="12">
						<Card>
							{!bonusDetails && (
								<CrudSection buttonList={buttonList} title="Loyalty Level" />
							)}
							{loyaltyLevelLoading ? (
								<Spinners />
							) : (
								<LoyaltyFormPage
									validation={validation}
									formFields={formFields}
									submitLabel="Submit"
									isSubmitLoading={loyaltyLevelLoading}
									deleteLevel={deleteLevel}
									bonusDetails={bonusDetails}
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
