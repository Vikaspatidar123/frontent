import React from 'react';
import { Form, Row, Col, Card } from 'reactstrap';
import { useFormik } from 'formik';
import { CustomInputField } from '../../helpers/customForms';
import { profilePasswordSchema } from './formDetails';

const Password = () => {
	const formik = useFormik({
		initialValues: {
			password: '',
			newPassword: '',
			confirmPassword: '',
		},
		validationSchema: profilePasswordSchema,
		onSubmit: () => {
			// console.log(values);
		},
	});

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Card className="p-3">
				<Row className="justify-content-center">
					<Col lg={6}>
						<CustomInputField
							className="mb-2"
							label="OLD PASSWORD"
							name="password"
							type="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							validate={{ required: { value: true } }}
							value={formik.values?.password || ''}
							invalid={!!(formik.touched?.password && formik.errors?.password)}
							isError
							errorMsg={formik.touched?.password && formik.errors?.password}
						/>
						<CustomInputField
							className="mb-2"
							label="NEW PASSWORD"
							name="newPassword"
							type="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							validate={{ required: { value: true } }}
							value={formik.values?.newPassword || ''}
							invalid={
								!!(formik.touched?.newPassword && formik.errors?.newPassword)
							}
							isError
							errorMsg={
								formik.touched?.newPassword && formik.errors?.newPassword
							}
						/>
						<CustomInputField
							className="mb-2"
							label="CONFIRM PASSWORD "
							name="confirmPassword"
							type="password"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							validate={{ required: { value: true } }}
							value={formik.values?.confirmPassword || ''}
							invalid={
								!!(
									formik.touched?.confirmPassword &&
									formik.errors?.confirmPassword
								)
							}
							isError
							errorMsg={
								formik.touched?.confirmPassword &&
								formik.errors?.confirmPassword
							}
						/>

						<Row>
							<Col>
								<div className="text-start mt-2">
									<button type="submit" className="btn btn-success save-user">
										Submit
									</button>
								</div>
							</Col>
						</Row>
					</Col>
				</Row>
			</Card>
		</Form>
	);
};

Password.defaultProps = {};

export default Password;
