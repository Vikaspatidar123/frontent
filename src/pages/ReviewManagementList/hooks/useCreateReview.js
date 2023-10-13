import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createReviewStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateReview = () => {
	const dispatch = useDispatch();
	const { isCreateReviewLoading, reviewManagement } = useSelector(
		(state) => state.ReviewManagement
	);

	const handleCreateReview = (values) => {
		dispatch(
			createReviewStart({
				data: {
					...values,
					rating: Number(values.rating),
				},
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Review',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleCreateReview,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [reviewManagement?.count]);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		handleAddClick,
		isCreateReviewLoading,
	};
};

export default useCreateReview;
