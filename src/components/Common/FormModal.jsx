/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
import PropTypes from 'prop-types';
import React from 'react';
import {
	Col,
	Row,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	Spinner,
	UncontrolledTooltip,
} from 'reactstrap';
import { isEmpty } from 'lodash';
import { getField } from '../../helpers/customForms';

const FormModal = ({
	isOpen,
	setIsOpen,
	isEditOpen,
	showConfirmationModal,
	setShowConfirmationModal,
	toggle,
	header,
	validation,
	formFields,
	submitLabel,
	isLoading,
	customColClasses,
	customComponent,
	isSubmitLoading,
	colOptions,
	responsiveFormFields,
	className,
}) => {
	const toggleFormModal = () => {
		if (!isEditOpen) {
			const hasFilledValues = Object.values(validation.values).some((value) =>
				value instanceof File ? value.size > 0 : !isEmpty(value)
			);
			hasFilledValues && setShowConfirmationModal(!showConfirmationModal);
		}
		setIsOpen((prev) => !prev);
	};

	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle ?? toggleFormModal}
			className={className}
			backdrop="static"
		>
			<ModalHeader toggle={toggle ?? toggleFormModal} tag="h4">
				{header}
			</ModalHeader>
			<ModalBody>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						validation.handleSubmit(e);
						return false;
					}}
				>
					{isLoading ? (
						<Spinner
							color="primary"
							className="position-absolute top-50 start-50"
						/>
					) : (
						<>
							<Row>
								{formFields?.map(
									(field) =>
										!field?.isHide && (
											<Col className={`col-12 mb-3 ${customColClasses}`}>
												{getField(field, validation)}
											</Col>
										)
								)}
							</Row>
							{/* Responsive/customizable column forms */}
							<Row className="justify-content-start">
								{responsiveFormFields?.map(
									(field) =>
										!field?.isHide && (
											<>
												{field?.isNewRow && <div className="row" />}
												<Col
													id={`field-${field.name}`}
													{...(field?.fieldColOptions || colOptions)}
													className="mb-3"
												>
													{getField(field, validation)}
												</Col>
												{!!field.tooltipContent && (
													<UncontrolledTooltip
														placement="bottom"
														target={`field-${field.name}`}
													>
														{field.tooltipContent}
													</UncontrolledTooltip>
												)}
											</>
										)
								)}
							</Row>
							<Row>{customComponent}</Row>
							<Row>
								<Col>
									<div className="text-end">
										<button
											type="submit"
											disabled={isSubmitLoading}
											className="btn btn-primary save-user"
										>
											{isSubmitLoading && (
												<i className="bx bx-hourglass bx-spin font-size-16 align-middle me-2" />
											)}
											{/* {isSubmitLoading && <i className="bx bx-loader bx-spin font-size-16 align-middle me-2" /> } */}{' '}
											{submitLabel}
										</button>
									</div>
								</Col>
							</Row>
						</>
					)}
				</Form>
			</ModalBody>
		</Modal>
	);
};

FormModal.defaultProps = {
	isOpen: false,
	toggle: null,
	header: '',
	validation: {},
	formFields: [],
	submitLabel: 'Save',
	isLoading: false,
	customColClasses: '',
	customComponent: <div />,
	isSubmitLoading: false,
	className: '',
	colOptions: { xs: 12, sm: 6, md: 6, lg: 6, xl: 6, xxl: 6 },
	responsiveFormFields: [],
	setIsOpen: () => {},
	isEditOpen: false,
	showConfirmationModal: false,
	setShowConfirmationModal: () => {},
};

FormModal.propTypes = {
	isOpen: PropTypes.bool,
	toggle: PropTypes.func,
	header: PropTypes.string,
	validation: PropTypes.objectOf,
	formFields: PropTypes.arrayOf,
	submitLabel: PropTypes.string,
	isLoading: PropTypes.bool,
	customColClasses: PropTypes.string,
	customComponent: PropTypes.element,
	isSubmitLoading: PropTypes.bool,
	colOptions: PropTypes.objectOf,
	responsiveFormFields: PropTypes.arrayOf,
	className: PropTypes.string,
	setIsOpen: PropTypes.func,
	isEditOpen: PropTypes.bool,
	showConfirmationModal: PropTypes.bool,
	setShowConfirmationModal: PropTypes.func,
};

export default FormModal;
