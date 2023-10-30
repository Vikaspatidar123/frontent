/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormModal from '../../../components/Common/FormModal';
import { updateUserTags } from '../../../store/actions';

const ManageTagModal = ({ userDetails, show, handleClose }) => {
	const { playerId } = useParams();
	const dispatch = useDispatch();
	const { updateUserTagsLoading } = useSelector((state) => state.UserDetails);

	const submitTagsCreate = (formValues) => {
		const tags = [];
		let customTag = false;
		for (const tag in formValues?.tags) {
			tags.push(formValues?.tags[tag]?.value);
			if (formValues?.tags[tag]?.isNew) {
				customTag = true;
			}
		}
		dispatch(
			updateUserTags({
				tenantId: userDetails?.tenantId && JSON.parse(userDetails?.tenantId),
				userId: playerId && JSON.parse(playerId),
				parentId: userDetails.parentId,
				tags,
				customTag,
			})
		);
		// dispatch(
		//   addTagToUser({

		// })
		// )
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: `Manage Tags for ${userDetails?.firstName} ${userDetails?.lastName}`,
			initialValues: {
				tags: [],
			},
			onSubmitEntry: (values, { resetForm }) => {
				submitTagsCreate();
				resetForm();
				handleClose();
			},
			staticFormFields: [],
		});

	useEffect(() => {
		if (userDetails?.tags?.length > 0) {
			const options = [];
			for (const i in userDetails?.tags) {
				if (userDetails?.tags[i] !== '' && userDetails?.tags[i] !== null) {
					options.push({
						label: userDetails?.tags[i],
						value: userDetails?.tags[i],
					});
				}
			}
			setFormFields([
				{
					name: 'tags',
					fieldType: 'creatableSelect',
					label: 'Tags (Only Alphabets and Numbers Allowed)',
					required: false,
					optionList: options,
					callBack: (option, e) => {
						if (e.removedValue?.value !== 'Internal') {
							validation.setFieldValue('tags', option);
						}
					},
				},
			]);
			validation.setFieldValue('tags', options);
		}
	}, [userDetails?.tags]);

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
