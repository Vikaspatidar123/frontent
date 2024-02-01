/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	createSABannersStart,
	editSABannersStart,
} from '../../../store/actions';
import { bannerType } from '../constants';
import { modules } from '../../../constants/permissions';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { dataURLtoBlob } from '../../../utils/helpers';

const useCreateBanner = () => {
	const dispatch = useDispatch();
	const [showModal, setShowModal] = useState(false);
	const [isEdit, setIsEdit] = useState({ open: false, selectdRow: '' });
	const [validationConditions, setValidationConditions] = useState({
		minRequiredWidth: '',
		minRequiredHeight: '',
		maxRequiredWidth: '',
		maxRequiredHeight: '',
	});
	const {
		isCreateSABannersLoading: isCreateBannerLoading,
		SABanners,
		isEditSABannersLoading: isEditBannerLoading,
		isEditSABannersSuccess,
	} = useSelector((state) => state.SASettings);

	const handleCreateBanner = (values) => {
		dispatch(
			createSABannersStart({
				data: {
					tenantId: '',
					bannerKey: values?.bannerType,
					image: values?.thumbnail,
				},
			})
		);
	};

	const handleEditBanner = (values) => {
		dispatch(
			editSABannersStart({
				data: {
					tenantId: '',
					bannerKey: values?.bannerType,
					image: typeof values.thumbnail === 'string' ? '' : values?.thumbnail,
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
		header: 'Add Banner',
		initialValues: getInitialValues(),
		validationSchema: validationSchema({
			minRequiredWidth: validationConditions?.minRequiredWidth,
			minRequiredHeight: validationConditions?.minRequiredHeight,
			maxRequiredWidth: validationConditions?.maxRequiredWidth,
			maxRequiredHeight: validationConditions?.maxRequiredHeight,
		}),
		staticFormFields,
		onSubmitEntry: isEdit.open ? handleEditBanner : handleCreateBanner,
	});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.resetForm(getInitialValues());
		setHeader('Add Banner');
		setIsEdit({ open: false, selectedRow: '' });
	};

	const onClickEdit = (selectedRow) => {
		setIsEdit({ open: true, selectedRow });
		setHeader('Edit Banner');
		validation.setValues(
			getInitialValues({
				bannerType: selectedRow.key,
				thumbnail: selectedRow.bannerPreview,
			})
		);
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [Object.keys(SABanners?.rows?.[0]?.value || {}).length]);

	useEffect(() => {
		if (isEditSABannersSuccess) setIsOpen();
	}, [isEditSABannersSuccess]);

	const buttonList = useMemo(() => [
		{
			label: 'Upload',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.BannerManagement,
			operation: 'C',
		},
	]);

	useEffect(() => {
		if (SABanners?.rows?.length && formFields.length <= 2) {
			const arrayToReturn = [];
			bannerType?.map(({ label, value }) => {
				let hideData = false;
				SABanners?.rows?.map((item) => {
					Object.keys(item?.value).map((key) => {
						if (key === value) {
							hideData = true;
						}
					});
				});
				if (!hideData) {
					arrayToReturn.push({ optionLabel: label, value });
				}
			});
			setFormFields([
				{
					name: 'bannerType',
					fieldType: 'select',
					label: 'Type',
					optionList: isEdit.open
						? bannerType.map((type) => ({ ...type, optionLabel: type.label }))
						: arrayToReturn,
					placeholder: 'Select Type',
					isDisabled: isEdit.open,
				},
				...staticFormFields,
			]);
		}
	}, [SABanners?.rows?.length, isEdit]);

	useEffect(() => {
		if (validation?.values?.bannerType) {
			if (
				validation?.values?.bannerType.substr(
					validation?.values?.bannerType?.length - 6
				) === 'Banner'
			) {
				setValidationConditions({
					minRequiredWidth: 600,
					minRequiredHeight: 300,
					maxRequiredWidth: 1600,
					maxRequiredHeight: 600,
				});
			} else {
				setValidationConditions({
					minRequiredWidth: 1000,
					minRequiredHeight: 400,
					maxRequiredWidth: 1920,
					maxRequiredHeight: 768,
				});
			}
		}
	}, [validation?.values]);

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.bannerManagement) &&
			!isEdit.open &&
			isOpen
		) {
			const storedValues = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.bannerManagement))
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

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		buttonList,
		validationConditions,
		isCreateBannerLoading,
		onClickEdit,
		isEditBannerLoading,
		showModal,
		setShowModal,
		isEdit,
	};
};

export default useCreateBanner;
