import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	leftStaticFormFields,
	rightStaticFormFields,
} from '../formFields';
import useForm from '../../../components/Common/Hooks/useFormModal';

import {
	getRegistrationFields,
	updateRegistrationFields,
} from '../../../store/actions';

const useFormFields = () => {
	const dispatch = useDispatch();

	const { formFields, isformFieldsLoading } = useSelector(
		(state) => state.FormFields
	);

	const handleFormSubmit = (values) => {
		dispatch(updateRegistrationFields({ data: values }));
	};

	useEffect(() => {
		dispatch(getRegistrationFields());
	}, []);

	const {
		leftFormFields,
		rightFormFields,
		validation,
		setLeftFormFields,
		setRightFormFields,
	} = useForm({
		initialValues: getInitialValues(formFields),
		onSubmitEntry: handleFormSubmit,
		leftStaticFormFields: leftStaticFormFields(formFields),
		rightStaticFormFields: rightStaticFormFields(formFields),
	});

	useEffect(() => {
		if (formFields) {
			validation.resetForm({
				values: getInitialValues(formFields),
			});
			setLeftFormFields(leftStaticFormFields(formFields));
			setRightFormFields(rightStaticFormFields(formFields));
		}
	}, [formFields]);

	return {
		leftFormFields,
		rightFormFields,
		validation,
		isformFieldsLoading,
		formFields,
	};
};

export default useFormFields;
