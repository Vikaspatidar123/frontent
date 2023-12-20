import { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createUserComment } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';

const useCreateComment = ({ userId }) => {
	const dispatch = useDispatch();
	const { createUserCommentsLoading, userComments, createUserCommentsSuccess } =
		useSelector((state) => state.UserDetails);

	const [showModal, setShowModal] = useState(false);
	const handleCreateComment = (values) => {
		dispatch(
			createUserComment({
				...values,
				userId,
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Note',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleCreateComment,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [userComments?.count]);

	useEffect(() => {
		if (createUserCommentsSuccess) setIsOpen(false);
	}, [createUserCommentsSuccess]);

	const buttonList = useMemo(() => [
		{
			label: 'Add Note',
			handleClick: handleAddClick,
			link: '#!',
		},
	]);

	useEffect(() => {
		if (window.localStorage.getItem(formPageTitle.notes) && isOpen) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.notes))
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
		isCreateCommentLoading: createUserCommentsLoading,
		buttonList,
		showModal,
		setShowModal,
	};
};

export default useCreateComment;
