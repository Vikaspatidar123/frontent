import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import useForm from '../../Admins/hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createCurrencyStart } from '../../../store/actions';

const useCreateCurrency = () => {
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

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		handleAddClick,
		isCreateCurrencyLoading,
	};
};

export default useCreateCurrency;
