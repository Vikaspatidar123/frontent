/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import {
	Label,
	Input,
	FormFeedback,
	Col,
	InputGroup,
	Button,
	InputGroupText,
} from 'reactstrap';
import 'flatpickr/dist/themes/material_blue.css';
import FlatPickr from 'react-flatpickr';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

export const CustomInputField = ({
	type,
	name,
	placeholder,
	value,
	onChange,
	onBlur,
	disabled,
	label,
	isError,
	invalid,
	validation,
	errorMsg,
	validate,
	...props
}) => (
	<>
		{label && <Label className="form-label">{label}</Label>}
		{isError && label && <span className="text-danger"> *</span>}
		<Input
			name={name}
			type={type}
			label={label}
			value={value}
			disabled={disabled}
			validate={validate}
			onChange={onChange}
			onBlur={onBlur}
			invalid={invalid}
			placeholder={placeholder}
			{...props}
		/>
		{isError && errorMsg ? (
			<FormFeedback type="invalid">{errorMsg}</FormFeedback>
		) : null}
	</>
);

export const CustomSelectField = ({
	type,
	name,
	placeholder,
	value,
	onChange,
	onBlur,
	disabled,
	label,
	options,
	handleBlur,
	multiple = false,
	id,
	isError = false,
	errorMsg,
	...props
}) => (
	<>
		{label && <Label for={name}>{label}</Label>}
		{isError && label && <span className="text-danger"> *</span>}
		<Input
			id={id}
			type={type}
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
			multiple={multiple}
			placeholder={placeholder}
			onBlur={onBlur}
			{...props}
		>
			{options}
		</Input>
		{isError && errorMsg ? (
			<FormFeedback type="invalid">{errorMsg}</FormFeedback>
		) : null}
	</>
);

export const CustomDateField = ({
	name,
	label,
	placeholder,
	value,
	onChange = () => {},
	onBlur,
	isError,
	dateFormat = 'd M,Y',
	errorMsg,
	...props
}) => (
	<div id="datepicker1">
		{label && <Label for={name}>{label}</Label>}
		<FlatPickr
			className="form-control mb-3 mb-xxl-0"
			name={name}
			placeholder={placeholder}
			options={{
				dateFormat,
			}}
			selected={value}
			onChange={onChange}
			{...props}
		/>
		{isError && errorMsg ? (
			<FormFeedback type="invalid">{errorMsg}</FormFeedback>
		) : null}
	</div>
);

export const CustomRangeSelector = ({
	name,
	label,
	placeholder,
	value = ['', ''],
	// eslint-disable-next-line no-unused-vars
	onChange = () => {}, // need for preventing code break
	onBlur,
	isError,
	errorMsg,
	maxDate = moment().utc().startOf('day').toDate(),
	minDate = moment().subtract(100, 'years').utc().toDate(),
	validation,
	...props
}) => (
	<div id="datepicker1">
		{label && <Label for={name}>{label}</Label>}
		<ReactDatePicker
			selectsRange
			// dateFormat="MMMM dd, yyyy O"
			placeholderText={placeholder}
			startDate={value[0]}
			endDate={value[1]}
			onChange={(date) => {
				validation.setFieldValue('startDate', date[0]);
				validation.setFieldValue('endDate', date[1]);
			}}
			monthsShown={2}
			maxDate={maxDate}
			minDate={minDate}
			className="form-control"
			{...props}
		/>
	</div>
);

export const CustomSwitchButton = ({
	label,
	labelClassName,
	htmlFor,
	type,
	id,
	name,
	inputClassName,
	value,
	onChange,
	onBlur,
	style,
	checked,
	isError,
	errorMsg,
}) => (
	<span className="form-check form-check-inline">
		{label && (
			<Label htmlFor={htmlFor} className={labelClassName}>
				{label}
			</Label>
		)}
		<Input
			type={type}
			id={id}
			name={name}
			className={inputClassName}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			style={style}
			checked={checked}
		/>
		{isError && errorMsg ? (
			<FormFeedback type="invalid">{errorMsg}</FormFeedback>
		) : null}
	</span>
);

