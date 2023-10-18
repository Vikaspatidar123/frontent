/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Form, Row, Col, Card, Button } from 'reactstrap';
import { useFormik } from 'formik';
import { CustomInputField } from '../../helpers/customForms';
import { adminProfileSchema } from './formDetails';

const Overview = ({
	details,
	isTenant,
	isEditable,
	setIsEditable,
	updateData,
}) => {
	const formik = useFormik({
		initialValues: {
			firstName: details?.firstName,
			lastName: details?.lastName,
			email: details?.email,
			adminUsername: details?.adminUsername || '',
			phone: isTenant ? details?.phone : '',
			role:
				details?.AdminRole?.name === 'Super Admin'
					? 'Admin'
					: details?.SuperadminRole?.name,
			agentName: details?.agentName || '',
			group: details?.group || '',
		},
		validationSchema: adminProfileSchema,
		onSubmit: (values) => {
			updateData({
				...values,
				id: details?.adminUserId,
				// superAdminId: isTenant ? '' : details?.superAdminUserId,
				// adminUserId: isTenant ? details?.adminUserId : ''
			});
		},
	});

	useEffect(() => {
		if (details) {
			formik.resetForm({
				values: {
					firstName: details?.firstName,
					lastName: details?.lastName,
					email: details?.email,
					adminUsername: details?.adminUsername || '',
					phone: isTenant ? details?.phone : '',
					role:
						details?.AdminRole?.name === 'Super Admin'
							? 'Admin'
							: details?.SuperadminRole?.name,
					agentName: details?.agentName || '',
					group: details?.group || '', // to be updated
				},
			});
		}
	}, [details]);

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Card className="p-3">
				<Row>
					<Col lg={6}>
						<CustomInputField
							className="mb-2"
							label="First Name"
							name="firstName"
							type="text"
							onChange={formik.handleChange}
							disabled={!isEditable}
							onBlur={formik.handleBlur}
							placeholder="Enter First Name"
							validate={{ required: { value: true } }}
							value={formik.values?.firstName || ''}
							invalid={
								!!(formik.touched?.firstName && formik.errors?.firstName)
							}
							isError
							errorMsg={formik.touched?.firstName && formik.errors?.firstName}
						/>
						<CustomInputField
							className="mb-2"
							label="Email"
							name="email"
							type="text"
							disabled
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter Email"
							validate={{ required: { value: true } }}
							value={formik.values?.email || ''}
							invalid={!!(formik.touched?.email && formik.errors?.email)}
							isError
							errorMsg={formik.touched?.email && formik.errors?.email}
						/>

						<CustomInputField
							className="mb-2"
							label="Role"
							name="role"
							type="text"
							disabled
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter Role"
							validate={{ required: { value: true } }}
							value={formik.values?.role || ''}
							invalid={!!(formik.touched?.role && formik.errors?.role)}
							isError
							errorMsg={formik.touched?.role && formik.errors?.role}
						/>
					</Col>
					<Col lg={6}>
						<CustomInputField
							className="mb-2"
							label="Last Name"
							name="lastName"
							type="text"
							disabled={!isEditable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter Last Name"
							validate={{ required: { value: true } }}
							value={formik.values?.lastName || ''}
							invalid={!!(formik.touched?.lastName && formik.errors?.lastName)}
							isError
							errorMsg={formik.touched?.lastName && formik.errors?.lastName}
						/>

						<CustomInputField
							className="mb-2"
							label="userName"
							name="adminUsername"
							type="text"
							disabled
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter User Name"
							validate={{ required: { value: true } }}
							value={formik.values?.adminUsername || ''}
							invalid={
								!!(
									formik.touched?.adminUsername && formik.errors?.adminUsername
								)
							}
							isError
							errorMsg={
								formik.touched?.adminUsername && formik.errors?.adminUsername
							}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="text-end">
						<Button
							color="primary"
							className="btn btn-primary waves-effect waves-light"
							hidden={isEditable}
							onClick={() => setIsEditable(true)}
						>
							Edit
						</Button>
					</Col>
				</Row>
				<Row>
					<Col className="text-end">
						<Button
							color="primary"
							className="btn btn-primary waves-effect waves-light"
							hidden={!isEditable}
							type="submit"
						>
							Submit
						</Button>
					</Col>
				</Row>
			</Card>
		</Form>
	);
};

Overview.defaultProps = {};

export default Overview;
