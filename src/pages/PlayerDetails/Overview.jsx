/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Card, Col, Row, Spinner } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useUserOverview from './hooks/useUserOverview';
import DisableReason from './modals/DisableReason';
import YesNoModal from './modals/YesNoModal';
import {
	markUserAsInternal,
	updateSAUserStatus,
	verifyUserEmail,
} from '../../store/actions';
import ManageTagModal from './modals/ManageTagModal';
import Duplicates from './modals/Duplicates';
import GiveBonusModal from './modals/GiveBonus';

const ColumnContainer = ({ hidden, children }) => (
	<Col xs={12} md={6} className="text-center mb-2" hidden={hidden}>
		{children}
	</Col>
);

const Overview = ({ userDetails, userDetailsLoading, duplicateUsers }) => {
	const dispatch = useDispatch();
	const { playerId } = useParams();
	const [modalStates, setModalStates] = useState({
		internalModal: false,
		activeInactiveModal: false,
		verifyEmailModal: false,
		manageTagModal: false,
		duplicatesModal: false,
		giveBonusModal: false,
	});

	const openModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: true }));
	};

	const closeModal = (modalName) => {
		setModalStates((prev) => ({ ...prev, [modalName]: false }));
	};

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

	const handleVerifyEmail = () => {
		dispatch(
			verifyUserEmail({
				isTenant: false,
				userId: parseInt(playerId, 10),
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
									<ColumnContainer>
										<Button
											className="actionButton w-100"
											variant={
												userDetails?.isActive
													? 'outline-danger'
													: 'outline-success'
											}
											// hidden={isHidden({ module: { key: 'Users', value: 'T' } })}
											onClick={() => openModal('activeInactiveModal')}
										>
											{userDetails && userDetails?.isActive
												? 'In-Active'
												: 'Active'}
										</Button>
									</ColumnContainer>
									<ColumnContainer
										hidden={userDetails?.tags?.includes('Internal')}
									>
										<Button
											className="actionButton w-100"
											variant="outline-warning"
											// hidden={
											// isHidden({ module: { key: 'Users', value: 'U' } }) ||
											// userDetails?.tags?.includes('Internal')
											// }
											onClick={() => openModal('internalModal')}
										>
											Internal
										</Button>
									</ColumnContainer>
									<ColumnContainer hidden={userDetails?.isEmailVerified}>
										<Button
											className="actionButton w-100"
											variant="outline-success"
											// hidden={isHidden({ module: { key: 'Users', value: 'EV' } }) || userDetails?.isEmailVerified}
											onClick={() => openModal('verifyEmailModal')}
										>
											Verify Email
										</Button>
									</ColumnContainer>
									<ColumnContainer>
										<Button
											variant="outline-warning"
											onClick={() => openModal('manageTagModal')}
											className="actionButton w-100"
										>
											Manage Tag
										</Button>
									</ColumnContainer>
									<ColumnContainer>
										<Button
											variant="outline-secondary"
											onClick={() => openModal('duplicatesModal')}
											className="actionButton w-100"
										>
											Duplicates ({duplicateUsers?.count})
										</Button>
									</ColumnContainer>
									<ColumnContainer>
										<Button
											className="actionButton w-100"
											variant="outline-secondary"
											// hidden={isHidden({ module: { key: 'Bonus', value: 'Issue' } })}
											onClick={() => openModal('giveBonusModal')}
										>
											Give Bonus
										</Button>
									</ColumnContainer>
									<ColumnContainer>
										<Button
											className="actionButton w-100"
											variant="outline-success"
											// hidden={isHidden({ module: { key: 'Users', value: 'AB' } })}
											// onClick={() => setShowManageMoneyModal(true)}
										>
											Manage Money
										</Button>
									</ColumnContainer>
									<ColumnContainer>
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
									</ColumnContainer>
									<ColumnContainer>
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
									</ColumnContainer>
									<ColumnContainer>
										<Button
											className="actionButton w-100"
											variant="outline-warning"
											// hidden={isHidden({ module: { key: 'Users', value: 'U' } })}
											// onClick={() => setEditModal(true)}
										>
											Edit User Info
										</Button>
									</ColumnContainer>
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
							show={modalStates.activeInactiveModal}
							markUserStatusInactive={updateUserStatus}
							handleClose={() => closeModal('activeInactiveModal')}
							name={`${userDetails?.firstName} ${userDetails?.lastName} (${userDetails?.email})`}
						/>
					) : (
						<YesNoModal
							show={modalStates.activeInactiveModal}
							handleYes={updateUserStatus}
							handleClose={() => closeModal('activeInactiveModal')}
							content={`Are you sure you want to mark ${
								userDetails?.firstName
							} ${userDetails?.lastName} (${userDetails?.email}) ${
								userDetails?.isActive ? 'Active' : 'In-Active'
							}?`}
						/>
					)}
					<YesNoModal
						show={modalStates.internalModal}
						handleClose={() => closeModal('internalModal')}
						handleYes={handleInternalChange}
						content={`Do you really want to mark ${userDetails?.firstName} ${userDetails?.lastName} as Internal?`}
					/>
					<YesNoModal
						show={modalStates.verifyEmailModal}
						handleClose={() => closeModal('verifyEmailModal')}
						handleYes={handleVerifyEmail}
						content={`Do you really want to mark ${userDetails?.firstName} ${userDetails?.lastName} (${userDetails?.email}) as Verified?`}
					/>
					<ManageTagModal
						show={modalStates.manageTagModal}
						userDetails={userDetails}
						handleClose={() => closeModal('manageTagModal')}
					/>
					<Duplicates
						show={modalStates.duplicatesModal}
						toggle={() => closeModal('duplicatesModal')}
						header="Duplicates"
					/>
					<GiveBonusModal
						show={modalStates.giveBonusModal}
						toggle={() => closeModal('giveBonusModal')}
						header={`Give Bonus To ${userDetails?.firstName} ${userDetails?.lastName}`}
					/>
				</Row>
			)}
		</div>
	);
};

export default Overview;
