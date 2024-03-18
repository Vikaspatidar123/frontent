import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getEmailTemplate,
	updateEmailTemplate,
	resetEmailTemplate,
} from '../../../store/actions';

import {
	getInitialValues,
	staticFormFields,
	emailTemplateSchema,
} from '../formDetails';

import { showToastr } from '../../../utils/helpers';
import CreateTemplate from '../CreateTemplate';

const useEditEmailTemplate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { emailTemplateId } = useParams();
	const [customComponent, setCustomComponent] = useState();

	const [template, setTemplate] = useState('');
	const [content, setContent] = useState('');
	const [selectedTab, setSelectedTab] = useState('EN');
	const [showGallery, setShowGallery] = useState(false);
	const isEdit = true;

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { emailTemplate } = useSelector((state) => state.EmailTemplate);

	useEffect(() => {
		if (emailTemplateId) {
			dispatch(getEmailTemplate(emailTemplateId));
		}
	}, [emailTemplateId]);

	useEffect(() => {
		if (selectedTab) {
			setContent((prev) => ({
				...prev,
				[selectedTab]: template,
			}));
		}
	}, [selectedTab, template]);

	useEffect(() => {
		if (emailTemplate) {
			setContent(emailTemplate?.templateCode);
			setTemplate(emailTemplate?.templateCode?.EN);
		}
	}, [emailTemplate]);

	// resetting email template details redux state
	useEffect(() => () => dispatch(resetEmailTemplate()), []);

	const formSubmitHandler = (values) => {
		if (Object?.keys(content)?.length > 0) {
			dispatch(
				updateEmailTemplate({
					data: {
						emailTemplateId,
						templateCode: content,
						eventType: values?.type,
						isDefault: values?.isDefault,
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

	const onChangeRowsPerPage = () => {
		// setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(getLanguagesStart());
		// dispatch(getEmailTypes());
	}, []);

	const { validation, formFields, setFormFields } = useForm({
		initialValues: getInitialValues(emailTemplate),
		validationSchema: emailTemplateSchema,
		staticFormFields: staticFormFields(isEdit),
		onSubmitEntry: formSubmitHandler,
	});

	useEffect(() => {
		setCustomComponent(
			<CreateTemplate
				languageData={languageData}
				emailTemplate={emailTemplate}
				setTemp={setTemplate}
				validation={validation}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				showGallery={showGallery}
				setShowGallery={setShowGallery}
				isEdit={isEdit}
			/>
		);
	}, [languageData, template, selectedTab, showGallery, emailTemplate]);

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
		validation,
		galleryList,
		formFields,
		setFormFields,
		customComponent,
		setCustomComponent,
		onChangeRowsPerPage,
		showGallery,
		setShowGallery,
		handleGalleryClick,
		emailTemplateId,
	};
};

export default useEditEmailTemplate;
