/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import { makeEmailTemplatePrimary } from '../../store/emailTemplate/actions';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({
	row: { original },
	handleEditClick,
	handleViewClick,
	handleDeleteClick,
}) => {
	const { isGranted } = usePermission();
	const dispatch = useDispatch();
	const emailTemplateId = original?.emailTemplateId;
	const type = original?.type;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Button
					hidden={!isGranted(modules.EmailTemplate, 'U')}
					className="btn btn-sm btn-soft-success"
					onClick={(e) => {
						e.preventDefault();
						dispatch(
							makeEmailTemplatePrimary({
								data: {
									emailTemplateId,
									type,
								},
							})
						);
					}}
				>
					<i className="mdi mdi-check-all" id={`primary-${emailTemplateId}`} />
					<UncontrolledTooltip
						placement="top"
						target={`primary-${emailTemplateId}`}
					>
						Make Template Primary
					</UncontrolledTooltip>
				</Button>
			</li>

			<li data-bs-toggle="tooltip" data-bs-placement="top">
				<Button
					className="btn btn-sm btn-soft-primary"
					onClick={(e) => handleViewClick(e, emailTemplateId)}
				>
					<i
						className="mdi mdi-eye-outline"
						id={`viewtooltip-${emailTemplateId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`viewtooltip-${emailTemplateId}`}
					>
						View
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.EmailTemplate, 'U')}
					className="btn btn-sm btn-soft-info"
					onClick={(e) => handleEditClick(e, emailTemplateId)}
				>
					<i
						className="mdi mdi-pencil-outline"
						id={`edit-${emailTemplateId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`edit-${emailTemplateId}`}
					>
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.EmailTemplate, 'D')}
					className="btn btn-sm btn-soft-danger"
					onClick={(e) => handleDeleteClick(e, emailTemplateId, type)}
				>
					<i
						className="mdi mdi-delete-outline"
						id={`delete-${emailTemplateId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`delete-${emailTemplateId}`}
					>
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
	row: PropTypes.shape({
		original: PropTypes.shape({
			emailTemplateId: PropTypes.number.isRequired,
			type: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
};

export default ActionButtons;
