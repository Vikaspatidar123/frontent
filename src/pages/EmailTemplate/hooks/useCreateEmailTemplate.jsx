import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getDynamicKeys,
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
	const [selectedTab, setSelectedTab] = useState('EN');
	const [showGallery, setShowGallery] = useState(false);
	const [existingFilledFields, setExistingFilledFields] = useState([]);
	const [showModal, setShowModal] = useState(false);

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { emailTypes, dynamicKeys } = useSelector(
		(state) => state.EmailTemplate
	);

	const getTemplateKeys = (temp) => {
		const mainKeys = [];
		const keys = temp.match(/{{{ *[A-Za-z0-9]* *}}}/g);

		// let keys = template.match(/{{{(.*)}}}/g)
		if (keys) {
			keys.forEach((key) => {
				mainKeys.push(key.replaceAll('{', '').replaceAll('}', '').trim());
			});
			return [...new Set(mainKeys)];
		}
		return [];
	};

	const formSubmitHandler = (values) => {
		if (template) {
			const allKeys = dynamicKeys?.map((item) => item.key);
			const requiredKeys = dynamicKeys
				.filter((item) => item.required === true)
				.map((item) => item.key);

			const templateKeys = getTemplateKeys(template);
			if (templateKeys?.length || requiredKeys?.length) {
				if (allKeys.some((r) => templateKeys.includes(r))) {
					if (requiredKeys.every((v) => templateKeys.includes(v))) {
						dispatch(
							createEmailTemplate({
								data: {
									...values,
									type: parseInt(values?.type, 10),
									templateCode: template,
									language: selectedTab,
									dynamicData: templateKeys,
								},
								navigate,
							})
						);
					} else {
						showToastr({
							message: 'Please Use All Required Dynamic Keys',
							type: 'error',
						});
					}
				} else {
					showToastr({
						message: 'Invalid Dynamic Keys',
						type: 'error',
					});
				}
			} else {
				dispatch(
					createEmailTemplate({
						data: {
							...values,
							type: parseInt(values?.type, 10),
							templateCode: template,
							language: selectedTab,
							dynamicData: templateKeys,
						},
						navigate,
					})
				);
			}
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
		initialValues: getInitialValues(),
		validationSchema: emailTemplateSchema,
		staticFormFields: staticFormFields(),
		onSubmitEntry: formSubmitHandler,
	});

	const resetEmail = () => dispatch(resetEmailTemplate());

	useEffect(() => {
		if (emailTypes) {
			dispatch(getDynamicKeys({ type: 0, emailTypes }));
		}
		return () => {
			resetEmail();
		};
	}, [emailTypes]);

	useEffect(() => {
		setCustomComponent(
			<CreateTemplate
				languageData={languageData}
				dynamicKeys={dynamicKeys}
				setTemp={setTemplate}
				validation={validation}
				selectedTab={selectedTab}
				setSelectedTab={setSelectedTab}
				showGallery={showGallery}
				setShowGallery={setShowGallery}
			/>
		);
	}, [languageData, dynamicKeys, template, selectedTab, showGallery]);

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
