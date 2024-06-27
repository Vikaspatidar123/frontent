/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// Form Editor
import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, ContentState, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
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
import Select from 'react-select';

import FlatPickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import moment from 'moment';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const { VITE_APP_AWS_GALLERY_URL } = import.meta.env;

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
	description,
	isRequired,
	...props
}) => (
	<>
		{label && <Label className="form-label">{label}</Label>}
		{isRequired && label && <span className="text-danger"> *</span>}
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
			autoComplete="new-password"
			{...props}
		/>
		{description && <span className="text-muted">{description}</span>}
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
	description,
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
		{description && (
			<div>
				<span className="text-muted">{description}</span>{' '}
			</div>
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
	// eslint-disable-next-line no-unused-vars
	onChange = () => {}, // need for preventing code break
	onBlur,
	isError,
	errorMsg,
	maxDate = moment().utc().startOf('day').toDate(),
	minDate = moment().subtract(100, 'years').utc().toDate(),
	validation,
	dateFormat = 'd M Y',
	minDateField,
	...rest
}) => (
	<div id="datepicker1">
		{label && <Label for={name}>{label}</Label>}
		<FlatPickr
			className="form-control"
			// name={name}
			value={value}
			placeholder={placeholder}
			options={{
				dateFormat,
				minDate: minDateField ? validation.values[minDateField] : minDate,
				maxDate,
			}}
			onChange={(date) => {
				validation.setFieldValue(name, date[0]);
			}}
			// maxDate={maxDate}
			// minDate={minDate}
			{...rest}
		/>
		{isError && errorMsg ? (
			<FormFeedback type="invalid" className="d-block">
				{errorMsg}
			</FormFeedback>
		) : null}
	</div>
);

export const CustomDateTime = ({
	name,
	label,
	placeholder,
	value,
	// eslint-disable-next-line no-unused-vars
	onChange = () => {}, // need for preventing code break
	onBlur,
	isError,
	errorMsg,
	maxDate = moment().utc().startOf('day').toDate(),
	minDate = moment().subtract(100, 'years').utc().toDate(),
	validation,
	minDateField,
	dateFormat = 'MMMM d, yyyy h:mm aa',
	...rest
}) => (
	<div id="datepicker1">
		{label && <Label for={name}>{label}</Label>}
		<DatePicker
			className="form-control"
			// name={name}
			selected={value}
			placeholderText={placeholder}
			showTimeSelect
			dateFormat={dateFormat}
			onChange={(date) => {
				validation.setFieldValue(name, date);
			}}
			monthsShown={1}
			maxDate={maxDate}
			minDate={minDate}
			{...rest}
		/>
		{isError && errorMsg ? (
			<FormFeedback type="invalid" className="d-block">
				{errorMsg}
			</FormFeedback>
		) : null}
	</div>
);

export const CustomRangeSelector = ({
	name,
	label,
	placeholder,
	value = ['', ''],
	rangeKeys = ['fromDate', 'toDate'],
	// eslint-disable-next-line no-unused-vars
	onChange = () => {}, // need for preventing code break
	onBlur,
	isError,
	errorMsg,
	maxDate = moment().utc().startOf('day').toDate(),
	minDate = moment().subtract(100, 'years').utc().toDate(),
	validation,
	dateFormat = 'd M Y',
	customInputClass,
	...rest
}) => (
	<div id="datepicker1">
		{label && <Label for={name}>{label}</Label>}
		<FlatPickr
			className={`form-control ${customInputClass || ''}`}
			// name={name}
			value={value}
			placeholder={placeholder}
			options={{
				mode: 'range',
				dateFormat,
				minDate,
				maxDate,
			}}
			onChange={(date) => {
				validation.setFieldValue(rangeKeys[0], date[0]);
				validation.setFieldValue(rangeKeys[1], date[1]);
			}}
			// maxDate={maxDate}
			// minDate={minDate}
			{...rest}
		/>
		{isError && errorMsg ? (
			<FormFeedback type="invalid" className="d-block">
				{errorMsg}
			</FormFeedback>
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
			<FormFeedback type="invalid" className="d-block">
				{errorMsg}
			</FormFeedback>
		) : null}
	</span>
);

export const CustomButtonGroup = ({
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
	outerDivClass,
	...rest
}) => (
	<>
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
		{label && (
			<Label htmlFor={htmlFor} className={labelClassName} onClick={onClick}>
				{label}
			</Label>
		)}
		{isError && errorMsg ? (
			<FormFeedback type="invalid">{errorMsg}</FormFeedback>
		) : null}
	</>
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
	required,
	description,
	topDescription,
	...rest
}) => (
	<>
		{topDescription && (
			<div>
				<span className="text-muted">{topDescription}</span>{' '}
			</div>
		)}
		<span
			style={{ pointerEvents: disabled ? 'none' : 'auto' }}
			className={`form-check form-switch ${
				switchSizeClass || 'form-switch-md'
			} ${containerClass || 'mb-3 mt-3'}`}
		>
			{label ? (
				<div>
					<Label htmlFor={htmlFor} className={labelClassName}>
						{label}
					</Label>{' '}
					{required ? <span className="text-danger"> *</span> : null}
				</div>
			) : null}
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
		{description && (
			<div>
				<span className="text-muted">{description}</span>{' '}
			</div>
		)}
	</>
);

