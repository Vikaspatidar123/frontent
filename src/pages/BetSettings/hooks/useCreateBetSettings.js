import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createBetSettingsStart,
	editBetSettingsStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { modules } from '../../../constants/permissions';

const useCreateBetSettings = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		isCreateBetSettingsLoading,
		betSettingsList,
		isEditBetSettingsSuccess,
	} = useSelector((state) => state.BetSettings);
	const { sportsListInfo } = useSelector((state) => state.SportsList);

	const handleCreateBetSettings = (values) => {
		dispatch(
			createBetSettingsStart({
				data: values,
			})
		);
	};

	const handleEditBetSettings = (values) => {
		dispatch(
			editBetSettingsStart({
				data: { ...values, betSettingId: isEdit.selectedRow.betSettingId },
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
		header: 'Add Bet Settings',
		initialValues: getInitialValues(),
		validationSchema,
		staticFormFields,
		onSubmitEntry: isEdit?.open
			? handleEditBetSettings
			: handleCreateBetSettings,
	});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Create Bet Settings');
		setIsEdit({ open: false, selectedRow: '' });
	};

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Bet Settings');
		validation.setValues(getInitialValues(selectedRow));
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [betSettingsList?.length]);

	useEffect(() => {
		if (isEditBetSettingsSuccess) setIsOpen(false);
	}, [isEditBetSettingsSuccess]);

	useEffect(() => {
		if (sportsListInfo?.rows?.length) {
			const sportOptions = sportsListInfo.rows.map((r) => ({
				id: r.sportId,
				optionLabel: r.sportName[0].name,
				value: r.sportId,
			}));

			setFormFields([
				...staticFormFields,
				{
					name: 'sportId',
					fieldType: 'select',
					label: 'Select Sports',
					placeholder: 'Select Sports',
					optionList: sportOptions,
				},
			]);
		}
	}, [sportsListInfo]);

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.BetSettings,
			operation: 'C',
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
		isCreateBetSettingsLoading,
		onClickEdit,
	};
};

export default useCreateBetSettings;
