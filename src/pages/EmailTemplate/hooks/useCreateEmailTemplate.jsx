import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
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
	const [content, setContent] = useState('');
	const [selectedTab, setSelectedTab] = useState('EN');
	const [showGallery, setShowGallery] = useState(false);
	const [existingFilledFields, setExistingFilledFields] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const { languageData } = useSelector((state) => state.CasinoManagementData);

	useEffect(() => {
		if (selectedTab) {
			setContent((prev) => ({
				...prev,
				[selectedTab]: template,
			}));
		}
	}, [selectedTab, template]);

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

	const resetEmail = () => dispatch(resetEmailTemplate());

	useEffect(
		() => () => {
			resetEmail();
		},
		[]
	);

	useEffect(() => {
		setCustomComponent(
			<CreateTemplate
				languageData={languageData}
				setTemp={setTemplate}
				validation={validation}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				showGallery={showGallery}
				setShowGallery={setShowGallery}
				content={content}
			/>
		);
	}, [languageData, template, selectedTab, showGallery]);

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
				template,
			},
		});
	}, [validation.values, template]);

	useEffect(() => {
		if (localStorage.getItem(formPageTitle.crm)) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.crm))
			);
			validation.setValues({
				label: values?.label,
				type: parseInt(values?.type, 10),
			});
			setTemplate(values?.template);
		}
	}, []);

	const onBackClick = () => {
		const hasFilledValues = Object.values(existingFilledFields?.values).some(
			(value) => !isEmpty(value)
		);
		if (hasFilledValues) {
			setShowModal(true);
		} else {
			navigate('/email-templates');
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
