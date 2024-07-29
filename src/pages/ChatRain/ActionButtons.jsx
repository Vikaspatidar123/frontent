import React from 'react';
import PropTypes from 'prop-types';
import { Button, UncontrolledTooltip } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const ActionButtons = ({
	row: { original },
	handleDelete,
	handleView,
}) => {
	const navigate = useNavigate();
	const active = original?.isActive;
	const chatRainId = original?.id;
	const handleEdit = () => navigate(`/chat/chat-rain/edit/${chatRainId}`, { state: { chatRainDetails: original } });

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li data-bs-toggle="tooltip" data-bs-placement="top" title="View">
				<Button
					className="btn btn-sm btn-soft-info"
					id="viewToolTip"
					onClick={() => handleView(original)}
				>
					<i className="mdi mdi-eye-outline" id={`view-${chatRainId}`} />
					<UncontrolledTooltip placement="top" target={`viewToolTip`}>
						View Chat Rain
					</UncontrolledTooltip>
				</Button>
			</li>

			{!original?.isClosed && <li>
				<Button
					className="btn btn-sm btn-soft-info"
					id="editToolTip"
					onClick={handleEdit}
				>
					<i className="mdi mdi-pencil-outline" />
					<UncontrolledTooltip placement="top" target="editToolTip">
						Edit Chat Rain
					</UncontrolledTooltip>
				</Button>
			</li>}
		</ul>
	);
};

ActionButtons.propTypes = {
	row: PropTypes.shape({
		original: PropTypes.shape({
			chatRainId: PropTypes.number.isRequired,
			isActive: PropTypes.bool.isRequired,
		}).isRequired,
	}).isRequired,
	handleView: PropTypes.func.isRequired,
};

export default ActionButtons;
