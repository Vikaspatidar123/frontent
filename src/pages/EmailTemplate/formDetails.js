import * as Yup from 'yup';
import { EMAIL_TEMPLATE_EVENT_TYPES } from './Constant';

const getInitialValues = (emailTemplate) => ({
	label: emailTemplate?.[0]?.label || '',
	type: emailTemplate?.[0]?.type || 0,
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
		placeholder: 'Enter Promotion Title',
		// isDisabled: isView || false,
	},
	{
		name: 'type',
		label: 'Template Type',
		fieldType: 'select',
		isDisabled: isEdit || false,
		optionList: Object.values(EMAIL_TEMPLATE_EVENT_TYPES || {})?.map(
			(item) => ({
				value: item,
				optionLabel: item,
			})
		),
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
