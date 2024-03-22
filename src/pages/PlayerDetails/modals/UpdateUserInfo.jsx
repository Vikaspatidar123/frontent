/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormModal from '../../../components/Common/FormModal';
import { getInitialValuesUpdateUser, userSchema } from '../formDetails';
import { fetchCountriesStart, updateUserInfo } from '../../../store/actions';

const staticFormFields = (countriesList) => [
	{
		name: 'email',
		fieldType: 'textField',
		label: 'Email',
		required: true,
	},
	{
		name: 'firstName',
		fieldType: 'textField',
		label: 'First Name',
		required: true,
	},
	{
		name: 'lastName',
		fieldType: 'textField',
		label: 'Last Name',
		required: true,
	},
	{
		name: 'username',
		fieldType: 'textField',
		label: 'User Name',
		required: true,
	},
	{
		name: 'address',
		fieldType: 'textField',
		label: 'Address',
		required: true,
	},
	{
		name: 'city',
		fieldType: 'textField',
		label: 'City',
		required: true,
	},
	{
		name: 'zipCode',
		fieldType: 'textField',
		label: 'Zip Code',
		required: true,
	},
	{
		fieldType: 'phone',
		label: 'Phone',
		required: true,
		namesArray: ['phone', 'phoneCode'],
	},
	{
		name: 'countryCode',
		fieldType: 'select',
		label: 'Country Code',
		placeholder: 'Select Country Code',
		required: true,
		optionList: countriesList,
	},
	{
		name: 'dateOfBirth',
		fieldType: 'datePicker',
		label: 'Date Of Birth',
		required: true,
		type: 'date',
	},
	{
		name: 'gender',
		fieldType: 'radioGroup',
		label: 'Gender',
		optionList: [
			{
				optionLabel: 'Male',
				value: 'male',
			},
			{
				optionLabel: 'Female',
				value: 'female',
			},
			// {
			// 	optionLabel: 'Other',
			// 	value: 'other',
			// },
		],
	},
	{
		name: 'newsLetter',
		fieldType: 'switch',
		label: 'NewsLetter',
		required: true,
	},
	{
		name: 'sms',
		fieldType: 'switch',
		label: 'SMS',
		required: true,
	},
];

const UpdateUserInfo = ({ show, header, toggle }) => {
	const dispatch = useDispatch();
	const { userDetails, depositToOtherLoading } = useSelector(
		(state) => state.UserDetails
	);
	const { countries } = useSelector((state) => state.Countries);

	useEffect(() => {
		dispatch(fetchCountriesStart());
	}, []);

	const formattedCountries = useMemo(() => {
		const arrayToReturn = [];
		if (countries?.countries?.length) {
			countries?.countries?.map((country) =>
				arrayToReturn.push({
					optionLabel: country.name,
					value: country.code,
				})
			);
		}
		return arrayToReturn;
	}, [countries]);

	const handleUserEdit = (values) => {
		dispatch(
			updateUserInfo({
				...values,
				userId: Number(values.userId),
			})
		);
	};

	const { isOpen, setIsOpen, validation, formFields } = useForm({
		header,
		initialValues: getInitialValuesUpdateUser(userDetails),
		validationSchema: userSchema,
		onSubmitEntry: (values) => {
			handleUserEdit(values);
			toggle();
		},
		staticFormFields: staticFormFields(formattedCountries),
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
				customColClasses="col-sm-6"
				isSubmitLoading={depositToOtherLoading}
				className="modal-dialog modal-lg"
			/>
		</div>
	);
};

export default UpdateUserInfo;
