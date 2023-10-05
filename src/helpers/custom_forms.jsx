/* eslint-disable no-debugger */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react'
import { ErrorMessage } from 'formik'

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
  component = 'div',
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
      {label && <Label className='form-label'>{label}</Label>}
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
  )
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
  component = 'div',
  className = 'text-danger',
  isError = false,
  errorMsg,
  ...props
}) => (
  <>
    {label && <Label for={name}>{label}</Label>}
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
      <FormFeedback type="invalid">
        {errorMsg}
      </FormFeedback>
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
  component = 'div',
  isError,
  className = 'text-danger',
  ...props
}) => (
  <>
    {label && <Label for={name}> Datetime </Label>}
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

