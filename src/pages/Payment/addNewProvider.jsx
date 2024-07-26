import React, { useState } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import googlePay from '../../assets/images/PayMentProvider/googlePay.png';
import authOverlay from '../../assets/images/PayMentProvider/liminal.png';

const AddNewProvider = () => {
	const [selectedProvider, setSelectedProvider] = useState(null);
	const [providers, setProviders] = useState({
		metamask: {
			label: 'MetaMask',
			icon: googlePay,
			credentials: [
				{ name: 'Private key' },
				{ name: 'Secret Key' },
				{ name: 'Merchant id' },
				{ name: 'End Point' },
			],
		},
		skrill: {
			label: 'Liminal',
			icon: authOverlay,
			credentials: [
				{ name: 'Private key' },
				{ name: 'Secret Key' },
				{ name: 'Merchant id' },
				{ name: 'End Point' },
			],
		},
		// Add more providers as needed
	});

	console.log(selectedProvider);

	const handleProviderClick = (key) => {
		setSelectedProvider(key);
	};

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
			/>
			<Container fluid>
				<Row>
					{Object.keys(providers).map((key) => (
						<Col
							xs="12"
							sm="6"
							md="4"
							lg="3"
							key={key}
							style={{ marginBottom: '20px' }}
						>
							<button
								type="button"
								onClick={() => {
									handleProviderClick(key);
									setProviders(providers[key]);
								}}
								style={{
									cursor: 'pointer',
									textAlign: 'center',
									border:
										selectedProvider === key
											? '2px solid #007bff'
											: '2px solid transparent',
									borderRadius: '8px',
									padding: '10px',
									transition: 'border-color 0.3s ease',
									boxShadow: '0 4px 8px rgba(0, 0, 0, 10)',
									background: 'none',
									// eslint-disable-next-line no-dupe-keys
									border: 'none',
									outline: 'none',
									width: '100%',
									height: '100%',
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
									justifyContent: 'center',
								}}
							>
								<img
									src={providers[key].icon}
									alt={providers[key].label}
									style={{
										width: '100px',
										height: '100px',
										objectFit: 'contain',
										borderRadius: '8px',
									}}
								/>
								<div style={{ marginTop: '10px', fontWeight: 'bold' }}>
									{providers[key].label}
								</div>
							</button>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
};

export default AddNewProvider;