export const CustomToggleButton = ({
	label,
	labelClassName,
	htmlFor,
	type,
	id,
	name,
	inputClassName,
	value,
	onChange,
	onBlur,
	style,
	checked,
	isError,
	errorMsg,
	role,
}) => (
	<span className="form-check form-switch">
		{label && (
			<Label htmlFor={htmlFor} className={labelClassName}>
				{label}
			</Label>
		)}
		<Input
			type={type}
			id={id}
			name={name}
			className={inputClassName}
			value={value}
			onChange={onChange}
			onBlur={onBlur}
			style={style}
			checked={checked}
			role={role}
		/>
		{isError && errorMsg ? (
			<FormFeedback type="invalid">{errorMsg}</FormFeedback>
		) : null}
	</span>
);

export const getField = (
	{
		fieldType,
		optionList,
		optionsLabel,
		name,
		placeholder,
		label,
		callBack,
		isDisabled,
		onDelete,
		type = 'text',
		minDate,
		maxDate,
	},
	validation
) => {
	switch (fieldType) {
		case 'textField':
			return (
				<CustomInputField
					label={label}
					name={name}
					type={type}
					onChange={validation.handleChange}
					onBlur={validation.handleBlur}
					placeholder={placeholder}
					validate={{ required: { value: true } }}
					value={validation.values?.[name] || ''}
					invalid={!!(validation.touched[name] && validation.errors[name])}
					isError
					errorMsg={validation.touched[name] && validation.errors[name]}
					disabled={!!isDisabled}
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
							<option value={null} selected disabled>
								{optionsLabel || placeholder}
							</option>
							{optionList?.map(({ optionLabel, value }) => (
								<option key={value} value={value}>
									{optionLabel}
								</option>
							))}
						</>
					}
					disabled={!!isDisabled}
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
					disabled={!!isDisabled}
				/>
			);
		case 'toggle':
			return (
				<CustomToggleButton
					labelClassName="form-check-label"
					label={label}
					htmlFor="flexSwitchCheckDefault"
					type="checkbox"
					role="switch"
					id="flexSwitchCheckDefault"
					name={name}
					// checked={validation.values.status}
					inputClassName="form-check-input"
					onChange={validation.handleChange}
					onBlur={validation.handleBlur}
					disabled={!!isDisabled}
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
					disabled={!!isDisabled}
				/>
			);

		case 'dateRangeSelector':
			return (
				<CustomRangeSelector
					name={name}
					label={label}
					placeholder={placeholder}
					value={[validation.values.startDate, validation.values.endDate]}
					onChange={validation.onChange}
					isError
					invalid={!!(validation.touched[name] && validation.errors[name])}
					errorMsg={validation.touched[name] && validation.errors[name]}
					disabled={!!isDisabled}
					maxDate={maxDate}
					minDate={minDate}
					validation={validation}
				/>
			);
		case 'file':
			return (
				<CustomInputField
					label={label}
					id="file"
					name={name}
					type="file"
					onChange={(event) => {
						validation.setFieldValue(name, event.currentTarget.files[0]);
					}}
					onBlur={validation.handleBlur}
					placeholder={placeholder}
					validate={{ required: { value: true } }}
					invalid={!!(validation.touched[name] && validation.errors[name])}
					isError
					errorMsg={validation.touched[name] && validation.errors[name]}
				/>
			);
		case 'inputGroup':
			return Object.keys(validation?.values?.name).map((item) => (
				<div className="d-flex align-items-center mt-1" key={item}>
					<Col>
						<Col className="d-flex">
							<InputGroup>
								<InputGroupText>{item}</InputGroupText>
								<CustomInputField
									name={`name[${item}]`}
									placeholder={placeholder}
									value={validation?.values?.name?.[item]}
									onChange={validation.handleChange}
									onBlur={validation.handleBlur}
									invalid={
										!!(
											validation.touched?.name?.[item] &&
											validation.errors?.name?.[item]
										)
									}
									isError
									errorMsg={
										validation.touched?.name?.[item] &&
										validation.errors?.name?.[item]
									}
								/>
							</InputGroup>
							<Button
								className="btn-danger"
								style={{ Height: '35px', lineHeight: '14px' }}
								disabled={item === 'EN'}
								onClick={() => onDelete(item)}
							>
								<i className="mdi mdi-trash-can-outline" />
							</Button>
						</Col>
						{/* {validation?.touched?.name?.[item] && validation?.errors?.name?.[item] && <FormFeedback type="invalid">ERROR</FormFeedback>} */}
					</Col>
				</div>
			));
		default:
			return <div />;
	}
};
