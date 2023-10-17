/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Row, Col, Card } from 'reactstrap';
import { useFormik } from 'formik';
import { CustomInputField } from '../../helpers/customForms';
import { validationSchema } from './formDetails';

const Overview = ({ details, isTenant }) => {
	const formik = useFormik({
		initialValues: {
			firstName: details?.firstName,
			lastName: details?.lastName,
			email: details?.email,
			adminUsername: details?.adminUsername || '',
			phone: isTenant ? details?.phone : '',
			role: details?.SuperadminRole?.name,
			agentName: details?.agentName || '',
			group: details?.group || '',
		},
		validationSchema,
		onSubmit: () => {
			// console.log(values);
		},
	});

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
					<Col>
						<div className="text-end">
							<button type="submit" className="btn btn-success save-user">
								Edit
							</button>
						</div>
					</Col>
				</Row>
			</Card>
		</Form>
	);
};

Overview.defaultProps = {};

export default Overview;
