/* eslint-disable no-param-reassign */
import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createReviewStart, updateReviewStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { modules } from '../../../constants/permissions';

const useCreateReview = () => {
	const dispatch = useDispatch();
	const {
		isCreateReviewLoading,
		isUpdateReviewLoading,
		isUpdateReviewSuccess,
		reviewManagement,
	} = useSelector((state) => state.ReviewManagement);

	const [isEdit, setIsEdit] = useState({ open: false, reviewId: '' });

	const handleSubmitReview = (values) => {
		if (isEdit?.open) {
			dispatch(
				updateReviewStart({
					data: {
						...values,
						rating: Number(values.rating),
						reviewId: isEdit?.reviewId,
					},
				})
			);
		} else {
			dispatch(
				createReviewStart({
					data: {
						...values,
						rating: Number(values.rating),
					},
				})
			);
		}
	};

	const {
		isOpen,
		setIsOpen,
		header,
		setHeader,
		validation,
		formFields,
		setFormFields,
	} = useForm({
		header: 'Add header',
		initialValues: getInitialValues(),
		validationSchema,
		staticFormFields,
		onSubmitEntry: handleSubmitReview,
	});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsEdit({ open: false, reviewId: '' });
		setHeader('Add Review');
		validation.resetForm(getInitialValues());
		setIsOpen((prev) => !prev);
	};

	const handleEditClick = (e, row) => {
		e.preventDefault();
		if (row?.status) {
			row.status = row.status === 'Active';
		}
		setIsEdit({ open: true, reviewId: row?.reviewId });
		setHeader('Edit Review');
		validation.setValues(getInitialValues(row));
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [reviewManagement?.count]);

	useEffect(() => {
		if (isUpdateReviewSuccess) {
			setIsOpen(false);
			setIsEdit({ open: false, reviewId: '' });
		}
	}, [isUpdateReviewSuccess]);

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.Reviews,
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
		isCreateReviewLoading,
		isUpdateReviewLoading,
		buttonList,
		handleEditClick,
	};
};

export default useCreateReview;
