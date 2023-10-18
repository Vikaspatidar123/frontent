import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createCasinoCategoryStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateCategory = () => {
	const dispatch = useDispatch();
	const [createName, setCreateName] = useState({ EN: '' });
	const { casinoCategoryDetails, languageData, isCreateCategoryLoading } =
		useSelector((state) => state.CasinoManagementData);

	const handleCreateCategory = (values) => {
		dispatch(
			createCasinoCategoryStart({
				data: values,
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Category',
			initialValues: getInitialValues({ name: createName }),
			validationSchema: validationSchema(createName),
			staticFormFields,
			onSubmitEntry: handleCreateCategory,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoCategoryDetails?.count]);

	const onChangeLanguage = (e) => {
		setCreateName((prev) => ({ ...prev, [e.target.value]: '' }));
	};

	const onRemoveLanguage = (e) => {
		setCreateName((prev) => {
			const { [e]: key, ...rest } = prev;
			return rest;
		});
	};

	useEffect(() => {
		if (languageData?.rows?.length) {
			const langOptions = languageData.rows.map((r) => ({
				id: r.languageId,
				optionLabel: r.languageName,
				value: r.code,
			}));

			setFormFields([
				{
					// name: 'language',
					fieldType: 'select',
					label: 'Language',
					placeholder: 'Select Language',
					optionList: langOptions,
					callBack: onChangeLanguage,
				},
				{
					name: 'name',
					label: 'Category Name',
					fieldType: 'inputGroup',
					onDelete: onRemoveLanguage,
				},
				...staticFormFields,
			]);
		}
	}, [languageData]);

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
		},
	]);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		buttonList,
		isCreateCategoryLoading,
	};
};

export default useCreateCategory;
