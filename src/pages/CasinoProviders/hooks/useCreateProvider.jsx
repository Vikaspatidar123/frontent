/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	editCasinoProvidersStart,
	getLanguagesStart,
	// getAggregatorsList,
	updateCasinoStatusStart,
} from '../../../store/actions';

import {
	CasinoProviderId,
	Name,
	ThumbnailUrl,
	Status,
} from '../CasinoProvidersListCol';
import ActionButtons from '../ActionButtons';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { dataURLtoBlob } from '../../../utils/helpers';

const useCreateProvider = () => {
	const dispatch = useDispatch();
	const [langState, setLangState] = useState({ EN: '' });
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const [showModal, setShowModal] = useState(false);
	const {
		isCreateProviderLoading,
		casinoProvidersData,
		isEditProviderLoading,
		languageData,
	} = useSelector((state) => state.CasinoManagementData);

	useEffect(() => {
		dispatch(getLanguagesStart());
	}, []);

	const handleStatus = (e, props) => {
		e.preventDefault();
		const { casinoProviderId } = props;
		dispatch(
			updateCasinoStatusStart({
				type: 'provider',
				id: casinoProviderId,
			})
		);
	};

	const handleEditProvider = (values) => {
		dispatch(
			editCasinoProvidersStart({
				data: {
					...values,
				},
			})
		);
	};

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		setHeader,
	} = useForm({
		header: 'Add Provider',
		initialValues: getInitialValues(),
		validationSchema: validationSchema(langState),
		staticFormFields,
		onSubmitEntry: handleEditProvider,
	});

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Provider');
		validation.setValues(
			getInitialValues({ ...selectedRow, thumbnail: selectedRow.thumbnailUrl })
		);
		setIsOpen((prev) => !prev);
	};

	const onChangeLanguage = (e) => {
		validation.setValues((prev) => ({
			...prev,
			name: { ...prev.name, [e.target.value]: '' },
		}));
		setLangState((prev) => ({ ...prev, [e.target.value]: '' }));
	};

	const onRemoveLanguage = (e) => {
		validation.setValues((prev) => {
			const { name } = prev;
			const { [e]: key, ...rest } = name;
			return { ...prev, name: rest };
		});

		setLangState((prev) => {
			const { [e]: key, ...rest } = prev;
			return rest;
		});
	};

	useEffect(() => {
		if (languageData?.languages?.length) {
			const langOptions = languageData?.languages?.map((r) => ({
				id: r.id,
				optionLabel: r.name,
				value: r.code,
			}));
			setFormFields([
				{
					name: 'language',
					fieldType: 'select',
					label: 'Language',
					placeholder: 'Select Language',
					optionList: langOptions,
					callBack: onChangeLanguage,
				},
				{
					name: 'name',
					label: 'Provider Name',
					fieldType: 'inputGroup',
					onDelete: onRemoveLanguage,
				},
				...staticFormFields,
			]);
		}
	}, [languageData, isEdit]);

	useEffect(() => {
		if (isEditProviderLoading) setIsOpen(false);
	}, [isEditProviderLoading]);

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.providers) &&
			!isEdit.open &&
			isOpen
		) {
			const storedValues = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.providers))
			);

			if (storedValues?.thumbnail?.thumbnail) {
				const base64Content = storedValues.thumbnail?.thumbnail;
				const blob = dataURLtoBlob(base64Content);

				storedValues.thumbnail = new File([blob], storedValues.thumbnail.name, {
					type: blob.type,
				});
			}

			validation.setValues(storedValues);
		}
	}, [isOpen]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <CasinoProviderId value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'ICON',
				accessor: 'iconUrl',
				disableSortBy: true,
				filterable: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableSortBy: true,
				disableFilters: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleStatus={handleStatus}
						onClickEdit={onClickEdit}
					/>
				),
			},
		],
		[casinoProvidersData]
	);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		isCreateProviderLoading,
		onClickEdit,
		isEditProviderLoading,
		columns,
		showModal,
		setShowModal,
		isEdit,
	};
};

export default useCreateProvider;
