/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { isEmpty, isEqual } from 'lodash';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getCmsDynamicKeys,
	createSaCms,
} from '../../../store/actions';

import {
	getInitialValues,
	createCmsNewSchema,
	staticFormFields,
	initialData,
} from '../formDetails';
import CreateCMSTemplate from '../CreateCMSTemplate';

import { showToastr } from '../../../utils/helpers';
import { modules } from '../../../constants/permissions';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';

const useCreateCms = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [customComponent, setCustomComponent] = useState();
	const [showGallery, setShowGallery] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { cmsDynamicKeys } = useSelector((state) => state.AllCms);
	const [selectedTab, setSelectedTab] = useState('EN');
	const [title, setTitle] = useState({ EN: '' });
	const [content, setContent] = useState({ EN: '' });
	const [existingFilledFields, setExistingFilledFields] = useState({});

	const formSubmitHandler = (values) => {
		if (title[selectedTab] === '' || content[selectedTab] === '') {
			showToastr({
				message: 'Please fill all the required fields',
				type: 'error',
			});
		} else {
			for (const lang in title) {
				if (
					[undefined, ''].includes(content?.[lang]) &&
					[undefined, ''].includes(title?.[lang])
				) {
					delete title[lang];
					delete content[lang];
				}
			}
			dispatch(
				createSaCms({ cmsData: { ...values, title, content }, navigate })
			);
		}
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getCmsDynamicKeys());
	}, []);

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		header: 'Create CMS',
		initialValues: getInitialValues(),
		validationSchema: createCmsNewSchema,
		staticFormFields: staticFormFields(),
		onSubmitEntry: formSubmitHandler,
	});

	useEffect(() => {
		setCustomComponent(
			<CreateCMSTemplate
				languageData={languageData}
				validation={validation}
				cmsKeys={cmsDynamicKeys}
				title={title}
				setTitle={(v) => setTitle(v)}
				content={content}
				setContent={(v) => setContent(v)}
				showGallery={showGallery}
				setShowGallery={setShowGallery}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>
		);
	}, [languageData, title, content, showGallery, selectedTab]);

	useEffect(() => {
		setExistingFilledFields({
			...existingFilledFields,
			values: {
				...validation.values,
				title,
				content,
			},
		});
	}, [title, content, validation?.values]);

	const handleCreateClick = (e) => {
		e.preventDefault();
		navigate('create');
	};

	const handleGalleryClick = (e) => {
		setShowGallery(true);
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleCreateClick,
			link: '#!',
			module: modules.CMS,
			operation: 'C',
		},
	]);

	const galleryList = useMemo(() => [
		{
			label: 'Image Gallery',
			handleClick: handleGalleryClick,
			link: '#!',
		},
	]);

	useEffect(() => {
		if (localStorage.getItem(formPageTitle.cms)) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.cms))
			);
			validation.setValues({
				category: values?.category,
				title: values?.title?.EN || '',
				content: values?.content?.EN || '',
				slug: values?.slug || '',
				isActive: values?.isActive || false,
				language: values?.language || '',
			});

			setTitle({ EN: values?.title?.EN || '' });
			setContent({ EN: values?.content?.EN || '' });
		}
	}, []);

	const onBackClick = () => {
		if (!isEmpty(existingFilledFields)) {
			const existingFilledFieldsCopy = existingFilledFields?.values;
			const isDataEqual = isEqual(existingFilledFieldsCopy, initialData);
			if (!isDataEqual) {
				setShowModal(true);
			} else {
				navigate('/cms');
			}
		}
	};

	return {
		header,
		validation,
		setHeader,
		buttonList,
		galleryList,
		formFields,
		setFormFields,
		languageData,
		customComponent,
		setCustomComponent,
		cmsDynamicKeys,
		onChangeRowsPerPage,
		showGallery,
		setShowGallery,
		handleGalleryClick,
		showModal,
		setShowModal,
		navigate,
		existingFilledFields,
		onBackClick,
	};
};

export default useCreateCms;
