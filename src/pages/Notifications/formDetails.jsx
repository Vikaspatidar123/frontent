import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	language: defaultValue?.language || 'EN',
	title: defaultValue?.title || { EN: '' },
	description: defaultValue?.description || { EN: '' },
	icon: defaultValue?.icon || '',
});

const validationSchema = () =>
	Yup.object().shape({
		title: Yup.object().shape({
			EN: Yup.string().required(
				'Title in at least english language is required.'
			),
		}),
		description: Yup.object().shape({
			EN: Yup.string().required(
				'Description in at least english language is required.'
			),
		}),
	});

export { validationSchema, getInitialValues };
