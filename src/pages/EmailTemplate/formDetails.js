import * as Yup from 'yup';

const getInitialValues = () => ({
	label: '',
	type: 0,
});

const getTestEmailInitialValues = () => ({
	emailTemplateEmail: '',
});

const emailTemplateSchema = Yup.object().shape({
	label: Yup.string().required('Label Required!'),
	type: Yup.string().required('Type Required!'),
});

const staticFormFields = (emailTemplateOrder) => [
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
		// isDisabled: isView || false,
		optionList: emailTemplateOrder?.map((item, index) => ({
			value: index,
			optionLabel: item,
		})),
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
