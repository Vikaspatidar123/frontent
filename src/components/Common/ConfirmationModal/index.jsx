/* eslint-disable no-mixed-spaces-and-tabs */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, ModalHeader, ModalBody, Row } from 'reactstrap';
import { encryptCredentials } from '../../../network/storageUtils';

const ConfirmationModal = (props) => {
	const {
		openModal,
		setOpenModal,
		validation,
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
		if (validation?.values?.thumbnail instanceof File) {
			const { name, type } = validation?.values?.thumbnail || {};
			let values = {};
			const reader = new FileReader();
			reader.readAsDataURL(validation?.values?.thumbnail);
			reader.onload = () => {
				values = {
					...validation?.values,
					thumbnail: {
						name,
						type,
						thumbnail: reader.result,
					},
				};
				if (Object.keys(values).length > 0 && values?.thumbnail) {
					window.localStorage.setItem(
						pageType,
						encryptCredentials(JSON.stringify(values))
					);
				}
			};
		} else {
			window.localStorage.setItem(
				pageType,
				encryptCredentials(JSON.stringify(validation?.values))
			);
		}

		setOpenModal(false);
		if (navigate) {
			navigate(-1);
		}
	};

	const handleNoClick = () => {
		window.localStorage.removeItem(pageType);
		setOpenModal((prev) => !prev);
		validation.resetForm();
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
				<div className="text-center p-3">
					<h4> You have unsaved changes.</h4>
					<h5> Do you want to save them?</h5>
					<Row className="mt-4 justify-content-evenly">
						<Button className="w-25" onClick={handleNoClick}>
							No
						</Button>
						<Button className="w-25" color="primary" onClick={handleYesClick}>
							Yes
						</Button>
					</Row>
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
	validation: {},
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
	validation: PropTypes.objectOf(),
	navigate: PropTypes.func,
	pageType: PropTypes.string,
};

export default ConfirmationModal;
