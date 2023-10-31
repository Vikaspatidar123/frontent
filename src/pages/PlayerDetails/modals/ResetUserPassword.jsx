/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Buffer } from 'buffer';
import FormModal from '../../../components/Common/FormModal';
import { passwordValidation } from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { updateUserPassword } from '../../../store/actions';

const staticFormFields = [
	{
		name: 'password',
		fieldType: 'textField',
		label: 'Password',
		placeholder: 'Enter Password',
		required: true,
		type: 'password',
	},
];

const ResetUserPassword = ({ show, headerText, toggle }) => {
	const dispatch = useDispatch();
	const { playerId } = useParams();
	const { updateUserPasswordLoading } = useSelector(
		(state) => state.UserDetails
	);
	const handleResetUserPassword = (formValues) => {
		const encryptedPass = Buffer.from(formValues.password).toString('base64');
		dispatch(
			updateUserPassword({
				password: encryptedPass,
				userId: parseInt(playerId, 10),
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields } = useForm({
		header: headerText,
		validationSchema: passwordValidation,
		initialValues: {
			password: '',
		},
		onSubmitEntry: (values, { resetForm }) => {
			handleResetUserPassword(values);
			resetForm();
			toggle();
		},
		staticFormFields,
	});

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
					toggle();
				}}
				header={header}
				validation={validation}
				formFields={formFields}
				submitLabel="Submit"
				customColClasses="col-md-12"
				isSubmitLoading={updateUserPasswordLoading}
			/>
		</div>
	);
};

export default ResetUserPassword;
