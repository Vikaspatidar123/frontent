import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	title: defaultValue?.title || '',
	comment: defaultValue?.comment || '',
});

const validationSchema = () =>
	Yup.object().shape({
		title: Yup.string().required('Title Required'),
		comment: Yup.string().required('Comment Required'),
	});

const staticFormFields = [
	{
		name: 'title',
		fieldType: 'textField',
		label: 'Title',
		required: true,
		placeholder: 'Enter the Title',
	},
	{
		name: 'comment',
		fieldType: 'textField',
		label: 'Comment',
		required: true,
		placeholder: 'Enter Comment',
	},
];

export { validationSchema, getInitialValues, staticFormFields };
