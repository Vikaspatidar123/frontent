/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { editCountryStart, getLanguagesStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useEditCountry = () => {
	const dispatch = useDispatch();
	const {
		editCountriesLoading: isEditCountryLoading,
		editCountriesSuccess: isEditCountrySuccess,
	} = useSelector((state) => state.Countries);

	const { languageData } = useSelector((state) => state.CasinoManagementData);

	const handleEditCountry = (values) => {
		dispatch(
			editCountryStart({
				data: {
					languageId: Number(values.languageId),
					countryId: Number(values.countryId),
					kycMethod: Number(values.kycMethod),
				},
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Edit Country Data',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleEditCountry,
		});

	useEffect(() => {
		if (isEditCountrySuccess) setIsOpen(false);
	}, [isEditCountrySuccess]);

	const handleEditClick = (selectedRow) => {
		validation.setValues(selectedRow);
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (languageData?.rows?.length) {
			const langOptions = languageData.rows.map((r) => ({
				id: r.languageId,
				optionLabel: r.languageName,
				value: r.languageId,
			}));

			setFormFields([
				...staticFormFields,
				{
					name: 'languageId',
					fieldType: 'select',
					label: 'Language',
					placeholder: 'Select Language',
					optionList: langOptions,
				},
			]);
		}
	}, [languageData]);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	}, []);

	useEffect(() => {
		if (isEditCountrySuccess) setIsOpen(false);
	}, [isEditCountrySuccess]);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		isEditCountryLoading,
		handleEditClick,
	};
};

export default useEditCountry;
