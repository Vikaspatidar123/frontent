/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import * as Yup from 'yup';

const getInitialValues = (defaultValue) => ({
	casinoGameId: defaultValue?.casinoGameId || '',
	name: defaultValue?.name || '',
	gameSubCategoryId: defaultValue?.ganeSubCategoryId || '',
	casinoProviderId: defaultValue?.casinoProviderId || '',
	isActive: defaultValue?.isActive || false,
	thumbnail: defaultValue?.thumbnail || null,
});

const validationSchema = Yup.object().shape({
	name: Yup.string().required('Game Name Required'),
	gameSubCategoryId: Yup.string().required('Sub-Category  Required').nullable(),
	casinoProviderId: Yup.string()
		.required('Casino Provider Id Required')
		.nullable(),
});

const staticFormFields = [
	{
		name: 'name',
		fieldType: 'textField',
		label: 'Game Name',
	},
	{
		name: 'thumbnail',
		fieldType: 'file',
		label: 'Thumbnail',
		showThumbnail: true,
	},
	{
		name: 'isActive',
		fieldType: 'switch',
		label: 'Active',
	},
];

export { validationSchema, getInitialValues, staticFormFields };
