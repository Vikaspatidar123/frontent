import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getCmsByPageId,
	updateSaCms,
	resetCmsByPageIdData,
} from '../../../store/actions';

import {
	getInitialValues,
	createCmsNewSchema,
	staticFormFields,
} from '../formDetails';

import CreateCMSTemplate from '../CreateCMSTemplate';
import { showToastr } from '../../../utils/helpers';

const useEditCms = () => {
	const navigate = useNavigate();
	const { cmsPageId } = useParams();
	const dispatch = useDispatch();
	const [showGallery, setShowGallery] = useState(false);
	const [customComponent, setCustomComponent] = useState();

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { cmsByPageId } = useSelector((state) => state.AllCms);
	const [selectedTab, setSelectedTab] = useState('EN');
	const [title, setTitle] = useState({ EN: '' });
	const [content, setContent] = useState({ EN: '' });
	const [template, setTemplate] = useState('');
	const [langTitle, setLangTitle] = useState('');

	useEffect(() => {
		setTitle((prev) => ({
			...prev,
			[selectedTab]: langTitle,
		}));
	}, [langTitle]);

	useEffect(() => {
		setContent((prev) => ({
			...prev,
			[selectedTab]: template,
		}));
	}, [template]);

	useEffect(() => {
		if (cmsByPageId) {
			setTitle(cmsByPageId?.page?.title);
			setContent(cmsByPageId?.page?.content);
		}
	}, [cmsByPageId]);

	const formSubmitHandler = (values) => {
		if (content) {
			dispatch(
				updateSaCms({
					cmsData: {
						...values,
						title,
						content,
						pageId: cmsPageId,
					},
					navigate,
				})
			);
		} else {
			showToastr({
				message: 'Content Required',
				type: 'error',
			});
		}
	};

	useEffect(() => {
		dispatch(getCmsByPageId({ cmsPageId }));
		dispatch(getLanguagesStart());
	}, []);

	// resetting cms details redux state
	useEffect(() => () => dispatch(resetCmsByPageIdData()), []);

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		initialValues: getInitialValues(cmsByPageId?.page),
		validationSchema: createCmsNewSchema,
		staticFormFields: staticFormFields(),
		onSubmitEntry: formSubmitHandler,
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
				showGallery={showGallery}
				setShowGallery={setShowGallery}
				isEdit
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				template={template}
				setTemplate={setTemplate}
				langTitle={langTitle}
				setLangTitle={setLangTitle}
			/>
		);
	}, [
		languageData,
		title,
		content,
		showGallery,
		selectedTab,
		langTitle,
		template,
	]);

	const handleGalleryClick = () => {
		setShowGallery(true);
	};

	const galleryList = useMemo(() => [
		{
			label: 'Image Gallery',
			handleClick: handleGalleryClick,
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
		showGallery,
		setShowGallery,
		handleGalleryClick,
		cmsByPageId,
	};
};

export default useEditCms;
