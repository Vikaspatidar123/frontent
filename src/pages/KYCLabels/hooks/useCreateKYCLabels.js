import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createKYCLabelsStart,
	getLanguagesStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateKYCLabels = () => {
	const dispatch = useDispatch();
	const [createName, setCreateName] = useState({ EN: '' });
	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { documentLabels, isCreateKYCLabelsLoading } = useSelector(
		(state) => state.SASettings
	);
	const handleCreateKYCLabels = (values) => {
		dispatch(
			createKYCLabelsStart({
				data: { ...values, documentLabelId: '' },
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add KYC Labels',
			initialValues: getInitialValues({ name: createName }),
			validationSchema: validationSchema(createName),
			staticFormFields,
			onSubmitEntry: handleCreateKYCLabels,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [documentLabels?.length]);

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
	};
};

export default useCreateKYCLabels;
