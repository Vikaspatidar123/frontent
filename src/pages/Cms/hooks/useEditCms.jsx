/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable radix */
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getCmsDynamicKeys,
	getCmsByPageId,
	updateSaCms,
} from '../../../store/actions';

import {
	getInitialValues,
	createCmsNewSchema,
	staticFormFields,
} from '../formDetails';

import CreateCMSTemplate from '../CreateCMSTemplate';

const useEditCms = () => {
	const navigate = useNavigate();
	const { cmsPageId } = useParams();
	const dispatch = useDispatch();
	const [customComponent, setCustomComponent] = useState();

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { cmsDynamicKeys, cmsByPageId } = useSelector((state) => state.AllCms);
	const [title, setTitle] = useState({ EN: '' });
	const [content, setContent] = useState({ EN: '' });

	const formSubmitHandler = (values) => {
		dispatch(
			updateSaCms({
				cmsData: { ...values, cmsPageId: parseInt(cmsPageId) },
				navigate,
			})
		);
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(getCmsByPageId({ cmsPageId }));
	}, []);

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getCmsDynamicKeys());
	}, []);

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		header: 'Edit CMS',
		initialValues: getInitialValues(cmsByPageId),
		validationSchema: createCmsNewSchema,
		staticFormFields: staticFormFields(),
		onSubmitEntry: formSubmitHandler,
	});

	useEffect(() => {
		setCustomComponent(
			<CreateCMSTemplate
				languageData={languageData}
				cmsByPageId={cmsByPageId}
				validation={validation}
				cmsKeys={cmsDynamicKeys}
				title={title}
				setTitle={(v) => setTitle(v)}
				content={content}
				setContent={(v) => setContent(v)}
				isEdit
			/>
		);
	}, [languageData, title, content]);

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

export default useEditCms;
