/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Card, Col, Row, Spinner } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useUserOverview from './hooks/useUserOverview';
import DisableReason from './components/DisableReason';
import YesNoModal from './components/YesNoModal';
import { markUserAsInternal, updateSAUserStatus } from '../../store/actions';

const Overview = ({ userDetails, userDetailsLoading }) => {
	const dispatch = useDispatch();
	const { playerId } = useParams();
	const [internalModalOpen, setInternalModalOpen] = useState(false);
	const [activeInactiveModal, setActiveInactiveModal] = useState(false);
	const { basicInfo, contactInfo, kycInfo } = useUserOverview({
		user: userDetails,
	});

	const updateUserStatus = (values) => {
		dispatch(
			updateSAUserStatus({
				...values,
				code: 'USER',
				userId: playerId,
				status: !userDetails.isActive,
			})
		);
	};

	const handleInternalChange = () => {
		dispatch(
			markUserAsInternal({
				userId: playerId,
			})
		);
	};

	return (
		<div>
			{userDetailsLoading ? (
				<Spinner
					color="primary"
					className="position-absolute top-50 start-50"
				/>
			) : (
				<Row>
					<Col xs={12} lg={4} className="col-padding">
						<Card className="card-overview">
							<h4 className="h4-overview text-center mt-3">
								Basic Info <hr className="h4-hr" />
							</h4>
							<div className="div-overview">
								{basicInfo?.map(({ label, value, subValue }) =>
									userDetails?.kycMethod !== 1 && label === 'Applicant Id'
										? ''
										: (label === 'Reason' && value
												? true
												: label !== 'Reason') && (
												<div
													key={label}
													className="d-flex justify-content-between m-1"
												>
													<h6 className="px-2">{label}</h6>
													<span className={`${subValue} px-2`}>
														{value || 'NA'}
													</span>
												</div>
										  )
								)}
							</div>
						</Card>
					</Col>
					<Col xs={12} lg={4} className="col-padding">
						<Card className="p-2">
							<h4 className="h4-overview text-center mt-3">
								Account Actions <hr className="h4-hr" />
							</h4>
							<div className="div-overview">
								<Row>
									<Col className="text-center mb-2" xs={12} md={6}>
										<Button
											className="actionButton w-100"
											variant={
												userDetails?.isActive
													? 'outline-danger'
													: 'outline-success'
											}
											// hidden={isHidden({ module: { key: 'Users', value: 'T' } })}
											onClick={() => setActiveInactiveModal(true)}
										>
											{userDetails && userDetails?.isActive
												? 'In-Active'
												: 'Active'}
										</Button>
									</Col>
									<Col xs={12} md={6} className="text-center mb-2">
										<Button
											className="actionButton w-100"
											variant="outline-warning"
											hidden={
												// isHidden({ module: { key: 'Users', value: 'U' } }) ||
												userDetails?.tags?.includes('Internal')
											}
											onClick={() => setInternalModalOpen(true)}
										>
											Internal
										</Button>
									</Col>
									<Col xs={12} md={6} className="text-center mb-2">
										<Button
											className="actionButton w-100"
											variant="outline-success"
											// hidden={isHidden({ module: { key: 'Users', value: 'EV' } }) || userDetails?.isEmailVerified}
											// onClick={() => setVerifyEmailModal(true)}
										>
											Verify Email
										</Button>
									</Col>
									<Col xs={12} md={6} className="text-center mb-2">
										<Button
											variant="outline-warning"
											onClick={() => {
												// addTag()
											}}
											className="actionButton w-100"
										>
											Manage Tag
										</Button>
									</Col>
									<Col xs={12} md={6} className="text-center mb-2">
										<Button
											variant="outline-secondary"
											onClick={() => {
												// getDuplicateUsers()
											}}
											className="actionButton w-100"
										>
											Duplicates
											{/* ({duplicateUsers?.count}) */}
										</Button>
									</Col>
									<Col xs={12} md={6} className="text-center mb-2">
										<Button
											className="actionButton w-100"
											variant="outline-secondary"
											// hidden={isHidden({ module: { key: 'Bonus', value: 'Issue' } })}
											// onClick={() => setShowModal(true)}
										>
											Give Bonus
										</Button>
									</Col>
									<Col xs={12} md={6} className="text-center mb-2">
										<Button
											className="actionButton w-100"
											variant="outline-success"
											// hidden={isHidden({ module: { key: 'Users', value: 'AB' } })}
											// onClick={() => setShowManageMoneyModal(true)}
										>
											Manage Money
										</Button>
									</Col>
									<Col xs={12} md={6} className="text-center mb-2">
										{userDetails?.trackingToken &&
											userDetails?.isAffiliateUpdated === false && (
												<Button
													className="actionButton w-100"
													variant="outline-success"
													// onClick={() => setShowAddAffiliate(prev => true)}
												>
													Add Affiliate
													{/* {addUserAffiliateLoading && ( */}
													<Spinner
														as="span"
														animation="border"
														role="status"
														aria-hidden="true"
													/>
													{/* )} */}
												</Button>
											)}
									</Col>
									<Col xs={12} md={6} className="text-center mb-2">
										{userDetails?.trackingToken &&
											userDetails?.isAffiliateUpdated &&
											userDetails?.affiliateStatus && (
												<Button
													className="actionButton w-100"
													variant="outline-danger"
													// onClick={() => setShowRemoveAffiliate(true)}
												>
													Remove Affiliate
													{/* {updateUserAffiliateLoading && ( */}
													<Spinner
														as="span"
														animation="border"
														role="status"
														aria-hidden="true"
													/>
													{/* )} */}
												</Button>
											)}
									</Col>
									<Col xs={12} md={6} className="text-center mb-2">
										<Button
											className="actionButton w-100"
											variant="outline-warning"
											// hidden={isHidden({ module: { key: 'Users', value: 'U' } })}
											// onClick={() => setEditModal(true)}
										>
											Edit User Info
										</Button>
									</Col>
									{/* {!isHidden({ module: { key: 'Users', value: 'UP' } }) &&
                  <Dropdown className='d-inline'>
                    <Dropdown.Toggle
                      id='dropdown-autoclose-outside'
                      className='actionButton w-100'
                      variant='outline-success'
                    >
                      Reset Password
                    </Dropdown.Toggle>

                    <Dropdown.Menu className='userDetails-dropdown userDetails'>
                      <Dropdown.Item
                        onClick={() => setPasswordEmail(true)}
                      >Send Email
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => setUserPassword(true)}
                      >Reset Password
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                } */}
								</Row>
							</div>
						</Card>
					</Col>
					<Col xs={12} lg={4} className="col-padding">
						<Card className="card-overview">
							<h4 className="h4-overview text-center mt-3">
								Other Info <hr className="h4-hr" />
							</h4>
							<div className="div-overview">
								<h5 className="px-2 mx-1">
									Contact Info <hr className="h5-hr m-0 mt-2" />
								</h5>
								{contactInfo?.map(({ label, value, subValue }) =>
									userDetails?.kycMethod !== 1 && label === 'Applicant Id'
										? ''
										: (label === 'Reason' && value
												? true
												: label !== 'Reason') && (
												<div
													key={label}
													className="d-flex justify-content-between m-1"
												>
													<h6 className="px-2 overview-leftlabel">{label}</h6>
													<span className={`${subValue} px-2`}>
														{value || 'NA'}
													</span>
												</div>
										  )
								)}

								<h5 className="px-2 mx-1 mt-2">
									Affiliate Info <hr className="h5-hr m-0 mt-2" />
								</h5>
								<div className="d-flex justify-content-between m-1">
									<h6 className="px-2 overview-leftlabel">Affiliate Token</h6>
									<span className="px-2">
										{userDetails?.trackingToken || 'NA'}
									</span>
								</div>
								<div className="d-flex justify-content-between m-1">
									<h6 className="px-2 overview-leftlabel">Affiliate Status</h6>
									{userDetails?.affiliateStatus ? (
										<span className="text-success px-2">Linked</span>
									) : (
										<span className="text-danger px-2">Not Linked</span>
									)}
								</div>

								<h5 className="px-2 mx-1 mt-2">
									KYC Info <hr className="h5-hr m-0 mt-2" />
								</h5>
								{kycInfo?.map(({ label, value, subValue }) =>
									userDetails?.kycMethod !== 1 && label === 'Applicant Id'
										? ''
										: (label === 'Reason' && value
												? true
												: label !== 'Reason') && (
												<div
													key={label}
													className="d-flex justify-content-between m-1"
												>
													<h6 className="px-2 overview-leftlabel">{label}</h6>
													<span className={`${subValue} px-2`}>
														{value || 'NA'}
													</span>
												</div>
										  )
								)}
							</div>
						</Card>
					</Col>
					{userDetails?.isActive ? (
						<DisableReason
							userData={userDetails}
							show={activeInactiveModal}
							markUserStatusInactive={updateUserStatus}
							handleClose={() => setActiveInactiveModal(false)}
							name={`${userDetails?.firstName} ${userDetails?.lastName} (${userDetails?.email})`}
						/>
					) : (
						<YesNoModal
							show={activeInactiveModal}
							setShow={setActiveInactiveModal}
							handleYes={updateUserStatus}
							handleClose={() => setActiveInactiveModal(false)}
							content={`Are you sure you want to mark ${
								userDetails?.firstName
							} ${userDetails?.lastName} (${userDetails?.email}) ${
								userDetails?.isActive ? 'Active' : 'In-Active'
							}?`}
						/>
					)}
					<YesNoModal
						show={internalModalOpen}
						handleClose={() => setInternalModalOpen(false)}
						setShow={setInternalModalOpen}
						handleYes={handleInternalChange}
						content={`Do you really want to mark ${userDetails?.firstName} ${userDetails?.lastName} as Internal?`}
					/>
				</Row>
			)}
		</div>
	);
};

export default Overview;
