import React, { useState } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import fallbackImage from '../../assets/images/PayMentProvider/credit-card.png';
import useCreate from './hooks/useAddNewProvider';
import FormPage from '../../components/Common/FormPage';
import CrudSection from '../../components/Common/CrudSection';
import NoDataFound from '../../components/Common/NoDataFound';

const AddNewProvider = () => {
	const [selectedProvider, setSelectedProvider] = useState(null);
	const [type, setType] = useState();
	const [previousSelectedProvider, setPreviousSelectedProvider] =
		useState(null);

	const {
		validation,
		formFields,
		isOpen,
		handleProviderClick,
		setHeader,
		paymentProviderData,
		isLoadinpaymentProvider,
		onBackClick,
		buttonList,
		fetchMoreData,
		page,
	} = useCreate({
		selectedProvider,
		setSelectedProvider,
		type,
		previousSelectedProvider,
		setPreviousSelectedProvider,
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
					{isLoadinpaymentProvider &&
						paymentProviderData?.providerCredentials?.length === 0 && (
							<div
								className="d-flex justify-content-center align-items-center"
								style={{ height: '200px' }}
							>
								<Spinner color="primary" />
							</div>
						)}
					{!isLoadinpaymentProvider &&
						paymentProviderData?.providerCredentials?.length === 0 && (
							<div
								className="d-flex justify-content-center align-items-center"
								style={{ height: '200px' }}
							>
								<NoDataFound height="200px" width="300px" />
							</div>
						)}
					<Row className="p-4">
						{paymentProviderData?.providerCredentials?.map((provider) => (
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

					{paymentProviderData?.totalPages > page && (
						<div className="d-flex justify-content-center mt-3">
							<Button color="primary" outline onClick={fetchMoreData}>
								View More
							</Button>
						</div>
					)}
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
