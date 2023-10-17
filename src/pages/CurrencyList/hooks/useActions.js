import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createCurrencyStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useActions = () => {
	const dispatch = useDispatch();
	const { isCreateCurrencyLoading, currencies } = useSelector(
		(state) => state.Currencies
	);

	const handleCreateCurrency = (values) => {
		dispatch(
			createCurrencyStart({
				data: {
					...values,
					type: Number(values.type),
					isPrimary: false,
				},
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Currency',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleCreateCurrency,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [currencies?.count]);

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
		isCreateCurrencyLoading,
		buttonList,
	};
};

export default useActions;
