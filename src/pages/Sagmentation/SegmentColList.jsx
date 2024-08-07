/* eslint-disable react/prop-types */

import React from 'react';
import { Badge, Button, UncontrolledTooltip } from 'reactstrap';
import { Link } from 'react-router-dom';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const KeyValueCellNA = ({ value }) => value ?? '-';

const IsActive = ({ value }) => {
	switch (value) {
		case true:
			return <Badge className="bg-success">Active</Badge>;
		case false:
			return <Badge className="bg-danger">Inactive</Badge>;
		default:
			return '';
	}
};

const Segment = ({ cell }) =>
	cell.value ? (
		<Link to="/players" state={{ Segment: cell?.row?.original }}>
			{cell.value}
		</Link>
	) : (
		''
	);

const ActionButtons = ({ onClickEdit, row, handleDelete }) => {
	const { isGranted } = usePermission();
	const tegId = row?.original?.id;
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
			<li>
				<Button
					hidden={!isGranted(modules.tag, 'D')}
					id="deleteToolTip"
					className="btn btn-sm btn-soft-danger"
					onClick={() => handleDelete(tegId)}
				>
					<i className="mdi mdi-delete-outline" />
					<UncontrolledTooltip placement="top" target="deleteToolTip">
						Delete
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

export { KeyValueCellNA, IsActive, ActionButtons, Segment };
