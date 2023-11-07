/* eslint-disable no-use-before-define */
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

	const callback = (e, name) => {
		validation.setFieldValue(name, !e.target.checked ? 2 : 0);
	};

	const {
		leftFormFields,
		rightFormFields,
		validation,
		setLeftFormFields,
		setRightFormFields,
	} = useForm({
		initialValues: getInitialValues(formFields),
		onSubmitEntry: handleFormSubmit,
		leftStaticFormFields: leftStaticFormFields(formFields, callback),
		rightStaticFormFields: rightStaticFormFields(formFields, callback),
	});

	useEffect(() => {
		if (formFields) {
			validation.resetForm({
				values: getInitialValues(formFields),
			});
			setLeftFormFields(leftStaticFormFields(formFields, callback));
			setRightFormFields(rightStaticFormFields(formFields, callback));
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
