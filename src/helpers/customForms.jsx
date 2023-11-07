/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-expressions */
import React from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Form Editor
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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
import Select from 'react-select';
import FlatPickr from 'react-flatpickr';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';
import CreatableSelect from 'react-select/creatable';
import PhoneInput from 'react-phone-input-2';
import { showToastr } from '../utils/helpers';
import { countryMasks } from '../pages/PlayerDetails/constants';

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
	min,
	max,
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
			min={min}
			max={max}
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
	isMulti = false,
	id,
	isError = false,
	errorMsg,
	...props
}) => (
	<>
		{label && <Label for={name}>{label}</Label>}
		{isError && label && <span className="text-danger"> *</span>}
		{isMulti ? (
			<Select
				name={name}
				value={value}
				isMulti
				onChange={onChange}
				className="select2-selection"
				options={options}
				placeholder={placeholder}
				isDisabled={disabled}
				{...props}
			/>
		) : (
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
		)}

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
	onClick,
	onBlur,
	style,
	checked,
	isError,
	errorMsg,
	disabled,
	...rest
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
			onClick={onClick}
			onBlur={onBlur}
			style={style}
			checked={checked}
			disabled={disabled}
			{...rest}
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
	onClick,
	onBlur,
	style,
	checked,
	isError,
	errorMsg,
	disabled,
	containerClass,
	switchSizeClass,
	...rest
}) => (
	<span
		className={`form-check form-switch ${switchSizeClass || 'form-switch-md'} ${
			containerClass || 'mb-3 mt-3'
		}`}
	>
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
			onClick={onClick}
			onBlur={onBlur}
			style={style}
			checked={checked}
			disabled={disabled}
			{...rest}
		/>
		{isError && errorMsg ? (
			<FormFeedback type="invalid">{errorMsg}</FormFeedback>
		) : null}
	</span>
);

export const CustomTextEditor = ({
	label,
	// value,
	isError,
	onChange,
	// ...rest
}) => (
	<>
		{label && <Label className="form-label">{label}</Label>}
		{isError && label && <span className="text-danger"> *</span>}
		<Editor
			// {...rest}
			toolbarClassName="toolbarClassName"
			wrapperClassName="wrapperClassName"
			editorClassName="editorClassName"
			// editorState={value} // Controlled will create issue after conversion
			onEditorStateChange={onChange}
		/>
	</>
);

