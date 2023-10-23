import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editCasinoGamesStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';

const useEditCasinoGames = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		casinoCategoryDetails,
		isEditCasinoGamesLoading,
		isEditCasinoGamesSuccess,
	} = useSelector((state) => state.CasinoManagementData);

	const { casinoProvidersData, casinoSubCategoryDetails } = useSelector(
		(state) => state.CasinoManagementData
	);

	const handleEditCasinoGames = (values) => {
		dispatch(
			editCasinoGamesStart({
				data: values,
			})
		);
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
		setIsEdit({ open: !isEdit, selectedRow });
		validation.setValues(getInitialValues(selectedRow));
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [casinoCategoryDetails?.count]);

	useEffect(() => {
		if (
			casinoSubCategoryDetails?.rows?.length &&
			casinoProvidersData?.rows?.length
		) {
			const provOptions = casinoProvidersData.rows.map((r) => ({
				id: r.casinoProviderId,
				optionLabel: r.name,
				value: r.casinoProviderId,
			}));

			const subOptions = casinoSubCategoryDetails.rows.map((r) => ({
				id: r.gameSubCategoryId,
				optionLabel: r.name?.EN,
				value: r.gameSubCategoryId,
			}));

			setFormFields([
				...staticFormFields,
				{
					name: 'gameSubCategoryId',
					fieldType: 'select',
					label: 'Casino Sub Category',
					placeholder: 'Select sub category',
					optionList: subOptions,
				},
				{
					name: 'casinoProviderId',
					label: 'Provider Name',
					fieldType: 'select',
					optionList: provOptions,
					isDisabled: true,
				},
			]);
		}
	}, [casinoSubCategoryDetails, casinoProvidersData]);

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
