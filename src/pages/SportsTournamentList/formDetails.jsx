import * as Yup from 'yup';

// Filters
const staticFiltersFields = () => [];

const filterValues = () => ({
	searchString: '',
	locationId: null,
	sportId: null,
});

const filterValidationSchema = () =>
	Yup.object({
		searchString: Yup.string().nullable(),
		locationId: Yup.string().nullable(),
		sportId: Yup.string().nullable(),
	});

export { staticFiltersFields, filterValues, filterValidationSchema };
