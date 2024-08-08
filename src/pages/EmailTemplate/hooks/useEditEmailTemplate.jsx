import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

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
	const [content, setContent] = useState({ EN: '' });
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
		setContent((prev) => ({
			...prev,
			[selectedTab]: template,
		}));
	}, [template]);

	useEffect(() => {
		if (emailTemplate) {
			setContent(emailTemplate?.templateCode);
		}
	}, [emailTemplate]);

	// resetting email template details redux state
	useEffect(() => () => dispatch(resetEmailTemplate()), []);

	const formSubmitHandler = (values) => {
		if (isEmpty(content[selectedTab])) {
			showToastr({
				message: 'Content cannot be empty.',
				type: 'error',
			});
		} else {
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
		}
	};

	const onChangeRowsPerPage = () => {
		// setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(getLanguagesStart());
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
				setTemplate={setTemplate}
				validation={validation}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				showGallery={showGallery}
				setShowGallery={setShowGallery}
				isEdit={isEdit}
				content={content}
				setContent={setContent}
				template={template}
			/>
		);
	}, [
		languageData,
		content,
		selectedTab,
		showGallery,
		emailTemplate,
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
		emailTemplate,
	};
};

export default useEditEmailTemplate;
