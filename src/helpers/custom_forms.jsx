/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

import { Label, Input, FormFeedback } from 'reactstrap';
import 'flatpickr/dist/themes/material_blue.css';
import FlatPickr from 'react-flatpickr';

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
		{isError && <span className="text-danger"> *</span>}
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
		{isError && <span className="text-danger"> *</span>}
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
