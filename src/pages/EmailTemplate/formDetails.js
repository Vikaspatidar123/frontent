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

const staticFormFields = (isEdit) => [
	{
		name: 'label',
		fieldType: 'textField',
		label: 'Template Label',
		placeholder: 'Enter Template Label',
		fieldColOptions: { lg: 3 },
	},
	{
		name: 'type',
		label: 'Template Type',
		placeholder: 'Select Template Type',
		fieldType: 'select',
		fieldColOptions: { lg: 3 },
		isDisabled: isEdit || false,
		optionList: Object.keys(EMAIL_TEMPLATE_EVENT_TYPES || {})?.map((item) => ({
			value: EMAIL_TEMPLATE_EVENT_TYPES[item],
			optionLabel: item,
		})),
	},
	{
		name: 'isDefault',
		label: 'Mark Default',
		fieldType: 'toggle',
		containerClass: 'form-switch-md mt-4',
		isDisabled: isEdit || false,
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

const initialData = {
	label: '',
	type: null,
	isDefault: false,
	content: {
		EN: '',
	},
};

export {
	getInitialValues,
	staticFormFields,
	emailTemplateSchema,
	getTestEmailInitialValues,
	staticTestEmailFormFields,
	initialData,
};
