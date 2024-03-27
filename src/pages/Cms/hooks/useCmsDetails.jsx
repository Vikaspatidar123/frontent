import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getCmsByPageId,
	resetCmsByPageIdData,
} from '../../../store/actions';

import {
	getInitialValues,
	createCmsNewSchema,
	staticFormFields,
} from '../formDetails';

import CreateCMSTemplate from '../CreateCMSTemplate';

const useCmsDetail = () => {
	const { cmsPageId } = useParams();
	const dispatch = useDispatch();
	const [customComponent, setCustomComponent] = useState();
	const [selectedTab, setSelectedTab] = useState('EN');
	const [isView, setIsView] = useState(true);

	const [template, setTemplate] = useState('');
	const [langTitle, setLangTitle] = useState('');
	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { cmsByPageId } = useSelector((state) => state.AllCms);
	const [title, setTitle] = useState({ EN: '' });
	const [content, setContent] = useState({ EN: '' });

	useEffect(() => {
		dispatch(getCmsByPageId({ cmsPageId }));
		dispatch(getLanguagesStart());
	}, []);

	useEffect(() => {
		if (cmsByPageId) {
			setTitle(cmsByPageId?.page?.title);
			setContent(cmsByPageId?.page?.content);
		}
	}, [cmsByPageId]);

	// resetting cms details redux state
	useEffect(() => () => dispatch(resetCmsByPageIdData()), []);

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		initialValues: getInitialValues(cmsByPageId?.page),
		validationSchema: createCmsNewSchema,
		staticFormFields: staticFormFields(isView),
	});

	useEffect(() => {
		setCustomComponent(
			<CreateCMSTemplate
				languageData={languageData}
				cmsByPageId={cmsByPageId?.page}
				validation={validation}
				title={title}
				setTitle={(v) => setTitle(v)}
				content={content}
				setContent={(v) => setContent(v)}
				isView={isView}
				setIsView={(v) => setIsView(v)}
				selectedTab={selectedTab}
				setSelectedTab={(v) => setSelectedTab(v)}
				template={template}
				setTemplate={setTemplate}
				langTitle={langTitle}
				setLangTitle={setLangTitle}
			/>
		);
	}, [languageData, title, content, selectedTab, langTitle, template]);

	return {
		header,
		validation,
		setHeader,
		formFields,
		setFormFields,
		languageData,
		customComponent,
		setCustomComponent,
		cmsByPageId,
	};
};

export default useCmsDetail;
