import { useFormik } from 'formik';
import { useState } from 'react';

const useForm = ({
	header: initialHeader,
	initialValues,
	validationSchema,
	onSubmitEntry,
	staticFormFields,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [header, setHeader] = useState(initialHeader);
	const [formFields, setFormFields] = useState(staticFormFields || []);
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: onSubmitEntry,
	});
	return {
		header,
		isOpen,
		setIsOpen,
		validation,
		formFields,
		setFormFields,
		setHeader,
	};
};

export default useForm;
