/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	language: '',
	name: defaultValue?.name || '',
	providerId: defaultValue?.id || null,
	file: defaultValue?.iconUrl || '',
});

const validateName = (name) => {
	const validationObject = {};
	for (const file in name) {
		validationObject[file] = Yup.string()
			.required('Label Name Required!')
			.nullable();
	}
	return Yup.object(validationObject);
};

const validationSchema = (name) =>
	Yup.object().shape({
		name: validateName(name),
		file: Yup.mixed()
			.test('File Size', 'File Size Should be Less Than 1MB', (value) =>
				typeof value === 'string'
					? true
					: !value || (value && value.size <= 1024 * 1024)
			)
			.when(
				'$isFilePresent',
				(isFilePresent, schema) =>
					isFilePresent[0] &&
					schema.test(
						'FILE_SIZE',
						'Please select any file.',
						(value) =>
							value && (typeof value === 'string' ? true : value.size > 0)
					)
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
		name: 'file',
		fieldType: 'file',
		label: 'Thumbnail',
		placeholder: 'Enter Thumbnail ',
		showThumbnail: true,
	},
];

// Provider filter
const staticFiltersFields = () => [
	{
		name: 'searchString',
		fieldType: 'textField',
		label: '',
		placeholder: 'Search by provider',
	},
];

const filterValues = () => ({
	searchString: '',
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
	});

export {
	validationSchema,
	getInitialValues,
	staticFormFields,
	staticFiltersFields,
	filterValues,
	filterValidationSchema,
};
