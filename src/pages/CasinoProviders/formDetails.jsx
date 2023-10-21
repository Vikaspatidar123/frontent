import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	name: defaultValue?.name || '',
	gameAggregatorId: defaultValue?.gameAggregatorId || '',
	isActive: defaultValue?.isActive || false,
	thumbnail: defaultValue?.thumbnail || '',
});

const validationSchema = () =>
	Yup.object().shape({
		name: Yup.string()
			.max(50, 'Name must be less than 50 characters')
			.matches(/^[A-Za-z0-9 ]+$/, 'Only Alpha-Numeric Values Allowed')
			.required('Provider Name Required'),
		gameAggregatorId: Yup.string().required('Aggregator Required'),
		thumbnail: Yup.mixed()
			.required('A file is required')
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

const staticFormFields = [
	{
		name: 'name',
		fieldType: 'textField',
		label: 'Provider Name',
		placeholder: 'Enter Provider Name',
	},
	{
		name: 'isActive',
		fieldType: 'switch',
		label: 'Active',
	},
	{
		name: 'thumbnail',
		fieldType: 'file',
		label: 'Thumbnail',
		placeholder: 'Enter Thumbnail ',
		showThumbnail: true,
	},
];

export { validationSchema, getInitialValues, staticFormFields };
