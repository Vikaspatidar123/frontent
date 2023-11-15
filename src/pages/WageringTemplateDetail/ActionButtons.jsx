/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const ActionButtons = ({ cell, handleEdit, handleView }) => {
	const { isGranted } = usePermission();
	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top">
				<Button
					hidden={!isGranted(modules.WageringTemplate, 'R')}
					className="btn btn-sm btn-soft-primary"
					onClick={(e) => {
						e.preventDefault();
						handleView(cell?.row?.original);
					}}
				>
					<i className="mdi mdi-eye-outline" id={`view-${cell?.row?.id}`} />
					<UncontrolledTooltip placement="top" target={`view-${cell?.row?.id}`}>
						View
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					hidden={!isGranted(modules.WageringTemplate, 'U')}
					className="btn btn-sm btn-soft-info"
					onClick={(e) => {
						e.preventDefault();
						handleEdit(cell?.row?.original);
					}}
				>
					<i className="mdi mdi-pencil-outline" id={`edit-${cell?.row?.id}`} />
					<UncontrolledTooltip placement="top" target={`edit-${cell?.row?.id}`}>
						Edit
					</UncontrolledTooltip>
				</Button>
			</li>

			{/* <li>
        <Link to="#" className="btn btn-sm btn-soft-dark">
          <i className="mdi mdi-content-copy" id="deletetooltip" />
          <UncontrolledTooltip placement="top" target="deletetooltip">
            Clone
          </UncontrolledTooltip>
        </Link>
      </li> */}
		</ul>
	);
};

export default ActionButtons;
