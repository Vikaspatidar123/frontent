import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { createUserComment } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateComment = ({ userId }) => {
	const dispatch = useDispatch();
	const { createUserCommentsLoading, userComments, createUserCommentsSuccess } =
		useSelector((state) => state.UserDetails);

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
			header: 'Add Comment',
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

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		isCreateCommentLoading: createUserCommentsLoading,
		buttonList,
	};
};

export default useCreateComment;
