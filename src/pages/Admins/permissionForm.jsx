import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { permissionIcons } from './formDetails';
import { showSnackbar } from '../../store/snackbar/actions';
import { CustomInputField } from '../../helpers/custom_forms';

const PermissionForm = ({
	values,
	adminDetails,
	superAdminUser,
	permissionLabel,
	validation,
}) => {
	const dispatch = useDispatch();
	const permissions = (
		values.role === 'Manager' ? adminDetails : superAdminUser
	)?.userPermission?.permission;

	const handleChangeCheckbox = (e, key) => {
		if (e.target.value === 'R' || values?.permission?.[key]?.includes('R')) {
			if (e.target.value === 'R' && !e.target.checked) {
				// eslint-disable-next-line no-param-reassign
				delete values.permission[key];
				validation.setFieldValue('permission', values.permission);
			} else {
				validation.handleChange(e);
			}
		} else {
			dispatch(
				showSnackbar({
					message:
						'Please Select Read Permission Before Selecting Other For This Module',
					type: 'error',
				})
			);
		}
	};
	return (
		<>
			<h4 className="title-text">Permissions</h4>
			<div className="row">
				{(['Super Admin', 'Admin'].includes(values?.role) || values.adminId) &&
					(values.role === 'Manager' ? adminDetails : superAdminUser)
						?.userPermission && (
						<>
							{Object.keys(permissions || {}).map((key) =>
								values.role === 'Manager' && key === 'Admins' ? null : (
									<div className="mb-4 col-lg-12 col-md-6 col-sm-6">
										<div className="permissions-card card">
											<div className="fw-bold card-header">
												<span className="icon">{permissionIcons()?.[key]}</span>
												<span className="text">{key}</span>
											</div>
											<div className="list-group list-group-flush">
												{permissions[key].map((value) => (
													<div className="d-flex justify-content-between align-items-center py-1 px-3 list-group-item">
														<small>{permissionLabel(value)}</small>
														<div className="form-check">
															{/* <label className='form-check-label' /> */}
															{permissions[key].includes('R') ? (
																<CustomInputField
																	type="checkbox"
																	value={value}
																	checked={
																		!!values?.permission[key]?.includes(value)
																	}
																	// checked={false}
																	id={`${key}-permission[${value}]`}
																	name={`permission[${key}]`}
																	onChange={(e) => handleChangeCheckbox(e, key)}
																/>
															) : (
																<CustomInputField
																	type="checkbox"
																	value={value}
																	checked={
																		!!values?.permission[key]?.includes(value)
																	}
																	// checked={false}
																	id={`${key}-permission[${value}]`}
																	name={`permission[${key}]`}
																	onChange={validation.handleChange}
																/>
															)}
														</div>
													</div>
												))}
											</div>
										</div>
									</div>
								)
							)}
						</>
					)}
			</div>
		</>
	);
};

PermissionForm.defaultProps = {};

PermissionForm.propTypes = {
	values: PropTypes.objectOf.isRequired,
	adminDetails: PropTypes.objectOf.isRequired,
	superAdminUser: PropTypes.objectOf.isRequired,
	permissionLabel: PropTypes.func.isRequired,
	validation: PropTypes.objectOf.isRequired,
};

export default PermissionForm;
