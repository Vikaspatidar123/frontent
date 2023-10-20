import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createKYCLabelsStart,
	editKYCLabelsStart,
	getLanguagesStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateKYCLabels = () => {
	const dispatch = useDispatch();
	const [createName, setCreateName] = useState({ EN: '' });
	const [isEditPage, setIsEditPage] = useState({
		open: false,
		selectedRow: '',
	});
	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const {
		documentLabels,
		isCreateKYCLabelsLoading,
		isEditKYCLabelsLoading,
		isEditKYCLabelsSuccess,
	} = useSelector((state) => state.SASettings);
	const handleCreateKYCLabels = (values) => {
		dispatch(
			createKYCLabelsStart({
				data: { ...values, documentLabelId: '' },
			})
		);
	};

	const handleEditKYCLabels = (values) => {
		dispatch(
			editKYCLabelsStart({
				data: {
					...values,
					documentLabelId: isEditPage.selectedRow?.documentLabelId,
				},
			})
		);
	};

	const {
		isOpen,
		setIsOpen,
		header,
		setHeader,
		validation,
		formFields,
		setFormFields,
	} = useForm({
		header: 'Add KYC Labels',
		initialValues: getInitialValues({ name: createName }),
		validationSchema: validationSchema(createName),
		staticFormFields,
		onSubmitEntry: isEditPage.open
			? handleEditKYCLabels
			: handleCreateKYCLabels,
	});

	const onClickEditButton = (e, selectedRow) => {
		e.preventDefault();
		e.stopPropagation();
		setIsEditPage({ open: true, selectedRow });
		setHeader(`Edit KYC Labels : Label ${selectedRow.documentLabelId}`);
		setCreateName(selectedRow.name);
		validation.resetForm(getInitialValues(selectedRow));
		setIsOpen((prev) => !prev);
	};

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add KYC Labels');
		setCreateName({ EN: '' });
		setIsEditPage({ open: false, selectedRow: '' });
	};

	useEffect(() => {
		setIsOpen(false);
	}, [documentLabels?.length]);

	useEffect(() => {
		if (isEditKYCLabelsSuccess) setIsOpen(false);
	}, [isEditKYCLabelsSuccess]);

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
					label: 'KYCLabels Name',
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

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
	}, []);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		buttonList,
		isCreateKYCLabelsLoading,
		onClickEditButton,
		isEditKYCLabelsLoading,
	};
};

export default useCreateKYCLabels;
