import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	categoryName: defaultValue?.name || '',
	selectedLang: defaultValue?.selectedLang || '',
	isActive: defaultValue?.isActive || false,
});

// export const casinoCategorySchema = (name) => Yup.object().shape({
//   categoryName: validateName(name)
// })

// const validateName = (name) => {
//   const validationObject = {}
//   for (const file in name) {
//     validationObject[file] = Yup
//       .string()
//       .required('Category Name Required!').nullable()
//   }
//   return Yup.object(validationObject)
// }

const validationSchema = () =>
	Yup.object().shape({
		categoryName: Yup.string().required('Category Name Required!').nullable(),
	});

const staticFormFields = [
	{
		name: 'categoryName',
		fieldType: 'textField',
		label: 'Category Name',
		placeholder: 'Enter Category Name',
	},
	{
		name: 'isActive',
		fieldType: 'switch',
		label: 'Active',
	},
];

export { validationSchema, getInitialValues, staticFormFields };
