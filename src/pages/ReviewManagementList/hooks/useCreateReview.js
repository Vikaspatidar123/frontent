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
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';

const useCreateReview = () => {
	const dispatch = useDispatch();
	const {
		isCreateReviewLoading,
		isCreateReviewSuccess,
		isUpdateReviewLoading,
		isUpdateReviewSuccess,
	} = useSelector((state) => state.ReviewManagement);

	const [showModal, setShowModal] = useState(false);
	const [isEdit, setIsEdit] = useState({ open: false, reviewId: '' });

	const handleSubmitReview = (values) => {
		if (isEdit?.open) {
			dispatch(
				updateReviewStart({
					data: {
						comment: values.description,
						rating: Number(values.rating),
						reviewId: Number(isEdit.reviewId),
						isActive: values.isActive ? 'true' : 'false',
					},
				})
			);
		} else {
			dispatch(
				createReviewStart({
					data: {
						rating: Number(values.rating),
						userId: Number(values.userId),
						comment: values.description,
						isActive: values.isActive ? 'true' : 'false',
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
		setIsEdit({ open: true, reviewId: row?.id });
		setHeader('Edit Review');
		validation.setValues(getInitialValues(row));
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (isCreateReviewSuccess) {
			setIsOpen(false);
		}
	}, [isCreateReviewSuccess]);

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

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.reviewManagement) &&
			!isEdit.open &&
			isOpen
		) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.reviewManagement))
			);
			validation.setValues(values);
		}
	}, [isOpen]);

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
		showModal,
		setShowModal,
		isEdit,
	};
};

export default useCreateReview;
