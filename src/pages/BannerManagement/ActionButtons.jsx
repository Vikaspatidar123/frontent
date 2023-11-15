/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ onClickEdit, onClickDelete, cell }) => {
	const { isGranted } = usePermission();
	const key = cell?.row?.original?.key;
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Button
					hidden={!isGranted(modules.BannerManagement, 'U')}
					onClick={(e) => {
						e.preventDefault();
						onClickEdit(cell?.row?.original);
					}}
					className="btn btn-sm btn-soft-info"
				>
					<i className="mdi mdi-pencil-outline" id={`edit-${cell?.row?.id}`} />
					<UncontrolledTooltip placement="top" target={`edit-${cell?.row?.id}`}>
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.BannerManagement, 'D')}
					className="btn btn-sm btn-soft-danger"
					onClick={(e) => {
						e.preventDefault();
						onClickDelete(key);
					}}
				>
					<i
						className="mdi mdi-delete-outline"
						id={`delete-${cell?.row?.id}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`delete-${cell?.row?.id}`}
					>
						Delete
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	onClickDelete: PropTypes.func.isRequired,
	onClickEdit: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
