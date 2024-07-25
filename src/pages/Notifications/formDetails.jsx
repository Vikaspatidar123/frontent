import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	language: defaultValue?.language || 'EN',
	title: defaultValue?.title || { EN: '' },
	description: defaultValue?.description || { EN: '' },
	file: defaultValue?.image || '',
	url: defaultValue?.url || '',
});

const isRequired = (value) => {
	if (typeof value === 'string' && value?.length > 0) return true;
	// if (!value || !value.size) return false;
	return true;
};

const validationSchema = () =>
	Yup.object().shape({
		title: Yup.object().shape({
			EN: Yup.string()
				.required('Title in at least English language is required.')
				.max(50, 'Title must be less than 50 characters.'),
		}),
		description: Yup.object().shape({
			EN: Yup.string()
				.required('Description in at least English language is required.')
				.max(200, 'Description must be less than 200 characters.'),
		}),
		url: Yup.string()
			.matches(
				/^((https?):\/\/)?(www\.)?(([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s]*)?(\?[^\s]*)?|((https?):\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/[^\s]*)?(\?[^\s]*)?$/,
				'Enter correct URL!'
			)
			.nullable(),

		file: Yup.mixed()
			.nullable()
			.test('required', 'Image Required', isRequired)
			// .imageDimensionCheck('Image Required', {
			// 	exactWidth: 442,
			// 	exactHeight: 240,
			// })
			.test('File Size', 'File Size Should be Less Than 1MB', (value) =>
				typeof value === 'string'
					? true
					: !value || (value && value.size <= 1024 * 1024)
			)
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string'
					? true
					: !value ||
					  (value &&
							['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
			),
	});

const getInitialNotifyData = (defaultValue) => ({
	userId: defaultValue?.userId || [],
	title: defaultValue?.title || '',
	body: defaultValue?.body || '',
});

const validatedNotify = () =>
	Yup.object().shape({
		title: Yup.string()
			.required('Title is required!')
			.max(50, 'Title must be less than 50 characters'),
		body: Yup.string()
			.required('Description is required!')
			.max(200, 'Description must be less than 200 characters'),
		url: Yup.string()
			.matches(
				/^((https?):\/\/)?(www\.)?(([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,}|(\d{1,3}\.){3}\d{1,3}))(:\d+)?(\/[^\s]*)?(\?[^\s]*)?|((https?):\/\/)?(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(:\d+)?(\/[^\s]*)?(\?[^\s]*)?$/,
				'Enter correct URL!'
			)
			.nullable(),
		file: Yup.mixed()
			.nullable()
			.test('File Size', 'File Size Should be Less Than 1MB', (value) =>
				typeof value === 'string'
					? true
					: !value || (value && value.size <= 1024 * 1024)
			)
			.test('FILE_FORMAT', 'Uploaded file has unsupported format.', (value) =>
				typeof value === 'string'
					? true
					: !value ||
					  (value &&
							['image/png', 'image/jpeg', 'image/jpg'].includes(value.type))
			),
	});

const leftStaticFormFields = [
	{
		name: 'title',
		fieldType: 'textField',
		label: 'Enter title',
		placeholder: 'Enter title of notification',
		isRequired: true,
		divClass: 'title-margin',
	},
	{
		name: 'url',
		fieldType: 'textField',
		label: 'Enter redirect url',
		placeholder: 'Enter redirect url',
	},
	{
		name: 'choosePlayers',
		fieldType: 'toggle',
		label: 'Choose players',
		fieldColOptions: { xl: 2, lg: 2, md: 3 },
		switchSizeClass:
			'd-flex justify-content-between form-switch-md px-0 pt-2 mt-4',
	},
];

const rightStaticFormFields = [
	{
		name: 'body',
		fieldType: 'textField',
		type: 'textarea',
		label: 'Enter description',
		placeholder: 'Enter description of notification',
		isRequired: true,
	},

	{
		name: 'file',
		fieldType: 'file',
		label: 'Upload icon',
		placeholder: 'Upload icon',
		showThumbnail: true,
	},
];

export {
	validationSchema,
	getInitialValues,
	getInitialNotifyData,
	validatedNotify,
	leftStaticFormFields,
	rightStaticFormFields,
};
