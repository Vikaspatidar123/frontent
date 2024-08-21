import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { isEmpty } from 'lodash';
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
import { modules } from '../../../constants/permissions';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import ButtonList from '../../../components/Common/ButtonList';

const useCreateCategory = () => {
	const dispatch = useDispatch();
	const [langState, setLangState] = useState({ EN: '' });
	const [showModal, setShowModal] = useState(false);
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		languageData,
		isCreateCategoryLoading,
		isEditCategoryLoading,
		isEditCategorySuccess,
		isCreateCategorySuccess,
	} = useSelector((state) => state.CasinoManagementData);

	const handleCreateCategory = (values) => {
		dispatch(
			createCasinoCategoryStart({
				payload: {
					...values,
					uniqueId: uuid(),
				},
			})
		);
	};

	const handleEditCategory = (values) => {
		dispatch(
			editCasinoCategoryStart({
				data: { ...values, categoryId: isEdit.selectedRow.id },
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

	useEffect(() => {
		if (isCreateCategorySuccess) setIsOpen(false);
	}, [isCreateCategorySuccess]);

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
		if (languageData?.languages?.length) {
			const langOptions = languageData?.languages?.map((r) => ({
				id: r.id,
				optionLabel: r.name,
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
			module: modules.casinoManagement,
			operation: 'C',
		},
		{
			label: 'Reorder',
			handleClick: '',
			link: 'reorder',
			module: modules.casinoManagement,
			operation: 'U',
		},
	]);

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.categories) &&
			!isEdit.open &&
			isOpen
		) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.categories))
			);
			validation.setValues(values);
		}
	}, [isOpen]);

	const toggleFormModal = () => {
		if (!isEdit.open) {
			const hasFilledValues = Object.values(validation.values).some(
				(value) => !isEmpty(value) && !isEmpty(value?.EN)
			);
			if (hasFilledValues) {
				setShowModal(!showModal);
			}
		}
		setIsOpen((prev) => !prev);
	};

	// eslint-disable-next-line react/react-in-jsx-scope
	const actionList = <ButtonList buttonList={buttonList} />;

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
		showModal,
		setShowModal,
		toggleFormModal,
		actionList,
	};
};

export default useCreateCategory;
