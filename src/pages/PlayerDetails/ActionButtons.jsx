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
			<li id={documentLabelId}>
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
					<i
						className="mdi mdi-file-document"
						id={`inactivetooltip_${documentLabelId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`inactivetooltip_${documentLabelId}`}
					>
						Request Document
					</UncontrolledTooltip>
				</Button>
			</li>

			<li id={documentLabelId}>
				<Button
					to="#"
					className="btn btn-sm btn-soft-success"
					disabled={
						status === 'Requested' ||
						status === 'Approved' ||
						status === 'Rejected' ||
						status === 'Not Provided'
					}
					onClick={() => {
						handleVerifyDocument({
							documentLabelId,
						});
					}}
				>
					<i
						className="mdi mdi-file-document-edit"
						id={`verify-docs-${documentLabelId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`verify-docs-${documentLabelId}`}
					>
						Verify Document
					</UncontrolledTooltip>
				</Button>
			</li>

			<li id={documentLabelId}>
				<Button
					to="#"
					className="btn btn-sm btn-soft-danger"
					disabled={
						status === 'Requested' ||
						status === 'Approved' ||
						status === 'Rejected' ||
						status === 'Not Provided'
					}
					onClick={() => {
						toggleModal(documentLabelId);
					}}
				>
					<i
						className="mdi mdi-file-cancel"
						id={`reject-docs-${documentLabelId}`}
					/>
					<UncontrolledTooltip
						placement="top"
						target={`reject-docs-${documentLabelId}`}
					>
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
	toggleModal: PropTypes.func.isRequired,
	cell: PropTypes.objectOf.isRequired,
};

export default ActionButtons;
