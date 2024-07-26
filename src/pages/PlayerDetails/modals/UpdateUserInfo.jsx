/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useForm from '../../../components/Common/Hooks/useFormModal';
import FormModal from '../../../components/Common/FormModal';
import { getInitialValuesUpdateUser, userSchema } from '../formDetails';
import { fetchCountriesStart, updateUserInfo } from '../../../store/actions';
import { countryMasks } from '../constants';

const staticFormFields = (countriesList, countryCodes) => [
	{
		name: 'email',
		fieldType: 'textField',
		label: 'Email',
		isRequired: true,
		maximum: 50,
	},
	{
		name: 'firstName',
		fieldType: 'textField',
		label: 'First Name',
		isRequired: true,
		maximum: 20,
	},
	{
		name: 'lastName',
		fieldType: 'textField',
		label: 'Last Name',
		isRequired: true,
		maximum: 20,
	},
	{
		name: 'username',
		fieldType: 'textField',
		label: 'User Name',
		isRequired: true,
		maximum: 20,
	},
	{
		name: 'address',
		fieldType: 'textField',
		label: 'Address',
		isRequired: true,
		maximum: 50,
	},
	{
		name: 'city',
		fieldType: 'textField',
		label: 'City',
		isRequired: true,
		maximum: 30,
	},
	{
		name: 'zipCode',
		fieldType: 'textField',
		label: 'Zip Code',
		isRequired: true,
		maximum: 6,
	},
	{
		fieldType: 'phone',
		label: 'Phone',
		isRequired: true,
		namesArray: ['phone', 'phoneCode'],
		countryCodes,
		maximum: 15,
	},
	{
		name: 'countryCode',
		fieldType: 'select',
		label: 'Country',
		placeholder: 'Select Country',
		isRequired: true,
		optionList: countriesList,
	},
	{
		name: 'dateOfBirth',
		fieldType: 'datePicker',
		label: 'Date Of Birth',
		isRequired: true,
		type: 'date',
	},
	{
		name: 'gender',
		fieldType: 'radioGroup',
		label: 'Gender',
		isRequired: true,
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
	// {
	// 	name: 'newsLetter',
	// 	fieldType: 'switch',
	// 	label: 'NewsLetter',
	// 	required: true,
	// },
	// {
	// 	name: 'sms',
	// 	fieldType: 'switch',
	// 	label: 'SMS',
	// 	required: true,
	// },
];

const UpdateUserInfo = ({ show, header, toggle }) => {
	const dispatch = useDispatch();
	const { userDetails, depositToOtherLoading } = useSelector(
		(state) => state.UserDetails
	);
	const { countries } = useSelector((state) => state.Countries);
	const [countryCodes, setCountryCodes] = useState([]);

	useEffect(() => {
		if (countries?.countries?.length) {
			setCountryCodes(() => {
				const codes = countries?.countries?.map((country) =>
					country.code.toLowerCase()
				);

				return Object.fromEntries(
					Object.entries(countryMasks).filter(([key]) => codes.includes(key))
				);
			});
		}
	}, [countries]);

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
		staticFormFields: staticFormFields(formattedCountries, countryCodes),
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
