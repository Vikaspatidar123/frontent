/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useMemo } from 'react';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import { editCountryStart, getLanguagesStart } from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	CountryCode,
	CountryName,
	Id,
	Language,
	Status,
} from '../CountriesListCol';
import ActionButtons from '../ActionButtons';
import useCountriesListing from './useCountriesListing';

const useEditCountry = () => {
	const dispatch = useDispatch();
	const {
		editCountriesLoading: isEditCountryLoading,
		editCountriesSuccess: isEditCountrySuccess,
	} = useSelector((state) => state.Countries);

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { handleStatus } = useCountriesListing();

	const handleEditCountry = (values) => {
		dispatch(
			editCountryStart({
				data: {
					languageId: Number(values.languageId),
					countryId: Number(values.id),
					kycMethod: Number(values.kycMethod),
				},
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Edit Country Data',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleEditCountry,
		});

	useEffect(() => {
		if (isEditCountrySuccess) setIsOpen(false);
	}, [isEditCountrySuccess]);

	const handleEditClick = (selectedRow) => {
		validation.setValues(selectedRow);
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		if (languageData?.rows?.length) {
			const langOptions = languageData.rows.map((r) => ({
				id: r.id,
				optionLabel: r.name,
				value: r.id,
			}));

			setFormFields([
				...staticFormFields,
				{
					name: 'languageId',
					fieldType: 'select',
					label: 'Language',
					placeholder: 'Select Language',
					optionList: langOptions,
				},
			]);
		}
	}, [languageData]);

	useEffect(() => {
		dispatch(getLanguagesStart());
	}, []);

	useEffect(() => {
		if (isEditCountrySuccess) setIsOpen(false);
	}, [isEditCountrySuccess]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
				// filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Country Code',
				accessor: 'countryCode',
				// filterable: true,
				Cell: ({ cell }) => <CountryCode value={cell.value} />,
			},
			{
				Header: 'Name',
				accessor: 'countryName',
				// filterable: true,
				Cell: ({ cell }) => <CountryName value={cell.value} />,
			},
			{
				Header: 'Language',
				accessor: 'language',
				// filterable: true,
				Cell: ({ cell }) => <Language value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				disableSortBy: true,
				// filterable: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Actions',
				disableSortBy: true,
				// accessor: "actions",
				// filterable: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleEditClick={handleEditClick}
						handleStatus={handleStatus}
					/>
				),
			},
		],
		[]
	);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		isEditCountryLoading,
		handleEditClick,
		columns,
	};
};

export default useEditCountry;
