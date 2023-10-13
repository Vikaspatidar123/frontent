import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createBetSettingsStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateBetSettings = () => {
	const dispatch = useDispatch();
	const { isCreateBetSettingsLoading, betSettingsList } = useSelector(
		(state) => state.BetSettings
	);
	const { sportsListInfo } = useSelector((state) => state.SportsList);

	const handleCreateBetSettings = (values) => {
		dispatch(
			createBetSettingsStart({
				data: values,
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Bet Settings',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleCreateBetSettings,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [betSettingsList?.length]);

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

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		handleAddClick,
		isCreateBetSettingsLoading,
	};
};

export default useCreateBetSettings;
