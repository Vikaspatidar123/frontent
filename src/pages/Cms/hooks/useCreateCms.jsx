/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

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
} from '../formDetails';
import CreateCMSTemplate from '../CreateCMSTemplate';

const useCreateCms = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [customComponent, setCustomComponent] = useState();

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { cmsDynamicKeys } = useSelector((state) => state.AllCms);
	const [title, setTitle] = useState({ EN: '' });
	const [content, setContent] = useState({ EN: '' });

	const formSubmitHandler = (values) => {
		for (const lang in title) {
			if (
				[undefined, ''].includes(content?.[lang]) &&
				[undefined, ''].includes(title?.[lang])
			) {
				delete title[lang];
				delete content[lang];
			}
		}
		dispatch(createSaCms({ cmsData: { ...values, title, content }, navigate }));
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
			/>
		);
	}, [languageData, title, content]);

	const handleCreateClick = (e) => {
		e.preventDefault();
		navigate('create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleCreateClick,
			link: '#!',
		},
	]);

	const galleryList = useMemo(() => [
		{
			label: 'Image Gallery',
			handleClick: '',
			link: '#!',
		},
	]);

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
	};
};

export default useCreateCms;
