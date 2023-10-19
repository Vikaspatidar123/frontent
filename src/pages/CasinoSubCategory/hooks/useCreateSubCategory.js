import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createCasinoSubCategoryStart,
	getCasinoCategoryDetailStart,
	getLanguagesStart,
	updateCasinoStatusStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateSubCategory = () => {
	const dispatch = useDispatch();
	const [createName, setCreateName] = useState({ EN: '' });
	const [active, setActive] = useState(false);

	const { casinoSubCategoryDetails, isCreateSubCategoryLoading } = useSelector(
		(state) => state.CasinoManagementData
	);
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

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Sub Category',
			initialValues: getInitialValues({ name: createName }),
			validationSchema: validationSchema(createName),
			staticFormFields,
			onSubmitEntry: handleCreateSubCategory,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { status, gameSubCategoryId } = props;
		dispatch(
			updateCasinoStatusStart({
				data: {
					code: 'CASINO_SUB_CATEGORY',
					gameSubCategoryId,
					status: !status,
				},
			})
		);
		setActive((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoSubCategoryDetails?.count]);

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
		if (languageData?.rows?.length && casinoCategoryDetails?.rows?.length) {
			const langOptions = languageData.rows.map((r) => ({
				id: r.languageId,
				optionLabel: r.languageName,
				value: r.code,
			}));
			const categoryOptions = casinoCategoryDetails.rows.map((r) => ({
				id: r.gameCategoryId,
				optionLabel: r.name.EN,
				value: r.gameCategoryId,
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
					label: 'SubCategory Name',
					fieldType: 'inputGroup',
					onDelete: onRemoveLanguage,
				},
				{
					name: 'gameCategoryId',
					label: 'Game Category',
					fieldType: 'select',
					optionList: categoryOptions,
				},
				...staticFormFields,
			]);
		}
	}, [languageData, casinoCategoryDetails]);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getCasinoCategoryDetailStart({ limit: '', pageNo: '', name: '' }));
	}, []);

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
		isCreateSubCategoryLoading,
		active,
		setActive,
		handleStatus,
	};
};

export default useCreateSubCategory;
