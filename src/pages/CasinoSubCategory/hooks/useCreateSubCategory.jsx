import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { isEmpty } from 'lodash';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';

import {
	createCasinoSubCategoryStart,
	editCasinoSubCategoryStart,
	getCasinoCategoryDetailStart,
	getLanguagesStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { modules } from '../../../constants/permissions';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { dataURLtoBlob } from '../../../utils/helpers';

const useCreateSubCategory = () => {
	const dispatch = useDispatch();
	const [langState, setLangState] = useState({ EN: '' });
	const [showModal, setShowModal] = useState(false);
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });

	const {
		casinoSubCategoryDetails,
		isCreateSubCategoryLoading,
		isEditSubCategorySuccess,
		isEditSubCategoryLoading,
	} = useSelector((state) => state.CasinoManagementData);
	const { casinoCategoryDetails, languageData } = useSelector(
		(state) => state.CasinoManagementData
	);

	const handleCreateSubCategory = (values) => {
		dispatch(
			createCasinoSubCategoryStart({
				data: values,
			})
		);
	};

	const handleEditSubCategory = (values) => {
		dispatch(
			editCasinoSubCategoryStart({
				data: {
					...values,
					subcategoryImage:
						typeof values.subcategoryImage === 'string'
							? ''
							: values.subcategoryImage,
					casinoSubCategoryId: isEdit.selectedRow.gameSubCategoryId,
				},
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
		header: 'Add Sub Category',
		initialValues: getInitialValues({ name: { EN: '' } }),
		validationSchema: validationSchema(langState),
		staticFormFields,
		onSubmitEntry: isEdit.open
			? handleEditSubCategory
			: handleCreateSubCategory,
	});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add Sub Category');
		setIsEdit({ open: false, selectedRow: '' });
	};

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Sub Category');
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
		setIsOpen(false);
	}, [casinoSubCategoryDetails?.count]);

	useEffect(() => {
		if (isEditSubCategorySuccess) setIsOpen(false);
	}, [isEditSubCategorySuccess]);

	useEffect(() => {
		if (languageData?.rows?.length && casinoCategoryDetails?.rows?.length) {
			const langOptions = languageData.rows.map((r) => ({
				id: r.id,
				optionLabel: r.name,
				value: r.code,
			}));
			const categoryOptions = casinoCategoryDetails.rows.map((r) => ({
				id: r.gameCategoryId,
				optionLabel: r.name.EN,
				value: r.gameCategoryId,
			}));
			setFormFields([
				{
					name: 'language',
					fieldType: 'select',
					label: 'Language',
					placeholder: 'Select Language',
					optionList: langOptions,
					callBack: onChangeLanguage,
				},
				{
					name: 'name',
					label: 'SubCategory Name',
					fieldType: 'inputGroup',
					onDelete: onRemoveLanguage,
				},
				{
					name: 'gameCategoryId',
					label: 'Game Category',
					fieldType: 'select',
					optionList: categoryOptions,
					isDisabled: isEdit.open,
				},
				...staticFormFields,
			]);
		}
	}, [languageData, casinoCategoryDetails, isEdit]);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getCasinoCategoryDetailStart({ limit: '', pageNo: '', name: '' }));
	}, []);

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.CasinoManagement,
			operation: 'C',
		},
		{
			label: 'Reorder',
			handleClick: '',
			link: 'reorder',
			module: modules.CasinoManagement,
			operation: 'U',
		},
	]);

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.subCategories) &&
			!isEdit.open &&
			isOpen
		) {
			const storedValues = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.subCategories))
			);

			if (storedValues?.subcategoryImage?.thumbnail) {
				const base64Content = storedValues.subcategoryImage?.thumbnail;
				const blob = dataURLtoBlob(base64Content);

				storedValues.subcategoryImage = new File(
					[blob],
					storedValues.subcategoryImage.name,
					{
						type: blob.type,
					}
				);
			}

			validation.setValues(storedValues);
		}
	}, [isOpen]);

	const toggleFormModal = () => {
		if (!isEdit.open) {
			const hasFilledValues = Object.values(validation.values).some((value) =>
				value instanceof File
					? value.size > 0
					: !isEmpty(value) && !isEmpty(value?.EN)
			);
			if (hasFilledValues) {
				setShowModal(!showModal);
			}
		}
		setIsOpen((prev) => !prev);
	};

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		buttonList,
		isCreateSubCategoryLoading,
		onClickEdit,
		isEditSubCategoryLoading,
		toggleFormModal,
		showModal,
		setShowModal,
	};
};

export default useCreateSubCategory;
