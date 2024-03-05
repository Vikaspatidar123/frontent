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
	const { cmsDynamicKeys, cmsByPageId } = useSelector((state) => state.AllCms);
	const [selectedTab, setSelectedTab] = useState('EN');
	const [title, setTitle] = useState({ EN: '' });
	const [content, setContent] = useState({ EN: '' });

	const formSubmitHandler = (values) => {
		if (values?.content) {
			dispatch(
				updateSaCms({
					cmsData: { ...values, cmsPageId: parseInt(cmsPageId) },
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

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(getCmsByPageId({ cmsPageId }));
	}, []);

	useEffect(() => {
		dispatch(getLanguagesStart());
		dispatch(getCmsDynamicKeys());
	}, []);

	// resetting cms details redux state
	useEffect(() => () => dispatch(resetCmsByPageIdData()), []);

	const { header, validation, setHeader, formFields, setFormFields } = useForm({
		header: `Edit CMS ${cmsPageId}`,
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
				showGallery={showGallery}
				setShowGallery={setShowGallery}
				isEdit
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
			/>
		);
	}, [languageData, title, content, showGallery, selectedTab]);

	const handleGalleryClick = (e) => {
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
		cmsDynamicKeys,
		onChangeRowsPerPage,
		showGallery,
		setShowGallery,
		handleGalleryClick,
	};
};

export default useEditCms;
