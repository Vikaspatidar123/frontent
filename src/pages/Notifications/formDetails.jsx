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
			EN: Yup.string().required(
				'Title in at least english language is required.'
			),
		}),
		description: Yup.object().shape({
			EN: Yup.string().required(
				'Description in at least english language is required.'
			),
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

export { validationSchema, getInitialValues };
