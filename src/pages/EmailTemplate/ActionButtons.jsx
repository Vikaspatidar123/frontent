/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { makeEmailTemplatePrimary } from '../../store/emailTemplate/actions';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({
	id,
	eventType,
	isDefault,
	handleEditClick,
	handleViewClick,
	handleDeleteClick,
}) => {
	const { isGranted } = usePermission();
	const dispatch = useDispatch();
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Button
					hidden={!isGranted(modules.emailTemplate, 'U')}
					className="btn btn-sm btn-soft-success"
					onClick={(e) => {
						e.preventDefault();
						dispatch(
							makeEmailTemplatePrimary({
								data: {
									emailTemplateId: parseInt(id, 10),
									eventType,
								},
							})
						);
					}}
				>
					<i className="mdi mdi-check-all" id={`primary-${id}`} />
					<UncontrolledTooltip placement="top" target={`primary-${id}`}>
						Make Template Primary
					</UncontrolledTooltip>
				</Button>
			</li>

			<li data-bs-toggle="tooltip" data-bs-placement="top">
				<Button
					className="btn btn-sm btn-soft-primary"
					onClick={(e) => handleViewClick(e, id)}
				>
					<i className="mdi mdi-eye-outline" id={`viewtooltip-${id}`} />
					<UncontrolledTooltip placement="top" target={`viewtooltip-${id}`}>
						View
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.emailTemplate, 'U')}
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEditClick(e, id)}
				>
					<i className="mdi mdi-pencil-outline" id={`edit-${id}`} />
					<UncontrolledTooltip placement="top" target={`edit-${id}`}>
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.emailTemplate, 'D')}
					className="btn btn-sm btn-soft-danger"
					onClick={(e) => handleDeleteClick(e, id, eventType)}
					disabled={isDefault}
				>
					<i className="mdi mdi-delete-outline" id={`delete-${id}`} />
					<UncontrolledTooltip placement="top" target={`delete-${id}`}>
						Delete
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	handleEditClick: PropTypes.func.isRequired,
	handleViewClick: PropTypes.func.isRequired,
	handleDeleteClick: PropTypes.func.isRequired,
	id: PropTypes.number.isRequired,
	eventType: PropTypes.string.isRequired,
	isDefault: PropTypes.bool.isRequired,
};

export default ActionButtons;
