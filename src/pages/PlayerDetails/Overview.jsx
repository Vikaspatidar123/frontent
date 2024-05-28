/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import {
	Button,
	Card,
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	Row,
	Spinner,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useUserOverview from './hooks/useUserOverview';
// import DisableReason from './modals/DisableReason';
import YesNoModal from './modals/YesNoModal';
import {
	markUserAsInternal,
	sendPasswordReset,
	updateSAUserStatus,
	verifyUserEmail,
} from '../../store/actions';
import ManageTagModal from './modals/ManageTagModal';
import Duplicates from './modals/Duplicates';
import GiveBonusModal from './modals/GiveBonus';
import ManageMoney from './modals/ManageMoney';
import UpdateUserInfo from './modals/UpdateUserInfo';
import ResetUserPassword from './modals/ResetUserPassword';
import { modules } from '../../constants/permissions';
import usePermission from '../../components/Common/Hooks/usePermission';
import { showToastr } from '../../utils/helpers';

const ColumnContainer = ({ hidden, children }) => (
	<Col xs={12} md={6} className="text-center mb-2" hidden={hidden}>
		{children}
	</Col>
);

const Overview = ({ userDetails, userDetailsLoading, duplicateUsers }) => {
	const { isGranted } = usePermission();
	const dispatch = useDispatch();
	const { playerId } = useParams();
	const [openResetMenu, setOpenResetMenu] = useState(false);
	const [modalStates, setModalStates] = useState({
		internalModal: false,
		activeInactiveModal: false,
		verifyEmailModal: false,
		manageTagModal: false,
		duplicatesModal: false,
		giveBonusModal: false,
		editUserModal: false,
		resetPasswordEmail: false,
		resetUserPassword: false,
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

	const updateUserStatus = () => {
		dispatch(
			updateSAUserStatus({
				userId: playerId,
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
				userId: playerId,
			})
		);
	};

	const handleSendResetPasswordEmail = () => {
		dispatch(
			sendPasswordReset({
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
													<span className={`${subValue} px-2 email-ellipsis`}>
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
									{isGranted(modules.player, 'TS') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant={
													userDetails?.isActive
														? 'outline-danger'
														: 'outline-success'
												}
												onClick={() => updateUserStatus()}
											>
												{userDetails && userDetails?.isActive
													? 'In-Active'
													: 'Active'}
											</Button>
										</ColumnContainer>
									)}
									{/* {(isGranted(modules.player, 'U') ||
										userDetails?.tags?.includes('Internal')) && (
										<ColumnContainer
											hidden={userDetails?.tags?.includes('Internal')}
										>
											<Button
												className="actionButton w-100"
												variant="outline-warning"
												onClick={() => openModal('internalModal')}
											>
												Internal
											</Button>
										</ColumnContainer>
									)} */}
									{isGranted(modules.player, 'VE') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant="outline-success"
												onClick={() => {
													if (userDetails?.emailVerified) {
														showToastr({
															message: 'Email already verified',
															type: 'info',
														});
													} else {
														openModal('verifyEmailModal');
													}
												}}
											>
												Verify Email
											</Button>
										</ColumnContainer>
									)}
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
											Duplicates ({duplicateUsers?.players?.length || 0})
										</Button>
									</ColumnContainer>
									{/* {isGranted(modules.bonus, 'Issue') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant="outline-secondary"
												onClick={() => openModal('giveBonusModal')}
											>
												Give Bonus
											</Button>
										</ColumnContainer>
									)} */}
									{isGranted(modules.player, 'MM') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant="outline-success"
												onClick={() => openModal('manageMoneyModal')}
											>
												Manage Money
											</Button>
										</ColumnContainer>
									)}
									<ColumnContainer hidden>
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
									<ColumnContainer hidden>
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
									{isGranted(modules.player, 'U') && (
										<ColumnContainer>
											<Button
												className="actionButton w-100"
												variant="outline-warning"
												onClick={() => openModal('editUserModal')}
											>
												Edit User Info
											</Button>
										</ColumnContainer>
									)}
									{isGranted(modules.player, 'U') && (
										<ColumnContainer>
											<Dropdown
												isOpen={openResetMenu}
												toggle={() => setOpenResetMenu((prev) => !prev)}
											>
												<DropdownToggle
													id="dropdown-autoclose-outside"
													className="actionButton w-100"
													variant="outline-success"
												>
													Reset Password
												</DropdownToggle>

												<DropdownMenu className="dropdown-menu-end">
													<DropdownItem
														onClick={() => openModal('resetPasswordEmail')}
													>
														Send Email
													</DropdownItem>
													<DropdownItem
														onClick={() => openModal('resetUserPassword')}
													>
														Reset Password
													</DropdownItem>
												</DropdownMenu>
											</Dropdown>
										</ColumnContainer>
									)}
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

								{/* <h5 className="px-2 mx-1 mt-2">
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
								</div> */}

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
					{/* {userDetails?.isActive ? (
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
					)} */}
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
					<ManageMoney
						show={modalStates.manageMoneyModal}
						toggle={() => closeModal('manageMoneyModal')}
						header={`Manage Money for '${userDetails?.firstName} ${userDetails?.lastName}'`}
					/>
					<UpdateUserInfo
						show={modalStates.editUserModal}
						toggle={() => closeModal('editUserModal')}
						header={`Update ${userDetails?.firstName} ${userDetails?.lastName} (${userDetails?.email}) Info`}
					/>
					<YesNoModal
						show={modalStates.resetPasswordEmail}
						handleClose={() => closeModal('resetPasswordEmail')}
						handleYes={handleSendResetPasswordEmail}
						content={`Send Password Reset Email to ${userDetails?.firstName} ${userDetails?.lastName} (${userDetails?.email})`}
					/>
					<ResetUserPassword
						show={modalStates.resetUserPassword}
						toggle={() => closeModal('resetUserPassword')}
						headerText={`Reset Password for ${userDetails?.firstName} ${userDetails?.lastName} (${userDetails?.email})`}
					/>
				</Row>
			)}
		</div>
	);
};

export default Overview;
