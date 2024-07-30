import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import fallbackImage from '../../assets/images/PayMentProvider/credit-card.png';
import useCreate from './hooks/useAddNewProvider';
import FormPage from '../../components/Common/FormPage';
import CrudSection from '../../components/Common/CrudSection';

const AddNewProvider = () => {
	const [selectedProvider, setSelectedProvider] = useState(null);
	const [type, setType] = useState();
	const [previousSelectedProvider, setPreviousSelectedProvider] =
		useState(null);
	const [dynamicField, setDynamicField] = useState([]);

	const {
		validation,
		formFields,
		isOpen,
		handleProviderClick,
		setHeader,
		paymentProviderData,
		onBackClick,
		buttonList,
	} = useCreate({
		selectedProvider,
		setSelectedProvider,
		type,
		previousSelectedProvider,
		setPreviousSelectedProvider,
		dynamicField,
		setDynamicField,
	});

	return (
		<div className="page-content">
			<Breadcrumbs
				title="Payment"
				breadcrumbItem="Configure"
				leftTitle={
					<>
						<i className="fas fa-angle-left" /> Back
					</>
				}
				callBack={onBackClick}
			/>
			<Container fluid>
				<Card className="p-2">
					<CrudSection buttonList={buttonList} title="Payment provider" />

					<Row>
						{paymentProviderData?.map((provider) => (
							<Col
								xs="6"
								sm="3"
								md="2"
								className="p-2 payment-card"
								key={provider.id}
							>
								<button
									type="button"
									onClick={() => {
										handleProviderClick(provider);
										setType('Edit');
										setHeader(
											`Edit ${provider.name ?? 'payment provider'} Details`
										);
									}}
									className={`provider-button  ${
										selectedProvider?.id === provider.id ? 'selected' : ''
									}`}
								>
									{/* <div
										className={`status ${
											provider.isActive ? 'active' : 'inactive'
										}`}
									>
										{provider.isActive ? (
											<i className="mdi mdi-check-circle" />
										) : (
											<i className="mdi mdi-close-thick" />
										)}
									</div> */}
									<img
										src={provider.icon || fallbackImage}
										alt={provider.name}
										className="provider-image"
									/>
									<div className="provider-name">{provider.name}</div>
								</button>
							</Col>
						))}
					</Row>
				</Card>
			</Container>
			<Container fluid style={{ marginTop: '15px' }}>
				{isOpen && (
					<FormPage
						validation={validation}
						responsiveFormFields={formFields}
						colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
						submitLabel="Submit"
						isSubmit
						customColClasses="mb-4"
					/>
				)}
			</Container>
		</div>
	);
};

export default AddNewProvider;
