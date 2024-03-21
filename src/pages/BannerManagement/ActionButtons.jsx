/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ onClickEdit, row }) => {
	const { isGranted } = usePermission();
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Button
					hidden={!isGranted(modules.banner, 'U')}
					onClick={(e) => {
						e.preventDefault();
						onClickEdit(row?.original);
					}}
					className="btn btn-sm btn-soft-info"
				>
					<i className="mdi mdi-pencil-outline" id={`edit-${row?.id}`} />
					<UncontrolledTooltip placement="top" target={`edit-${row?.id}`}>
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	onClickEdit: PropTypes.func.isRequired,
	row: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