export const getField = (
	{
		fieldType,
		optionList,
		optionsLabel,
		multiSelectOption,
		name,
		placeholder,
		label,
		callBack,
		isDisabled,
		onDelete,
		type = 'text',
		minDate,
		maxDate,
		showThumbnail,
		multiple = false,
		levelIndex,
		levelFieldName,
		minimum,
		maximum,
		adornmentText,
		namesArray,
		...rest
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
					disabled={!!isDisabled}
					min={minimum}
				/>
			);
		case 'select':
			return (
				<CustomSelectField
					label={label}
					name={name}
					isMulti={multiple}
					isClearable
					type="select"
					onChange={(e) => {
						if (multiple) {
							callBack && callBack(e);
						} else {
							validation.handleChange(e);
							callBack && callBack(e);
						}
					}}
					onBlur={validation.handleBlur}
					placeholder={placeholder}
					validate={{ required: { value: true } }}
					value={validation.values[name]}
					key={`my_unique_select_key__${validation.values[name]}`}
					invalid={!!(validation.touched[name] && validation.errors[name])}
					isError
					errorMsg={validation.touched[name] && validation.errors[name]}
					options={
						multiSelectOption || (
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
						)
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
					value={!!validation.values[name]}
					name={name}
					checked={!!validation.values[name]}
					inputClassName="form-check-input"
					onClick={() =>
						validation.setFieldValue(name, !validation.values[name])
					}
					onBlur={validation.handleBlur}
					disabled={!!isDisabled}
				/>
			);
		case 'toggle':
			return (
				<CustomToggleButton
					labelClassName="form-check-label"
					label={label}
					htmlFor="customSwitch1"
					type="checkbox"
					id="customSwitch1"
					name={name}
					checked={!!validation.values[name]}
					inputClassName="form-check-input"
					value={!!validation.values[name]}
					onClick={(e) => {
						validation.setFieldValue(name, !e.target.checked);
						callBack && callBack(e);
					}}
					onBlur={validation.handleBlur}
					disabled={!!isDisabled}
					{...rest}
				/>
			);
		case 'datePicker':
			return (
				<CustomInputField
					name={name}
					label={label}
					type="date"
					value={validation.values[name]}
					onChange={validation.handleChange}
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
				<>
					<CustomInputField
						label={label}
						id="file"
						name={name}
						type="file"
						onChange={(event) => {
							validation.setFieldValue(name, event.currentTarget.files[0]);
						}}
						callBack
						onBlur={validation.handleBlur}
						placeholder={placeholder}
						validate={{ required: { value: true } }}
						invalid={!!(validation.touched[name] && validation.errors[name])}
						disabled={!!isDisabled}
						isError
						errorMsg={validation.touched[name] && validation.errors[name]}
					/>
					{showThumbnail && validation.values[name] && (
						<img
							style={{ marginTop: 10 }}
							width={100}
							src={
								typeof validation.values[name] === 'string'
									? validation.values[name]
									: URL.createObjectURL(validation.values[name])
							}
							alt="Not found"
						/>
					)}
				</>
			);
		case 'textEditor':
			return (
				<CustomTextEditor
					label={label}
					name={name}
					type={type}
					onChange={(text) => validation.setFieldValue(name, text)}
					onBlur={validation.handleBlur}
					placeholder={placeholder}
					validate={{ required: { value: true } }}
					value={validation.values[name]}
					isError
					// invalid={!!(validation.touched[name] && validation.errors[name])}
					// isError
					// errorMsg={validation.touched[name] && validation.errors[name]}
					// disabled={!!isDisabled}
					validation={validation}
				/>
			);
		case 'loyaltyRangeField':
			return (
				<CustomInputField
					label={label}
					name={name}
					type={type}
					onChange={validation.handleChange}
					onBlur={validation.handleBlur}
					placeholder={placeholder}
					validate={{ required: { value: true } }}
					value={validation.values?.loyaltyLevel[levelIndex][levelFieldName]}
					invalid={
						!!(
							validation.touched?.loyaltyLevel &&
							validation.errors?.loyaltyLevel?.[levelIndex]?.[levelFieldName]
						)
					}
					isError
					errorMsg={
						validation.touched?.loyaltyLevel &&
						validation.errors?.loyaltyLevel?.[levelIndex]?.[levelFieldName]
					}
					disabled={!!isDisabled}
					min={minimum}
					max={maximum}
				/>
			);
		case 'inputGroup':
			return Object.keys(validation?.values?.name || {}).map((item) => (
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
							<div>
								<Button
									className="btn-danger"
									disabled={item === 'EN'}
									onClick={() => onDelete(item)}
								>
									<i className="mdi mdi-trash-can-outline" />
								</Button>
							</div>
						</Col>
						{/* {validation?.touched?.name?.[item] && validation?.errors?.name?.[item] && <FormFeedback type="invalid">ERROR</FormFeedback>} */}
					</Col>
				</div>
			));
		case 'creatableSelect':
			return (
				<>
					{label && <Label for={name}>{label}</Label>}
					<CreatableSelect
						isClearable={false}
						isMulti
						name={name}
						onCreateOption={(option) => {
							// only number and alphabets accepted
							if (option && option.match(/^[A-Za-z0-9_-]*$/)) {
								if (optionList) {
									validation.setFieldValue(name, [
										...validation.values[name],
										{ label: option, value: option, isNew: true },
									]);
								} else {
									validation.setFieldValue(name, [
										{ label: option, value: option, isNew: true },
									]);
								}
							} else {
								showToastr({
									message: 'Only Alphabets and Numbers Allowed',
									type: 'error',
								});
							}
						}}
						classNamePrefix="select"
						options={optionList}
						value={validation.values[name]}
						onChange={callBack}
					/>
				</>
			);
		case 'radioGroup':
			return (
				<>
					{label && <Label for={name}>{label}</Label>}
					<div>
						{!!optionList.length &&
							optionList.map((option) => (
								<CustomSwitchButton
									labelClassName="form-check-label"
									label={option.optionLabel}
									htmlFor={`customRadioInline${option.value}`}
									type="switch"
									id={`customRadioInline${option.value}`}
									value={!!validation.values[name]}
									name={name}
									checked={!!(validation.values[name] === option.value)}
									inputClassName="form-check-input"
									onClick={() => validation.setFieldValue(name, option.value)}
									onBlur={validation.handleBlur}
									disabled={!!isDisabled}
								/>
							))}
					</div>
				</>
			);
		case 'textfieldWithAdornment':
			return (
				<>
					{label && <Label for={name}>{label}</Label>}
					<InputGroup>
						<InputGroupText>{adornmentText}</InputGroupText>
						<CustomInputField
							type={type}
							name={name}
							placeholder={placeholder}
							value={validation?.values?.[name]}
							onChange={validation.handleChange}
							onBlur={validation.handleBlur}
							invalid={
								!!(validation.touched?.[name] && validation.errors?.[name])
							}
							isError
							errorMsg={validation.touched?.[name] && validation.errors?.[name]}
						/>
					</InputGroup>
				</>
			);
		case 'phone':
			return (
				<>
					<PhoneInput
						masks={countryMasks}
						name={namesArray?.[0]}
						type="text"
						alwaysDefaultMask={false}
						enableSearch
						placeholder={placeholder}
						enableLongNumbers
						value={`${validation?.values?.[namesArray?.[1]]?.substring(1)}${
							validation?.values?.[namesArray?.[0]]
						}`}
						country="us"
						isValid={(value, country) => {
							if (
								validation?.touched?.[namesArray?.[0]] &&
								(value?.charAt(country?.dialCode.length) === '0' ||
									country?.format?.replace(/[+ ()-]/g, '').length !==
										value?.length)
							) {
								return 'Invalid Number';
								// validation?.setFieldError(namesArray?.[0], 'Invalid Phone')
							}
							return true;
						}}
						onChange={(phone, code) => {
							const codeString = String(code?.dialCode);
							const newPhone = phone.substring(codeString.length);
							const newCode = `+${codeString}`;
							validation?.setFieldValue(namesArray?.[0], newPhone);
							validation?.setFieldValue(namesArray?.[1], newCode);
						}}
						onBlur={() => validation?.setFieldTouched(namesArray?.[0], true)}
						buttonStyle={{ backgroundColor: '#22214b' }}
						inputStyle={{ width: '100%' }}
					/>
					{/* <ErrorMessage
            component='div'
            name='phone'
            className='error-message'
          /> */}
				</>
			);
		default:
			return <div />;
	}
};
