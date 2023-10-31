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
} from 'reactstrap';
import { getField } from '../../helpers/customForms';

const FormModal = ({
	isOpen,
	toggle,
	header,
	validation,
	formFields,
	submitLabel,
	isLoading,
	customColClasses,
	customComponent,
	isSubmitLoading,
}) => (
	<Modal isOpen={isOpen} toggle={toggle}>
		<ModalHeader toggle={toggle} tag="h4">
			{header}
		</ModalHeader>
		<ModalBody>
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					validation.handleSubmit();
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
						<Row>{customComponent}</Row>
						<Row>
							<Col>
								<div className="text-end">
									<button
										type="submit"
										disabled={isSubmitLoading}
										className="btn btn-success save-user"
									>
										{isSubmitLoading ? <Spinner /> : submitLabel}
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

FormModal.defaultProps = {
	isOpen: false,
	toggle: true,
	header: '',
	validation: {},
	formFields: [],
	submitLabel: 'Save',
	isLoading: false,
	customColClasses: '',
	customComponent: <div />,
	isSubmitLoading: false,
};

FormModal.propTypes = {
	isOpen: PropTypes.bool,
	toggle: PropTypes.bool,
	header: PropTypes.string,
	validation: PropTypes.objectOf,
	formFields: PropTypes.arrayOf,
	submitLabel: PropTypes.string,
	isLoading: PropTypes.bool,
	customColClasses: PropTypes.string,
	customComponent: PropTypes.element,
	isSubmitLoading: PropTypes.bool,
};

export default FormModal;
