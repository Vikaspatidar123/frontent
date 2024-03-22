/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormModal from '../../../components/Common/FormModal';
import {
	attachTag,
	createTag,
	getAllTags,
	removeTag,
} from '../../../store/actions';

const tagSchema = () =>
	Yup.object().shape({
		tag: Yup.string().required('Tag Required'),
		tagAction: Yup.string().required('Tag Action Required'),
	});

const tagActionsOptionsList = [
	{
		optionLabel: 'Attach Tag',
		value: 'addTag',
	},
	{
		optionLabel: 'Remove Tag',
		value: 'removeTag',
	},
	{
		optionLabel: 'Create Tag',
		value: 'createTag',
	},
];

const staticFormFields = (options, isCreateTag) => [
	{
		name: 'tagAction',
		fieldType: 'radioGroup',
		label: 'Tag Action',
		optionList: tagActionsOptionsList,
	},
	{
		name: 'tag',
		fieldType: isCreateTag ? 'textField' : 'select',
		// label: '',
		placeholder: isCreateTag ? 'Enter tag' : 'Select Tag',
		required: false,
		optionList: options || [],
	},
];

const ManageTagModal = ({ userDetails, show, handleClose }) => {
	const { playerId } = useParams();
	const dispatch = useDispatch();
	const [options, setOptions] = useState([]);
	const { updateUserTagsLoading, userTags } = useSelector(
		(state) => state.UserDetails
	);

	useEffect(() => {
		dispatch(getAllTags());
	}, []);

	const submitTagsCreate = (formValues) => {
		if (formValues?.tagAction === 'addTag') {
			dispatch(
				attachTag({
					userId: playerId,
					tagId: formValues?.tag,
				})
			);
		} else if (formValues?.tagAction === 'removeTag') {
			dispatch(
				removeTag({
					userId: playerId,
					tagId: formValues?.tag,
				})
			);
		} else if (formValues?.tagAction === 'createTag') {
			dispatch(
				createTag({
					tag: formValues?.tag,
				})
			);
		}
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: `Manage Tags for ${userDetails?.firstName} ${userDetails?.lastName}`,
			initialValues: {
				tag: null,
				tagAction: '',
			},
			validationSchema: tagSchema,
			onSubmitEntry: (values, { resetForm }) => {
				submitTagsCreate(values);
				resetForm();
				handleClose();
			},
			staticFormFields: staticFormFields(),
		});

	useEffect(() => {
		if (userTags?.length > 0 && validation?.values?.tagAction === 'addTag') {
			setOptions(
				userTags?.map((tag) => ({
					id: tag?.id,
					optionLabel: tag?.tag,
					value: tag?.id,
				}))
			);
		}

		if (validation?.values?.tagAction === 'removeTag' && userDetails) {
			setOptions(
				userDetails?.userTags?.map((tag) => ({
					id: tag.tagId,
					optionLabel: tag?.tag?.tag,
					value: tag.tagId,
				}))
			);
		}

		if (validation?.values?.tagAction === 'createTag') {
			setFormFields(staticFormFields([], true));
		}
	}, [validation?.values?.tagAction, userTags, userDetails]);

	useEffect(() => {
		setFormFields(staticFormFields(options));
	}, [options]);

	useEffect(() => {
		if (show) setIsOpen(true);
		else setIsOpen(false);
	}, [show]);

	return (
		<div>
			<FormModal
				isOpen={isOpen}
				toggle={() => {
					setIsOpen((prev) => !prev);
					handleClose();
				}}
				header={header}
				validation={validation}
				formFields={formFields}
				submitLabel="Submit"
				customColClasses="col-md-12"
				isSubmitLoading={updateUserTagsLoading}
			/>
		</div>
	);
};

export default ManageTagModal;
