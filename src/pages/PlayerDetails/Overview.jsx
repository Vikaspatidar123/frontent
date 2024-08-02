/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { isEmpty } from 'lodash';
import {
	Card,
	CardBody,
	Col,
	Dropdown,
	DropdownItem,
	DropdownMenu,
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
import PlayerStats from './components/PlayerStats';
import { PLAYER_STATS_NOT_AVAILABLE } from '../../constants/messages';
import ActionButton from '../../components/Common/ActionButton';

const ColumnContainer = ({ hidden, children }) => (
	<Col xs={12} md={6} className="text-center mb-3" hidden={hidden}>
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

	const { basicInfo, contactInfo, kycInfo, totalPlayerStats, userStatsData } =
		useUserOverview({
			user: userDetails,
		});

	const updateUserStatus = () => {
		dispatch(
			updateSAUserStatus({
				playerId,
				isActive: userDetails?.isActive,
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
				<>
					{!isEmpty(userStatsData) ? (
						<Row className="d-flex m-0 p-0">
							<PlayerStats
								dataColors='["--bs-success","--bs-primary", "--bs-danger","--bs-info", "--bs-warning"]'
								data={totalPlayerStats}
							/>
						</Row>
					) : (
						<Col xl="12">
							<Card>
								<CardBody className="d-flex justify-content-center">
									<h6>{PLAYER_STATS_NOT_AVAILABLE}</h6>
								</CardBody>
							</Card>
						</Col>
					)}
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
												<ActionButton
													className="actionButton w-100"
													variant={
														userDetails?.isActive
															? 'outline-danger'
															: 'outline-success'
													}
													onClick={() => updateUserStatus()}
													iconClass="bx bxs-edit"
												>
													{userDetails && userDetails?.isActive
														? 'Inactive'
														: 'Active'}
												</ActionButton>
											</ColumnContainer>
										)}
										{/* {(isGranted(modules.player, 'U') ||
										userDetails?.tags?.includes('Internal')) && (
										<ColumnContainer
											hidden={userDetails?.tags?.includes('Internal')}
										>
											<ActionButton
												className="actionButton w-100"
												variant="outline-warning"
												onClick={() => openModal('internalModal')}
											>
												Internal
											</ActionButton>
										</ColumnContainer>
									)} */}
										{isGranted(modules.player, 'VE') && (
											<ColumnContainer>
												<ActionButton
													className="actionButton w-100"
													variant="outline-success"
													iconClass="bx bxs-envelope fs-4"
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
													{userDetails?.emailVerified
														? 'Email verified'
														: 'verify email'}
												</ActionButton>
											</ColumnContainer>
										)}
										<ColumnContainer>
											<ActionButton
												variant="outline-warning"
												onClick={() => openModal('manageTagModal')}
												className="actionButton w-100"
												iconClass="bx bxs-purchase-tag-alt fs-4"
											>
												Manage Tag
											</ActionButton>
										</ColumnContainer>

										{/* {isGranted(modules.bonus, 'Issue') && (
										<ColumnContainer>
											<ActionButton
												className="actionButton w-100"
												variant="outline-secondary"
												onClick={() => openModal('giveBonusModal')}
											>
												Give Bonus
											</ActionButton>
										</ColumnContainer>
									)} */}
										{isGranted(modules.player, 'MM') && (
											<ColumnContainer>
												<ActionButton
													className="actionButton w-100"
													variant="outline-success"
													onClick={() => openModal('manageMoneyModal')}
													iconClass="bx bx-money fs-4"
												>
													Manage Money
												</ActionButton>
											</ColumnContainer>
										)}
										<ColumnContainer hidden>
											{userDetails?.trackingToken &&
												userDetails?.isAffiliateUpdated === false && (
													<ActionButton
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
													</ActionButton>
												)}
										</ColumnContainer>
										<ColumnContainer hidden>
											{userDetails?.trackingToken &&
												userDetails?.isAffiliateUpdated &&
												userDetails?.affiliateStatus && (
													<ActionButton
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
													</ActionButton>
												)}
										</ColumnContainer>
										{isGranted(modules.player, 'U') && (
											<ColumnContainer>
												<ActionButton
													className="actionButton w-100"
													variant="outline-warning"
													onClick={() => openModal('editUserModal')}
													iconClass="bx bxs-user-detail fs-4"
												>
													Edit User Info
												</ActionButton>
											</ColumnContainer>
										)}
										{isGranted(modules.player, 'U') && (
											<ColumnContainer>
												<Dropdown
													isOpen={openResetMenu}
													toggle={() => setOpenResetMenu((prev) => !prev)}
												>
													<ActionButton
														className="actionButton w-100"
														variant="outline-warning"
														onClick={() => setOpenResetMenu((prev) => !prev)}
														iconClass="bx bxs-lock-open-alt fs-4"
													>
														Reset Password
													</ActionButton>
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
										<ColumnContainer>
											<ActionButton
												variant="outline-secondary"
												onClick={() => openModal('duplicatesModal')}
												className="actionButton w-100"
												iconClass="bx bx-user-pin fs-4"
											>
												Fraud Detection ({duplicateUsers?.players?.length || 0})
											</ActionButton>
										</ColumnContainer>
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
								userDetails?.isActive ? 'Active' : 'Inactive'
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
							header="Fraud Detection"
						/>
						<GiveBonusModal
							show={modalStates.giveBonusModal}
							toggle={() => closeModal('giveBonusModal')}
							header={`Give Bonus To ${userDetails?.firstName} ${userDetails?.lastName}`}
						/>
						<ManageMoney // header set from manage money modal to use the component on listing page.
							show={modalStates.manageMoneyModal}
							toggle={() => closeModal('manageMoneyModal')}
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
				</>
			)}
		</div>
	);
};

export default Overview;
