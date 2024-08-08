import React from 'react';
import PropTypes from 'prop-types';
import {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
	UncontrolledDropdown,
} from 'reactstrap';

const Actions = ({ cell, actionsList }) => (
	<UncontrolledDropdown>
		<DropdownToggle className="btn btn-outline-primary" color="" type="button">
			Actions <i className="mdi mdi-chevron-down" />
		</DropdownToggle>
		<DropdownMenu>
			{actionsList?.map(
				({ actionName, actionHandler, isHidden, icon, iconColor }) =>
					!isHidden && (
						<DropdownItem onClick={() => actionHandler(cell?.row?.original)}>
							{icon && <i className={`${icon} ${iconColor} me-2`} />}{' '}
							{actionName}
						</DropdownItem>
					)
			)}
		</DropdownMenu>
	</UncontrolledDropdown>
);

Actions.propTypes = {
	cell: PropTypes.shape({
		value: PropTypes.string.isRequired,
		row: PropTypes.shape({
			original: PropTypes.shape({
				id: PropTypes.string.isRequired,
				isActive: PropTypes.bool.isRequired,
			}).isRequired,
		}).isRequired,
	}).isRequired,
	actionsList: PropTypes.arrayOf().isRequired,
};

export default Actions;
