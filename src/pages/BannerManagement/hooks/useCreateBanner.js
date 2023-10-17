/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { createSABannersStart } from '../../../store/actions';

const useCreateBanner = () => {
	const dispatch = useDispatch();
	const [validationConditions, setValidationConditions] = useState({
		minRequiredWidth: '',
		minRequiredHeight: '',
		maxRequiredWidth: '',
		maxRequiredHeight: '',
	});
	const { isCreateBannerLoading, bannerList } = useSelector(
		(state) => state.SASettings
	);

	const handleCreateBanner = (values) => {
		dispatch(
			createSABannersStart({
				data: {
					tenantId: values?.tenantId,
					bannerKey: values?.bannerType,
					image: values?.thumbnail,
				},
			})
		);
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Banner',
			initialValues: getInitialValues(),
			validationSchema: validationSchema({
				type: 'Create',
				minRequiredWidth: validationConditions?.minRequiredWidth,
				minRequiredHeight: validationConditions?.minRequiredHeight,
				maxRequiredWidth: validationConditions?.maxRequiredWidth,
				maxRequiredHeight: validationConditions?.maxRequiredHeight,
			}),
			staticFormFields,
			onSubmitEntry: handleCreateBanner,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [bannerList?.length]);

	const buttonList = useMemo(() => [
		{
			label: 'Upload',
			handleClick: handleAddClick,
			link: '#!',
		},
	]);

	useEffect(() => {
		if (validation?.values?.bannerType) {
			if (
				validation?.values?.bannerType.substr(
					validation?.values?.bannerType?.length - 6
				) === 'Banner'
			) {
				setValidationConditions({
					minRequiredWidth: 400,
					minRequiredHeight: 400,
					maxRequiredWidth: 600,
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
	};
};

export default useCreateBanner;
