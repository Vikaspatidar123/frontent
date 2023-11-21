/* eslint-disable react/prop-types */
import React from 'react';
import { Col, Row } from 'reactstrap';
import {
	permissionIcons,
	permissionLabel,
} from '../../../constants/permissions';
import checkIcon from '../../../assets/images/small/check.svg';

const Permissions = ({ details }) => (
	<Row>
		<Col lg={12}>
			<div className="p-3 card">
				<div className="row">
					{details &&
						Object.keys(details?.userPermission?.permission).map(
							(key) =>
								details?.userPermission?.permission[key]?.length > 0 && (
									<div className="mb-4 col-xl-3 col-lg-4 col-md-6 col-sm-12">
										<div className="permissions-card card card-bg">
											<div className="fw-bold card-header d-flex  align-items-center gap-3 p-0">
												<span className="icon font-size-20 px-3 py-2 icon-bg">
													{permissionIcons()?.[key]}
												</span>
												<span className="text">{`  ${key}`}</span>
											</div>
											<div className="list-group list-group-flush">
												{details?.userPermission?.permission[key].map(
													(permissionKey) => (
														<div
															// justifyContent="space-between"
															className="d-flex justify-content-between align-items-center py-1 px-3 list-group-item"
															key={permissionKey}
														>
															<p className="m-0 p-0">
																{permissionLabel(permissionKey)}
															</p>
															<img
																width={16}
																src={checkIcon}
																className="check-img"
																alt="Check"
															/>
														</div>
													)
												)}
											</div>
										</div>
									</div>
								)
						)}
				</div>
			</div>
		</Col>
	</Row>
);

Permissions.defaultProps = {};

export default Permissions;
