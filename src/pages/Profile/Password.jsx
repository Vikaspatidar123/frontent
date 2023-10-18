/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Row, Col, Card } from 'reactstrap';
import { useFormik } from 'formik';
import { Buffer } from 'buffer';
import { CustomInputField } from '../../helpers/customForms';
import { profilePasswordSchema } from './formDetails';
import { resetProfilePasswordStart } from '../../store/actions';
import Spinners from '../../components/Common/Spinner';

const Password = ({ loading, isTenant }) => {
	const dispatch = useDispatch();
	const formik = useFormik({
		initialValues: {
			password: '',
			newPassword: '',
			confirmPassword: '',
		},
		validationSchema: profilePasswordSchema,
		onSubmit: (values) => {
			dispatch(
				resetProfilePasswordStart({
					data: {
						password: values?.password
							? Buffer.from(values?.password).toString('base64')
							: '',
						newPassword: values?.newPassword
							? Buffer.from(values?.newPassword).toString('base64')
							: '',
					},
					isTenant,
				})
			);
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
										{loading && <Spinners />}
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
