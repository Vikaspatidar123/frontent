import PropTypes from 'prop-types';
import React from 'react';
import {
	Col,
	Row,
	// UncontrolledTooltip,
	Modal,
	ModalHeader,
	ModalBody,
	Form,
	Spinner,
	// Input,
	// FormFeedback,
	// Label,
	// Card,
	// CardBody,
	// UncontrolledDropdown,
	// DropdownToggle,
	// DropdownMenu,
	// DropdownItem,
} from 'reactstrap';
import {
	CustomInputField,
	CustomSwitchButton,
	CustomSelectField,
	CustomDateField,
} from '../../helpers/custom_forms';

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
}) => {
	const getField = ({
		fieldType,
		optionList,
		optionsLabel,
		name,
		placeholder,
		label,
		callBack,
	}) => {
		switch (fieldType) {
			case 'textField':
				return (
					<CustomInputField
						label={label}
						name={name}
						type="text"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						placeholder={placeholder}
						validate={{ required: { value: true } }}
						value={validation.values?.[name] || ''}
						invalid={!!(validation.touched[name] && validation.errors[name])}
						isError
						errorMsg={validation.touched[name] && validation.errors[name]}
					/>
				);
			case 'select':
				return (
					<CustomSelectField
						label={label}
						name={name}
						type="select"
						onChange={(e) => {
							validation.handleChange(e);
							// eslint-disable-next-line no-unused-expressions
							callBack ? callBack(e) : null;
						}}
						onBlur={validation.handleBlur}
						placeholder={placeholder}
						validate={{ required: { value: true } }}
						value={validation.values[name]}
						invalid={!!(validation.touched[name] && validation.errors[name])}
						isError
						errorMsg={validation.touched[name] && validation.errors[name]}
						options={
							<>
								<option value={null} disabled selected>
									{optionsLabel || placeholder}
								</option>
								{optionList?.map(({ optionLabel, value }) => (
									<option key={value} value={value}>
										{optionLabel}
									</option>
								))}
							</>
						}
					/>
				);
			case 'switch':
				return (
					<CustomSwitchButton
						labelClassName="form-check-label"
						label={label}
						htmlFor="customRadioInline1"
						type="switch"
						id="customRadioInline1"
						name={name}
						checked={validation.values.status}
						inputClassName="form-check-input"
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
					/>
				);
			case 'datePicker':
				return (
					<CustomDateField
						name={name}
						placeholder={placeholder}
						label={label}
						value={validation.values[name]}
						onChange={validation.onChange}
						isError
						invalid={!!(validation.touched[name] && validation.errors[name])}
						errorMsg={validation.touched[name] && validation.errors[name]}
					/>
				);
			default:
				return <div />;
		}
	};
	return (
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
								<Col className={`col-12 ${customColClasses}`}>
									{formFields?.map((field) => (
										<div className="mb-3">{getField(field)}</div>
									))}
								</Col>
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
};

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
