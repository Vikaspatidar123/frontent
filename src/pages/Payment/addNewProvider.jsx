import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import FormModal from '../../components/Common/FormModal';
import fallbackImage from '../../assets/images/PayMentProvider/credit-card.png';
import wallet from '../../assets/images/PayMentProvider/wallet.png';

import useCreate from './hooks/useAddNewProvider';

const AddNewProvider = () => {
	const [selectedProvider, setSelectedProvider] = useState(null);
	const [type, setType] = useState();

	const {
		validation,
		PaymentProviderStaticFormFields,
		isOpen,
		toggleFormModal,
		handleProviderClick,
		header,
		setHeader,
		paymentProviderData,
		// isLoadinpaymentProvider,
		onBackClick,
	} = useCreate({ selectedProvider, setSelectedProvider, type });

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
				<Row>
					{paymentProviderData?.map((provider) => (
						<Col
							xs="12"
							sm="6"
							md="4"
							lg="3"
							key={provider.id}
							style={{ marginBottom: '20px', position: 'relative' }}
						>
							<button
								type="button"
								onClick={() => {
									handleProviderClick(provider);
									setType('Edit');
									setHeader('Edit Payment Provider Details');
								}}
								style={{
									cursor: 'pointer',
									textAlign: 'center',
									border:
										selectedProvider?.id === provider.id
											? '2px solid #007bff'
											: '2px solid transparent',
									borderRadius: '8px',
									padding: '10px',
									transition: 'border-color 0.3s ease',
									boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
									background: 'none',
									outline: 'none',
									width: '100%',
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
									position: 'relative',
								}}
							>
								<div
									style={{
										position: 'absolute',
										top: '10px',
										right: '10px',
										color: provider.isActive ? 'green' : 'red',
										fontSize: '10px',
										fontWeight: 'bold',
									}}
								>
									{provider.isActive ? 'Active' : 'Inactive'}
								</div>
								<img
									src={provider.icon || fallbackImage}
									alt={provider.name}
									style={{
										width: '100px',
										height: '100px',
										objectFit: 'contain',
										borderRadius: '8px',
									}}
								/>
								<div style={{ marginTop: '10px', fontWeight: 'bold' }}>
									{provider.name}
								</div>
							</button>
						</Col>
					))}
					<Col
						xs="12"
						sm="6"
						md="4"
						lg="3"
						style={{ marginBottom: '20px', position: 'relative' }}
					>
						<button
							type="button"
							onClick={() => {
								toggleFormModal();
								setType('Create');
								setHeader('Create Payment Provider');
							}}
							style={{
								cursor: 'pointer',
								textAlign: 'center',
								border: '2px solid transparent',
								borderRadius: '8px',
								padding: '10px',
								transition:
									'border-color 0.3s ease, background-color 0.3s ease',
								boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
								background: '#f8f9fa',
								outline: 'none',
								width: '100%',
								height: '100%',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								justifyContent: 'center',
								position: 'relative',
								color: '#000',
							}}
						>
							<img
								src={wallet}
								alt="Configure New Payment Provider"
								style={{
									width: '100px',
									height: '100px',
									objectFit: 'contain',
									borderRadius: '8px',
								}}
							/>
							<div style={{ marginTop: '10px', fontWeight: 'bold' }}>
								Configure New Payment Provider
							</div>
						</button>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					toggle={toggleFormModal}
					header={header}
					validation={validation}
					submitLabel="Edit"
					customColClasses="col-md-12"
					formFields={PaymentProviderStaticFormFields}
					isSubmitLoading={false}
				/>
			</Container>
		</div>
	);
};

export default AddNewProvider;