export const CustomTextEditor = ({
	name,
	label,
	isError,
	errorMsg,
	validation,
	placeholder,
	value,
	defaultValue,
	onValueChange = () => {},
	readOnly,
}) => {
	const prepareDraft = (editorValue) => {
		const draft = htmlToDraft(editorValue);
		const contentState = ContentState.createFromBlockArray(draft.contentBlocks);
		const editorState = EditorState.createWithContent(contentState);
		return editorState;
	};

	const [editorState, setEditorState] = useState(
		value ? prepareDraft(value) : EditorState.createEmpty()
	);

	useEffect(() => {
		if (defaultValue) {
			setEditorState(prepareDraft(defaultValue));
		}
	}, [defaultValue]);

	const onEditorStateChange = (editorStateIns) => {
		setEditorState(editorStateIns);
		const forFormik = draftToHtml(
			convertToRaw(editorStateIns.getCurrentContent())
		);
		if (validation) {
			validation.setFieldValue(
				name,
				editorStateIns.getCurrentContent().hasText() ? forFormik : ''
			);
		}
		onValueChange(
			editorStateIns.getCurrentContent().hasText() ? forFormik : ''
		);
		setEditorState(editorStateIns);
	};

	return (
		<>
			{label && <Label className="form-label">{label}</Label>}
			{isError && label && <span className="text-danger"> *</span>}
			<Editor
				placeholder={placeholder}
				toolbarClassName="toolbarClassName"
				wrapperClassName="wrapperClassName"
				editorClassName="editorClassName"
				editorState={editorState}
				onEditorStateChange={onEditorStateChange}
				readOnly={readOnly}
			/>
			{isError && errorMsg ? (
				<FormFeedback type="invalid" className="d-block">
					{errorMsg}
				</FormFeedback>
			) : null}
		</>
	);
};

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
		customBlurHandler,
		isDisabled,
		onDelete,
		type = 'text',
		minDate,
		minDateField,
		maxDate,
		showThumbnail,
		multiple = false,
		levelIndex,
		levelFieldName,
		minimum,
		maximum,
		adornmentText,
		namesArray,
		isRequired,
		icon,
		defaultValue,
		customThumbnailBackground,
		customPadding,
		description,
		countryCodes,
		rangeKeys,
		topDescription,
		labelClass,
		inputClassName,
		outerDivClass,
		customInputClass,
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
						callBack ? callBack(e) : null;
					}}
					onBlur={(e) => {
						validation.handleBlur(e);
						customBlurHandler ? customBlurHandler(e) : null;
					}}
					placeholder={placeholder}
					validate={{ required: { value: true } }}
					value={validation.values[name]}
					invalid={!!(validation.touched[name] && validation.errors[name])}
					isError
					errorMsg={validation.touched[name] && validation.errors[name]}
					disabled={!!isDisabled}
					min={minimum}
					description={description}
					isRequired={isRequired}
				/>
			);
		case 'select':
			return (
				<CustomSelectField
					label={label}
					name={name}
					isMulti={multiple}
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
					description={description}
				/>
			);
		case 'switch':
			return (
				<CustomSwitchButton
					labelClassName="form-check-label"
					label={label}
					htmlFor={`radio${name}`}
					type="switch"
					id={`radio${name}`}
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
					htmlFor={`switch${name}`}
					id={`switch${name}`}
					type="checkbox"
					name={name}
					checked={!!validation.values[name]}
					inputClassName="form-check-input"
					value={!!validation.values[name]}
					onClick={(e) => {
						callBack && callBack(e);

						validation.setFieldValue(name, !e.target.checked);
					}}
					onBlur={validation.handleBlur}
					disabled={!!isDisabled}
					required={isRequired}
					description={description}
					topDescription={topDescription}
					{...rest}
				/>
			);
		case 'datePicker':
			return (
				<CustomDateField
					name={name}
					label={label}
					placeholder={placeholder}
					value={validation.values[name]}
					onChange={validation.onChange}
					isError
					invalid={!!(validation.touched[name] && validation.errors[name])}
					errorMsg={validation.touched[name] && validation.errors[name]}
					disabled={!!isDisabled}
					maxDate={maxDate}
					minDate={minDate}
					validation={validation}
					minDateField={minDateField}
				/>
			);
		case 'dateTimePicker':
			return (
				<CustomDateTime
					name={name}
					label={label}
					placeholder={placeholder}
					value={validation.values[name]}
					onChange={validation.onChange}
					isError
					invalid={!!(validation.touched[name] && validation.errors[name])}
					errorMsg={validation.touched[name] && validation.errors[name]}
					disabled={!!isDisabled}
					maxDate={maxDate}
					minDate={minDate}
					validation={validation}
					minDateField={minDateField}
				/>
			);

		case 'dateRangeSelector':
			return (
				<CustomRangeSelector
					name={name}
					label={label}
					placeholder={placeholder}
					value={[
						validation.values[rangeKeys?.[0] || 'fromDate'],
						validation.values[rangeKeys?.[1] || 'toDate'],
					]}
					onChange={validation.onChange}
					isError
					invalid={!!(validation.touched[name] && validation.errors[name])}
					errorMsg={validation.touched[name] && validation.errors[name]}
					disabled={!!isDisabled}
					maxDate={maxDate}
					minDate={minDate}
					validation={validation}
					rangeKeys={rangeKeys}
					customInputClass={customInputClass}
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
							callBack && callBack(event);
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
							style={{
								marginTop: 10,
								backgroundColor: customThumbnailBackground,
								padding: customPadding,
							}}
							width={100}
							src={
								// eslint-disable-next-line no-nested-ternary
								typeof validation.values[name] === 'string'
									? validation.values[name]?.includes('http')
										? validation.values[name]
										: `${VITE_APP_AWS_GALLERY_URL}${validation.values[name]}`
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
					defaultValue={defaultValue}
					label={label}
					name={name}
					placeholder={placeholder}
					isError
					errorMsg={validation.touched[name] && validation.errors[name]}
					validation={validation}
					value={validation.values[name]}
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
		case 'buttonGroup':
			return (
				<>
					{label && (
						<Label for={name}>
							{label}
							<span className="text-danger"> *</span>
						</Label>
					)}
					<div className="btn-group">
						{!!optionList.length &&
							optionList.map((option) => (
								<CustomButtonGroup
									labelClassName={labelClass || 'form-check-label'}
									label={option.optionLabel}
									htmlFor={`customRadioInline${option.value}`}
									type="switch"
									id={`customRadioInline${option.value}`}
									value={!!validation?.values?.[name]}
									name={name}
									checked={validation.values[name] === option.value}
									inputClassName={inputClassName || 'form-check-input'}
									onClick={() => {
										validation.setFieldValue(name, option.value);
									}}
									onBlur={validation.handleBlur}
									disabled={!!isDisabled}
									outerDivClass={outerDivClass}
								/>
							))}
					</div>
				</>
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
						{validation.touched[name] && validation.errors[name] ? (
							<FormFeedback type="invalid" className="d-block">
								{validation.errors[name]}
							</FormFeedback>
						) : null}
					</div>
				</>
			);
		case 'radioGroupMulti':
			return (
				<>
					{label && (
						<div className="d-flex align-items-center mb-2 gap-2">
							<Label className="my-0" for={name}>
								{label}
							</Label>
							<CustomSwitchButton
								labelClassName="form-check-label"
								label=""
								htmlFor={label}
								type="switch"
								id={label}
								name="select-all"
								checked={
									!!(validation.values?.[name]?.length === optionList.length)
								}
								inputClassName="form-check-input"
								onClick={() => {
									validation.setFieldValue(
										name,
										validation.values?.[name]?.length === optionList.length
											? []
											: optionList.map((option) => option.value)
									);
								}}
								onBlur={validation.handleBlur}
								disabled={!!isDisabled}
							/>
						</div>
					)}
					<div>
						{!!optionList.length &&
							optionList.map((option) => (
								<CustomSwitchButton
									labelClassName="form-check-label"
									label={option.optionLabel}
									htmlFor={`customRadioInline${option.value}`}
									type="switch"
									id={`customRadioInline${option.value}`}
									name={option.value}
									checked={
										!!(
											validation.values?.[name] &&
											validation.values?.[name].includes(option.value)
										)
									}
									inputClassName="form-check-input"
									onClick={(e) => {
										if (!validation.values[name].includes(e.target.name)) {
											validation.values?.[name]?.length
												? validation.setFieldValue(name, [
														...validation.values[name],
														e.target.name,
												  ])
												: validation.setFieldValue(name, [e.target.name]);
										} else {
											validation.setFieldValue(
												name,
												validation.values[name].filter(
													(value) => value !== e.target.name
												)
											);
										}
									}}
									onBlur={validation.handleBlur}
									disabled={!!isDisabled}
								/>
							))}
					</div>
					{validation.touched[name] && validation.errors[name] ? (
						<FormFeedback type="invalid" className="d-block">
							{validation.errors[name]}
						</FormFeedback>
					) : null}
				</>
			);
		case 'textfieldWithAdornment':
			return (
				<>
					{label && <Label for={name}>{label}</Label>}
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
				</>
			);
		case 'password':
			return (
				<>
					{label && <Label for={name}>{label}</Label>}
					<InputGroup>
						<Input
							type={type}
							name={name}
							placeholder={placeholder}
							value={validation?.values?.[name]}
							onChange={validation.handleChange}
							onBlur={validation.handleBlur}
							invalid={
								!!(validation.touched?.[name] && validation.errors?.[name])
							}
						/>
						<InputGroupText
							className="password-btn btn btn-primary font-size-14"
							onClick={() => callBack()}
						>
							{icon}
						</InputGroupText>
					</InputGroup>
					{validation.touched?.[name] && validation.errors?.[name] ? (
						<FormFeedback type="invalid" className="d-block">
							{validation.touched?.[name] && validation.errors?.[name]}
						</FormFeedback>
					) : null}
				</>
			);

		case 'phone':
			return (
				<>
					{label && <Label for={name}>{label}</Label>}
					<PhoneInput
						masks={countryCodes}
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
						// buttonStyle={{ backgroundColor: '#22214b' }}
						inputStyle={{ width: '100%' }}
					/>
				</>
			);

		default:
			return <div />;
	}
};
