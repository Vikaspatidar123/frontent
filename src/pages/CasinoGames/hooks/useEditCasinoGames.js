import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import // editCasinoGamesStart,
'../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useEditCasinoGames = () => {
	// const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		casinoCategoryDetails,
		languageData,
		isEditCasinoGamesLoading,
		isEditCasinoGamesSuccess,
	} = useSelector((state) => state.CasinoManagementData);

	const handleEditCasinoGames = (values) => {
		console.log(values, isEdit);
		// dispatch(
		//   editCasinoGamesStart({
		//     data: values,
		//   })
		// );
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Edit Casino Game',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleEditCasinoGames,
		});

	useEffect(() => {
		if (isEditCasinoGamesSuccess) setIsOpen(false);
	}, [isEditCasinoGamesSuccess]);

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		validation.setValues(getInitialValues(selectedRow));
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoCategoryDetails?.count]);

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
				},
				{
					name: 'name',
					label: 'Category Name',
					fieldType: 'inputGroup',
				},
				...staticFormFields,
			]);
		}
	}, [languageData]);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		isEditCasinoGamesLoading,
		onClickEdit,
	};
};

export default useEditCasinoGames;
