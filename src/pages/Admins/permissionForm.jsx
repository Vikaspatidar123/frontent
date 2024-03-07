import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CustomInputField } from '../../helpers/customForms';
import { showToastr } from '../../utils/helpers';
import { permissionIcons, permissionLabel } from '../../constants/permissions';
import { initialValueInstance } from './formDetails';

const PermissionForm = ({
	values,
	adminDetails,
	superAdminUser,
	validation,
	isEdit,
}) => {
	const dispatch = useDispatch();
	const permissions = (
		values.role === 'Support' && !isEdit ? adminDetails : superAdminUser
	)?.permission?.permission;

	const handleChangeCheckbox = (e, key) => {
		e.preventDefault();
		if (e.target.value === 'R' || values?.permission?.[key]?.includes('R')) {
			if (e.target.value === 'R' && !e.target.checked) {
				// eslint-disable-next-line no-param-reassign
				delete values.permission[key];
				validation.setFieldValue('permission', values.permission);
				validation.handleChange(e);
			} else {
				validation.handleChange(e);
			}
		} else {
			dispatch(
				showToastr({
					message:
						'Please Select Read Permission Before Selecting Other For This Module',
					type: 'error',
				})
			);
		}
	};
	return (
		(['Manager', 'Support'].includes(values?.role) || values.adminId) &&
		(values.role === 'Support' ? adminDetails : superAdminUser)?.permission && (
			<>
				<h4 className="title-text">Permissions</h4>
				<div className="row">
					{Object.keys(permissions || {}).map((key) =>
						values.role === 'Support' && key === 'Admins' ? null : (
							<div className="mb-4 col-xl-3 col-lg-4 col-md-6 col-sm-12">
								<div className="permissions-card card card-bg">
									<div className="fw-bold card-header d-flex  align-items-center gap-3 p-0">
										<span className="icon font-size-20 px-3 py-2 icon-bg">
											{permissionIcons()?.[key]}
										</span>
										<span className="text text-capitalized">{`  ${key}`}</span>
									</div>
									<div className="list-group">
										{permissions[key].map((value) => (
											<div className="d-flex justify-content-between align-items-center py-1 px-3 list-group-item">
												<p className="m-0 p-0">{permissionLabel(value)}</p>
												<div className="form-check">
													{permissions[key].includes('R') ? (
														<CustomInputField
															type="checkbox"
															value={value}
															checked={
																!!values?.permission[key]?.includes(value)
															}
															id={`${key}-permission[${value}]`}
															name={`permission[${key}]`}
															onChange={(e) => {
																handleChangeCheckbox(e, key);
															}}
														/>
													) : (
														<CustomInputField
															type="checkbox"
															value={value}
															checked={
																!!values?.permission[key]?.includes(value)
															}
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
				</div>
			</>
		)
	);
};

PermissionForm.defaultProps = {
	isEdit: false,
	values: {},
	// adminDetails : {},
	// superAdminUser : {},
};

PermissionForm.propTypes = {
	values: PropTypes.shape(initialValueInstance),
	adminDetails: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		.isRequired,
	superAdminUser: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		.isRequired,
	validation: PropTypes.objectOf.isRequired,
	isEdit: PropTypes.bool,
};

export default PermissionForm;
