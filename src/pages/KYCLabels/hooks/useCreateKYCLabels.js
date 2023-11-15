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
import { modules } from '../../../constants/permissions';

const useCreateKYCLabels = () => {
	const dispatch = useDispatch();
	const [langState, setLangState] = useState({ EN: '' });
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
		initialValues: getInitialValues({ name: { EN: '' } }),
		validationSchema: validationSchema(langState),
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
		validation.setValues(getInitialValues(selectedRow));
		setIsOpen((prev) => !prev);
	};

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add KYC Labels');
		setIsEditPage({ open: false, selectedRow: '' });
	};

	useEffect(() => {
		setIsOpen(false);
	}, [documentLabels?.length]);

	useEffect(() => {
		if (isEditKYCLabelsSuccess) setIsOpen(false);
	}, [isEditKYCLabelsSuccess]);

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
			module: modules.KycLabel,
			operation: 'C',
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
