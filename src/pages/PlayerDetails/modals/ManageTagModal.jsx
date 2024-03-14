/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormModal from '../../../components/Common/FormModal';
import { attachTag, getAllTags, removeTag } from '../../../store/actions';

const tagActionsOptionsList = [
	{
		optionLabel: 'Attach Tag',
		value: 'addTag',
	},
	{
		optionLabel: 'Remove Tag',
		value: 'removeTag',
	},
];

const staticFormFields = (options) => [
	{
		name: 'tagAction',
		fieldType: 'radioGroup',
		label: 'Tag Action',
		optionList: tagActionsOptionsList,
	},
	{
		name: 'tag',
		fieldType: 'select',
		// label: '',
		placeholder: 'Select Tag',
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
		}
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: `Manage Tags for ${userDetails?.firstName} ${userDetails?.lastName}`,
			initialValues: {
				tag: null,
				tagAction: '',
			},
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
