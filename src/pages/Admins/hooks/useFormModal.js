import { useFormik } from 'formik';
import { useState } from 'react';

const useForm = ({
	header,
	initialValues,
	validationSchema,
	onSubmitEntry,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const validation = useFormik({
		enableReinitialize: true,
		initialValues,
		validationSchema,
		onSubmit: onSubmitEntry,
	});
	return { header, isOpen, setIsOpen, validation };
};

export default useForm;
