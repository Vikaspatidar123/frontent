/* eslint-disable react/prop-types */
import React from 'react';

import { Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import Box from '@mui/material/Box';
import { permissionIcons, permissionLabel } from './formDetails';

const Permissions = ({ details }) => (
	<Row>
		{details &&
			Object.keys(details?.userPermission?.permission).map(
				(key) =>
					details?.userPermission?.permission[key]?.length > 0 && (
						<Col md={6} xl={3} key={key}>
							<Card className="p-3">
								<Box display="inline-flex" justifyContent="start" p={2} gap={2}>
									<span>{permissionIcons()?.[key]}</span>
									<CardTitle>{key}</CardTitle>
								</Box>
								<CardBody>
									{details?.userPermission?.permission[key].map(
										(permissionKey) => (
											<CardText>
												<Box display="flex" justifyContent="space-between">
													<span>{permissionLabel(permissionKey)}</span>
													<img
														width={16}
														src="src/assets/images/small/check.svg"
														className="check-img"
														alt="Check"
													/>
												</Box>
											</CardText>
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
