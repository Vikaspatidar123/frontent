import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createCasinoCategoryStart,
	editCasinoCategoryStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateCategory = () => {
	const dispatch = useDispatch();
	const [langState, setLangState] = useState({ EN: '' });
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		casinoCategoryDetails,
		languageData,
		isCreateCategoryLoading,
		isEditCategoryLoading,
		isEditCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);

	const handleCreateCategory = (values) => {
		dispatch(
			createCasinoCategoryStart({
				data: values,
			})
		);
	};

	const handleEditCategory = (values) => {
		dispatch(
			editCasinoCategoryStart({
				data: { ...values, gameCategoryId: isEdit.selectedRow.gameCategoryId },
			})
		);
	};

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		setHeader,
	} = useForm({
		header: 'Add Category',
		initialValues: getInitialValues({ name: { EN: '' } }),
		validationSchema: validationSchema(langState),
		staticFormFields,
		onSubmitEntry: isEdit.open ? handleEditCategory : handleCreateCategory,
	});

	useEffect(() => {
		if (isEditCategorySuccess) setIsOpen(false);
	}, [isEditCategorySuccess]);

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add Category');
		setIsEdit({ open: false, selectedRow: '' });
	};

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Category');
		validation.setValues(getInitialValues(selectedRow));
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoCategoryDetails?.count]);

	const onChangeLanguage = (e) => {
		validation.setValues((prev) => ({
			...prev,
			name: { ...prev.name, [e.target.value]: '' },
		}));
		setLangState((prev) => ({ ...prev, [e.target.value]: '' }));
	};

	const onRemoveLanguage = (e) => {
		validation.setValues((prev) => {
			const { name } = prev;
			const { [e]: key, ...rest } = name;
			return { ...prev, name: rest };
		});
		setLangState((prev) => {
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
		isEditCategoryLoading,
		onClickEdit,
	};
};

export default useCreateCategory;
