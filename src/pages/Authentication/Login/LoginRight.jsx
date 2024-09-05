import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
    Row,
    Col,
    Container,
    Form,
    Input,
    FormFeedback,
    Label,
    Button,
    Card,
    CardBody,
} from 'reactstrap';
import withRouter from '../../../components/Common/withRouter';
import './style.scss'
import Banner from './Banner';
// actions
import { loginUser } from '../../../store/actions';

const styles = {
    pageContainer: {
        backgroundColor: '#000',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        borderRadius: '25px',
        backgroundColor: '#fff', // Card background
        padding: '20px',
    },
};

const Login = (props) => {
    const [passwordShow, setPasswordShow] = useState(false);

    // meta title
    const {
        router: { navigate },
    } = props;
    document.title = 'Login';

    const dispatch = useDispatch();

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            emailOrUsername: '',
            password: '',
        },
        validationSchema: Yup.object({
            emailOrUsername: Yup.string().required(
                'Please Enter Your Username or Email'
            ),
            password: Yup.string().required('Please Enter Your Password'),
        }),
        onSubmit: (values) => {
            dispatch(loginUser(values, navigate));
        },
    });

    const { loading } = useSelector((state) => state.Login);

    return (
        <div style={styles.pageContainer}>
            <Container fluid >
                <Row className="justify-content-center">
                    <Col xs={12} md={8} lg={6} style={{ width: '93%', height: '80vh' }}>
                        <Card className="shadow-lg" style={{ ...styles.card, height: '100%' }}>
                            <CardBody>
                                <Row style={{height:'100%', marginLeft:'23px',marginRight:'20px'}}>
                                    <Col
                                        md={6}
										xs={12}
                                        className="d-flex align-items-center "
                                        style={{ width: '' }}
                                    >
                                        <div className="input_box_card">
                                            <div className="text-start">
                                                <h2 className="text-primary">Hey, Hello 👋</h2>
                                                <p className="text-muted">
                                                    Enter the information you entered while registering.
                                                </p>
                                            </div>

                                            <Form
                                                className="form-horizontal"
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                            >
                                                <div className="mb-3">
                                                    <Label className="form-label">Email</Label>
                                                    <Input
                                                        name="emailOrUsername"
                                                        className="form-control"
                                                        type="text"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.emailOrUsername || ''}
                                                        invalid={
                                                            !!(
                                                                validation.touched.emailOrUsername &&
                                                                validation.errors.emailOrUsername
                                                            )
                                                        }
                                                    />
                                                    {validation.touched.emailOrUsername &&
                                                    validation.errors.emailOrUsername ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.emailOrUsername}
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
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            invalid={
                                                                !!(
                                                                    validation.touched.password &&
                                                                    validation.errors.password
                                                                )
                                                            }
                                                        />
                                                        <Button
                                                            onClick={() => setPasswordShow(!passwordShow)}
                                                            className="border border-secondary border-opacity-25"
                                                            color="light"
                                                            id="password-addon"
                                                        >
                                                            {passwordShow ? (
                                                                <i className="mdi mdi-eye-outline" />
                                                            ) : (
                                                                <i className="mdi mdi-eye-off-outline" />
                                                            )}
                                                        </Button>
                                                    </div>
                                                    {validation.touched.password &&
                                                    validation.errors.password ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.password}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                <div className="mt-3 d-grid">
                                                    <Button
                                                        className="btn-block"
                                                        color="primary"
                                                        type="submit"
                                                        disabled={loading}
                                                    >
                                                        {loading && (
                                                            <i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />
                                                        )}
                                                        Sign In
                                                    </Button>
                                                </div>
                                            </Form>
                                        </div>
                                    </Col>

                                    {/* Right Column - Banner */}
                                    <Col xs={12} md={6} className="d-none d-md-flex align-items-center">
                                        <Banner />
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
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
};

Login.propTypes = {
    navigate: PropTypes.func,
    router: PropTypes.shape({
        location: PropTypes.shape({
            pathname: PropTypes.string.isRequired,
            search: PropTypes.string.isRequired,
        }).isRequired,
        navigate: PropTypes.func.isRequired,
    }),
};