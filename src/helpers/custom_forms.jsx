/* eslint-disable no-debugger */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';

import { Label, Input, FormFeedback } from 'reactstrap';

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
}) => {
	console.log('isError: ', isError, invalid, errorMsg);
	return (
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
				<FormFeedback type="invalid">
					{console.log('jiiiiiiiiiiiiiiiiiiiiiii', name, errorMsg)}
					{errorMsg}
				</FormFeedback>
			) : null}
		</>
	);
};

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
	id,
	isError,
	...props
}) => (
	<>
		{label && <Label for={name}> {label} </Label>}
		<Input
			id={id}
			name={name}
			placeholder={placeholder}
			type={name}
			value={value}
			onChange={onChange}
			{...props}
		/>
		{/* {isError && <ErrorMessage component={component} name={name} className={className} />} */}
	</>
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
	</span>
);
