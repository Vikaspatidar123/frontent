import React from 'react';
import PropTypes, { oneOfType } from 'prop-types';
import { Col } from 'reactstrap';
import { CustomTextEditor } from '../../helpers/customForms';

const CustomComponent = ({ validation, isEdit, isView }) => (
	<Col className="mb-2">
		{(isEdit || isView) &&
		!Object.keys(validation?.values?.content ? validation?.values?.content : {})
			?.length ? null : (
			<CustomTextEditor
				label="Content"
				name={`content[${validation?.values?.language}]`}
				placeholder="Enter Content"
				validate={{ required: { value: true } }}
				isError
				validation={validation}
				defaultValue={
					validation?.values?.content?.[validation?.values?.language]
				}
				value={validation?.values?.content?.[validation?.values?.language]}
				errorMsg={validation.errors?.content?.[validation?.values?.language]}
				readOnly={isView}
			/>
		)}
	</Col>
);

const EmailTemplateId = ({ value }) => value ?? '';

const Label = ({ value }) => value ?? '';

const Primary = ({ value }) => (value ? 'Yes' : 'No');

CustomComponent.defaultProps = {
	isEdit: false,
	isView: false,
};

CustomComponent.propTypes = {
	validation: PropTypes.objectOf(
		oneOfType([
			PropTypes.object,
			PropTypes.func,
			PropTypes.bool,
			PropTypes.number,
			PropTypes.string,
		])
	).isRequired,
	isEdit: PropTypes.string,
	isView: PropTypes.string,
};

export { EmailTemplateId, Label, Primary, CustomComponent };
