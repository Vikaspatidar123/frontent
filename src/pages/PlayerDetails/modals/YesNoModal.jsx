/* eslint-disable react/prop-types */
import React from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';

const YesNoModal = ({ show, content, handleYes, handleClose }) => {
	const toggle = () => {
		handleClose();
	};

	return (
		<Modal isOpen={show} toggle={toggle} backdrop="static">
			<ModalHeader toggle={toggle} tag="h4">
				{content}
			</ModalHeader>
			<ModalBody>
				<button
					type="button"
					className="btn btn-success"
					onClick={() => {
						handleYes();
						handleClose();
					}}
				>
					Yes
				</button>
				<button type="button" className="mx-2 btn btn-warning" onClick={toggle}>
					No
				</button>
			</ModalBody>
		</Modal>
	);
};

export default YesNoModal;
