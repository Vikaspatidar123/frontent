import * as Yup from 'yup';

// Filters
const staticFiltersFields = () => [];

const filterValues = () => ({
	searchString: '',
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
