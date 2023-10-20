/* eslint-disable react/prop-types */
import React from 'react';
import { Row, Col, Card, CardBody, CardTitle } from 'reactstrap';
import { permissionIcons, permissionLabel } from '../../constants/permissions';

const Permissions = ({ details }) => (
	<Row>
		{details &&
			Object.keys(details?.userPermission?.permission).map(
				(key) =>
					details?.userPermission?.permission[key]?.length > 0 && (
						<Col md={6} xl={3} key={key}>
							<Card className="p-3">
								<div
									display="inline-flex"
									className="justify-content-start p-2 m-2 d-flex"
								>
									<span className="icon font-size-20">
										{permissionIcons()?.[key]}
									</span>
									<CardTitle>{`  ${key}`}</CardTitle>
								</div>
								<CardBody>
									{details?.userPermission?.permission[key].map(
										(permissionKey) => (
											<div
												// justifyContent="space-between"
												className="d-flex justify-content-between"
												key={permissionKey}
											>
												<span>{permissionLabel(permissionKey)}</span>
												<img
													width={16}
													src="src/assets/images/small/check.svg"
													className="check-img"
													alt="Check"
												/>
											</div>
										)
									)}
								</CardBody>
							</Card>
						</Col>
					)
			)}
	</Row>
);

Permissions.defaultProps = {};

export default Permissions;
