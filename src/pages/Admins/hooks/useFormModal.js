import { useFormik } from 'formik';
import { useState } from 'react';

const useForm = ({
	header,
	initialValues,
	validationSchema,
	onSubmitEntry,
	staticFormFields,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formFields, setFormFields] = useState(staticFormFields || []);
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: onSubmitEntry,
	});
	return { header, isOpen, setIsOpen, validation, formFields, setFormFields };
};

export default useForm;
