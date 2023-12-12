/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import { encryptCredentials } from '../../../network/storageUtils';

const ConfirmationModal = (props) => {
	const {
		openModal,
		setOpenModal,
		values,
		navigate,
		headerTitle,
		className,
		size,
		center,
		hideHeader,
		titleHeaderIcon,
		pageType,
	} = props;

	const toggleModal = () => {
		setOpenModal((prev) => !prev);
	};

	const handleYesClick = () => {
		window.localStorage.setItem(
			pageType,
			encryptCredentials(JSON.stringify(values))
		);
		setOpenModal(false);
		if (navigate) {
			navigate(-1);
		}
	};

	const handleNoClick = () => {
		window.localStorage.removeItem(pageType);
		setOpenModal((prev) => !prev);
		if (navigate) {
			navigate(-1);
		}
	};

	return (
		<Modal
			zIndex="9999"
			backdropClassName="bakc"
			isOpen={openModal}
			toggle={toggleModal}
			className={className}
			size={size}
			centered={center}
			backdrop="static"
		>
			{!hideHeader && (
				<ModalHeader toggle={toggleModal} className="border-bottom-0 pb-0">
					{titleHeaderIcon && <img src={titleHeaderIcon} alt="" />}
					{headerTitle}
				</ModalHeader>
			)}

			<ModalBody>
				<div className="text-center p-5">
					<h4> You have unsaved changes.</h4>
					<h5> Do you want to save them?</h5>
					<Button
						className="mt-3 w-75"
						color="primary"
						onClick={handleYesClick}
					>
						Yes, I want to save
					</Button>
					<button
						type="button"
						className="mt-2 text-danger btn btn-link-danger text-decoration-none w-75"
						onClick={handleNoClick}
					>
						No, I want to discard
					</button>
				</div>
			</ModalBody>
		</Modal>
	);
};

ConfirmationModal.defaultProps = {
	openModal: false,
	size: '',
	headerTitle: '',
	className: '',
	center: false,
	hideHeader: false,
	titleHeaderIcon: '',
	setOpenModal: () => {},
	values: {},
	navigate: () => {},
	pageType: '',
};

ConfirmationModal.propTypes = {
	openModal: PropTypes.bool,
	size: PropTypes.string,
	headerTitle: PropTypes.string,
	className: PropTypes.string,
	center: PropTypes.bool,
	hideHeader: PropTypes.bool,
	titleHeaderIcon: PropTypes.string,
	setOpenModal: PropTypes.func,
	values: PropTypes.objectOf(),
	navigate: PropTypes.func,
	pageType: PropTypes.string,
};

export default ConfirmationModal;
