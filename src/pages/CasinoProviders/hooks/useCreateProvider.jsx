/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import {
	createCasinoProvidersStart,
	editCasinoProvidersStart,
	getLanguagesStart,
	// getAggregatorsList,
	updateCasinoStatusStart,
} from '../../../store/actions';

import {
	// CasinoProviderId,
	Name,
	ThumbnailUrl,
	Status,
} from '../CasinoProvidersListCol';
import { ICON_CLASS, TEXT_COLORS } from '../../../utils/constant';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { dataURLtoBlob } from '../../../utils/helpers';
import { modules } from '../../../constants/permissions';
import usePermission from '../../../components/Common/Hooks/usePermission';
import Actions from '../../../components/Common/Actions';
import ButtonList from '../../../components/Common/ButtonList';

const useCreateProvider = () => {
	const dispatch = useDispatch();
	// const [langState, setLangState] = useState({ EN: '' });
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const [showModal, setShowModal] = useState(false);
	const {
		isCreateProviderLoading,
		casinoProvidersData,
		isEditProviderLoading,
		// languageData,
		isCreateProviderSuccess,
	} = useSelector((state) => state.CasinoManagementData);

	const navigate = useNavigate();
	const { isGranted } = usePermission();

	useEffect(() => {
		dispatch(getLanguagesStart());
	}, []);

	const handleStatus = (props) => {
		const { id } = props;
		dispatch(
			updateCasinoStatusStart({
				type: 'provider',
				id,
			})
		);
	};

	const handleEditProvider = (values) => {
		dispatch(
			editCasinoProvidersStart({
				data: {
					...values,
					name: { EN: values?.name },
					language: '',
				},
			})
		);
	};

	const handleAddProvider = (values) => {
		dispatch(
			createCasinoProvidersStart({
				data: {
					...values,
					providerType: 'casino',
					name: values?.name,
					icon: values.file,
					file: '',
					language: '',
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
		validationSchema: validationSchema(),
		staticFormFields: staticFormFields(isEdit?.open),
		onSubmitEntry: isEdit?.open ? handleEditProvider : handleAddProvider,
	});

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Provider');
		validation.setValues(
			getInitialValues({ ...selectedRow, thumbnail: selectedRow.thumbnailUrl })
		);
		setIsOpen((prev) => !prev);
	};

	// const onChangeLanguage = (e) => {
	// 	validation.setValues((prev) => ({
	// 		...prev,
	// 		name: { ...prev.name, [e.target.value]: '' },
	// 	}));
	// 	setLangState((prev) => ({ ...prev, [e.target.value]: '' }));
	// };

	// const onRemoveLanguage = (e) => {
	// 	validation.setValues((prev) => {
	// 		const { name } = prev;
	// 		const { [e]: key, ...rest } = name;
	// 		return { ...prev, name: rest };
	// 	});

	// 	setLangState((prev) => {
	// 		const { [e]: key, ...rest } = prev;
	// 		return rest;
	// 	});
	// };

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues({ name: { EN: '' } }));
		setHeader('Configure provider');
		setIsEdit({ open: false, selectedRow: '' });
	};

	// useEffect(() => {
	// 	if (languageData?.languages?.length) {
	// 		const langOptions = languageData?.languages?.map((r) => ({
	// 			id: r.id,
	// 			optionLabel: r.name,
	// 			value: r.code,
	// 		}));
	// 		setFormFields([
	// 			// {
	// 			// 	name: 'language',
	// 			// 	fieldType: 'select',
	// 			// 	label: 'Language',
	// 			// 	placeholder: 'Select Language',
	// 			// 	optionList: langOptions,
	// 			// 	callBack: onChangeLanguage,
	// 			// },
	// 			// {
	// 			// 	name: 'name',
	// 			// 	label: 'Provider Name',
	// 			// 	fieldType: 'inputGroup',
	// 			// 	onDelete: onRemoveLanguage,
	// 			// },
	// 			...staticFormFields(),
	// 		]);
	// 	}
	// }, [languageData, isEdit]);

	useEffect(() => {
		setFormFields([...staticFormFields(isEdit?.open)]);
	}, [isEdit]);

	useEffect(() => {
		if (isEditProviderLoading || isCreateProviderSuccess) setIsOpen(false);
	}, [isEditProviderLoading, isCreateProviderSuccess]);

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

	const handleRestrictedCountries = (row) => {
		navigate(`/casino-providers/restrict-countries/${row?.id}`, {
			state: {
				type: 'providers',
				restrictedCountries: row?.restrictedCountries,
			},
		});
	};

	const actionsList = [
		{
			actionName: 'Edit',
			actionHandler: onClickEdit,
			isHidden: !isGranted(modules.casinoManagement, 'U'),
			icon: ICON_CLASS.edit,
			iconColor: TEXT_COLORS.primary,
		},
		{
			actionName: 'Toggle Status',
			actionHandler: handleStatus,
			isHidden: !isGranted(modules.casinoManagement, 'TS'),
			icon: ICON_CLASS.toggleStatus,
			iconColor: TEXT_COLORS.success,
		},
		{
			actionName: 'View Restricted Countries',
			actionHandler: handleRestrictedCountries,
			isHidden: !isGranted(modules.casinoManagement, 'U'),
			icon: ICON_CLASS.moneyMultiple,
			iconColor: TEXT_COLORS.info,
		},
	];

	const columns = useMemo(
		() => [
			// {
			// 	Header: 'ID',
			// 	accessor: 'id',
			// 	notHidable: true,
			// 	filterable: true,
			// 	Cell: ({ cell }) => <CasinoProviderId value={cell.value} />,
			// },
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
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[
			casinoProvidersData,
			isGranted(modules.casinoManagement, 'U'),
			isGranted(modules.casinoManagement, 'TS'),
		]
	);

	const buttonList = [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.casinoManagement,
			operation: 'C',
		},
	];
	const actionList = <ButtonList buttonList={buttonList} />;

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
		actionList,
	};
};

export default useCreateProvider;
