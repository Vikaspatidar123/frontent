import React, { useState } from 'react';
import PropTypes from 'prop-types';

// redux
import { useSelector, useDispatch } from 'react-redux';

// Formik validation
import * as Yup from 'yup';
import { useFormik } from 'formik';

import {
	Row,
	Col,
	Alert,
	Container,
	Form,
	Input,
	FormFeedback,
	Label,
} from 'reactstrap';
import withRouter from '../../../components/Common/withRouter';

// actions
import { loginUser } from '../../../store/actions';

// import images
import { projectName } from '../../../constants/config';
import Banner from './Banner';
import logodark from '../../../assets/images/b2c-gs.png';

const Login = (props) => {
	const [passwordShow, setPasswordShow] = useState(false);

	// meta title
	const {
		router: { navigate },
	} = props;
	document.title = 'Login';
	const dispatch = useDispatch();

	const validation = useFormik({
		// enableReinitialize : use this flag when initial values needs to be changed
		enableReinitialize: true,

		initialValues: {
			user: '',
			password: '',
		},
		validationSchema: Yup.object({
			user: Yup.string().required('Please Enter Your Username or Email'),
			password: Yup.string().required('Please Enter Your Password'),
		}),
		onSubmit: (values) => {
			dispatch(loginUser(values, navigate));
		},
	});

	const { error, loading } = useSelector((state) => state.Login);

	// const signIn = (type) => {
	// 	dispatch(socialLogin(type, navigate));
	// };

	// for facebook and google authentication
	// const socialResponse = (type) => {
	// 	signIn(type);
	// };

	return (
		<div>
			<Container fluid className="p-0">
				<Row className="g-0">
					<Banner />

					<Col xl={3}>
						<div className="auth-full-page-content p-md-5 p-4">
							<div className="w-100">
								<div className="d-flex flex-column h-100">
									<div className="mb-4 mb-md-5">
										<img
											src={logodark}
											alt=""
											height="30"
											className="logo-dark-element"
										/>
										<img
											src={logodark}
											alt=""
											height="30"
											className="logo-light-element"
										/>
									</div>
									<div className="my-auto">
										<div>
											<h5 className="text-primary">Welcome Back !</h5>
											<p className="text-muted">
												Sign in to continue to {projectName}.
											</p>
										</div>

										<div className="mt-4">
											<Form
												className="form-horizontal"
												onSubmit={(e) => {
													e.preventDefault();
													validation.handleSubmit();
													return false;
												}}
											>
												{error ? <Alert color="danger">{error}</Alert> : null}

												<div className="mb-3">
													<Label className="form-label">Email</Label>
													<Input
														name="user"
														className="form-control"
														placeholder="Enter username or email"
														type="text"
														onChange={validation.handleChange}
														onBlur={validation.handleBlur}
														value={validation.values.user || ''}
														invalid={
															!!(
																validation.touched.user &&
																validation.errors.user
															)
														}
													/>
													{validation.touched.user && validation.errors.user ? (
														<FormFeedback type="invalid">
															{validation.errors.user}
														</FormFeedback>
													) : null}
												</div>

												<div className="mb-3">
													<Label className="form-label">Password</Label>
													<div className="input-group auth-pass-inputgroup">
														<Input
															name="password"
															autoComplete="off"
															value={validation.values.password || ''}
															type={passwordShow ? 'text' : 'password'}
															placeholder="Enter Password"
															onChange={validation.handleChange}
															onBlur={validation.handleBlur}
															invalid={
																!!(
																	validation.touched.password &&
																	validation.errors.password
																)
															}
														/>
														<button
															onClick={() => setPasswordShow(!passwordShow)}
															className="btn btn-light border border-secondary border-opacity-25"
															type="button"
															id="password-addon"
														>
															<i className="mdi mdi-eye-outline" />
														</button>
													</div>
													{validation.touched.password &&
													validation.errors.password ? (
														<FormFeedback type="invalid">
															{validation.errors.password}
														</FormFeedback>
													) : null}
												</div>
												<div className="mt-3 d-grid">
													<button
														className="btn btn-primary btn-block"
														type="submit"
														disabled={loading}
													>
														{loading && (
															<i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />
														)}
														Log In
													</button>
												</div>

												{/* <div className="mt-4 text-center">
												<h5 className="font-size-14 mb-3">Sign in with</h5>

												<ul className="list-inline">
													<li className="list-inline-item">
														<Link
															to="#"
															className="social-list-item bg-primary text-white border-primary"
															onClick={(e) => {
																e.preventDefault();
																socialResponse('facebook');
															}}
														>
															<i className="mdi mdi-facebook" />
														</Link>
													</li>
													<li className="list-inline-item">
														<Link
															to="#"
															className="social-list-item bg-danger text-white border-danger"
															onClick={(e) => {
																e.preventDefault();
																socialResponse('google');
															}}
														>
															<i className="mdi mdi-google" />
														</Link>
													</li>
												</ul>
											</div> */}

												{/* <div className="mt-4 text-center">
												<Link to="/forgot-password" className="text-muted">
													<i className="mdi mdi-lock me-1" />
													Forgot your password?
												</Link>
											</div> */}
											</Form>
										</div>
									</div>
									<div className="mt-4 mt-md-5 text-center">
										<p className="mb-0">
											© {new Date().getFullYear()} {projectName}{' '}
											<i className="mdi mdi-heart text-danger" /> by Gammastack
										</p>
									</div>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default withRouter(Login);

Login.defaultProps = {
	navigate: () => {},
	router: {},
	// history: {}
};

Login.propTypes = {
	navigate: PropTypes.func,
	router: PropTypes.objectOf,
	// history: PropTypes.objectOf,
};
