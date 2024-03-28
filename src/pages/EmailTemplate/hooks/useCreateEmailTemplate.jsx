import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, isEqual } from 'lodash';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	resetEmailTemplate,
	createEmailTemplate,
} from '../../../store/actions';

import {
	getInitialValues,
	staticFormFields,
	emailTemplateSchema,
	initialData,
} from '../formDetails';

import { showToastr } from '../../../utils/helpers';
import CreateTemplate from '../CreateTemplate';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';

const useCreateEmailTemplate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [customComponent, setCustomComponent] = useState();

	const [template, setTemplate] = useState('');
	const [content, setContent] = useState({ EN: '' });
	const [selectedTab, setSelectedTab] = useState('EN');
	const [showGallery, setShowGallery] = useState(false);
	const [existingFilledFields, setExistingFilledFields] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const { languageData } = useSelector((state) => state.CasinoManagementData);

	useEffect(() => {
		setContent((prev) => ({
			...prev,
			[selectedTab]: template,
		}));
	}, [template]);

	const formSubmitHandler = (values) => {
		if (isEmpty(content[selectedTab])) {
			showToastr({
				message: 'Content cannot be empty.',
				type: 'error',
			});
		} else {
			dispatch(
				createEmailTemplate({
					data: {
						label: values?.label,
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
		initialValues: getInitialValues(),
		validationSchema: emailTemplateSchema,
		staticFormFields: staticFormFields(),
		onSubmitEntry: formSubmitHandler,
	});

	useEffect(
		() => () => {
			dispatch(resetEmailTemplate());
		},
		[]
	);

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
				content={content}
				setContent={setContent}
				template={template}
			/>
		);
	}, [languageData, template, selectedTab, showGallery, content]);

	const handleGalleryClick = (e) => {
		e.preventDefault();
		setShowGallery(true);
	};

	const galleryList = useMemo(() => [
		{
			label: 'Image Gallery',
			handleClick: handleGalleryClick,
			link: '#!',
		},
	]);

	useEffect(() => {
		setExistingFilledFields({
			...existingFilledFields,
			values: {
				...validation.values,
				content,
			},
		});
	}, [validation.values, content]);

	useEffect(() => {
		if (localStorage.getItem(formPageTitle.crm)) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.crm))
			);
			validation.setValues({
				label: values?.label,
				type: values?.type,
				isDefault: values?.isDefault,
			});
			setContent(values?.content);
		}
	}, []);

	const onBackClick = () => {
		if (!isEmpty(existingFilledFields)) {
			const existingFilledFieldsCopy = existingFilledFields?.values;
			const isDataEqual = isEqual(existingFilledFieldsCopy, initialData);
			if (!isDataEqual) {
				setShowModal(true);
			} else {
				navigate('/email-templates');
			}
		}
	};

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
		showModal,
		setShowModal,
		navigate,
		existingFilledFields,
		onBackClick,
	};
};

export default useCreateEmailTemplate;
