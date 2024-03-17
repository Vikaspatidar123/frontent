/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Button, UncontrolledTooltip } from 'reactstrap';
import PropTypes from 'prop-types';

const ActionButtons = ({
	cell,
	handleRequestDocument,
	handleVerifyDocument,
	toggleModal,
}) => {
	const documentLabelId = cell?.row?.original?.id;
	const status = cell?.row?.original?.status;

	return (
		<ul className="list-unstyled hstack gap-1 mb-0">
			<li>
				<Button
					to="#"
					className="btn btn-sm btn-soft-primary"
					disabled={status === 'Requested' || status === 'Pending'}
					onClick={(e) => {
						e.preventDefault();
						handleRequestDocument({
							documentLabelId,
						});
					}}
				>
					<i className="mdi mdi-file-document" id="inactivetooltip" />
					<UncontrolledTooltip placement="top" target="inactivetooltip">
						Request Document
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					to="#"
					className="btn btn-sm btn-soft-success"
					disabled={
						status === 'Requested' ||
						status === 'Approved' ||
						status === 'Rejected' ||
						status === 'Not Provided'
					}
					onClick={(e) => {
						e.preventDefault();
						handleVerifyDocument({
							documentLabelId,
						});
					}}
				>
					<i className="mdi mdi-file-document-edit" id="verifytooltip" />
					<UncontrolledTooltip placement="top" target="verifytooltip">
						Verify Document
					</UncontrolledTooltip>
				</Button>
			</li>

			<li>
				<Button
					to="#"
					className="btn btn-sm btn-soft-danger"
					disabled={
						status === 'Requested' ||
						status === 'Approved' ||
						status === 'Rejected' ||
						status === 'Not Provided'
					}
					onClick={(e) => {
						e.preventDefault();
						toggleModal(documentLabelId);
					}}
				>
					<i className="mdi mdi-file-cancel" id="rejecttooltip" />
					<UncontrolledTooltip placement="top" target="rejecttooltip">
						Reject Document
					</UncontrolledTooltip>
				</Button>
			</li>
		</ul>
	);
};

ActionButtons.propTypes = {
	handleRequestDocument: PropTypes.func.isRequired,
	handleVerifyDocument: PropTypes.func.isRequired,
	handleRejectDocument: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
