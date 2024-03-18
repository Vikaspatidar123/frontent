import * as Yup from 'yup';
import { EMAIL_TEMPLATE_EVENT_TYPES } from './Constant';

const getInitialValues = (emailTemplate) => ({
	label: emailTemplate?.label || '',
	type: emailTemplate?.eventType || null,
	isDefault: emailTemplate?.isDefault || false,
});

const getTestEmailInitialValues = () => ({
	emailTemplateEmail: '',
});

const emailTemplateSchema = Yup.object().shape({
	label: Yup.string().required('Label Required!'),
	type: Yup.string().required('Type Required!'),
});

const staticFormFields = () => [
	{
		name: 'label',
		fieldType: 'textField',
		label: 'Template Label',
		placeholder: 'Enter Promotion Title',
		// isDisabled: isView || false,
	},
	{
		name: 'type',
		label: 'Template Type',
		placeholder: 'Select Template Type',
		fieldType: 'select',
		// isDisabled: isEdit || false,
		optionList: Object.keys(EMAIL_TEMPLATE_EVENT_TYPES || {})?.map((item) => ({
			value: EMAIL_TEMPLATE_EVENT_TYPES[item],
			optionLabel: item,
		})),
	},
	{
		name: 'isDefault',
		label: 'Mark Default',
		fieldType: 'toggle',
		// isDisabled: isEdit || false,
	},
];

const staticTestEmailFormFields = (setTestEmailCallBack) => [
	{
		name: 'emailTemplateEmail',
		fieldType: 'textField',
		label: 'Email',
		placeholder: 'Enter Email',
		callBack: setTestEmailCallBack,
	},
];

export {
	getInitialValues,
	staticFormFields,
	emailTemplateSchema,
	getTestEmailInitialValues,
	staticTestEmailFormFields,
};
