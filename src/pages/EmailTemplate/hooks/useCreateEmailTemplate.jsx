/* eslint-disable */
import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLanguagesStart,
	getEmailTypes,
	getDynamicKeys,
	resetEmailTemplate,
	createEmailTemplate,
} from '../../../store/actions';

import {
	getInitialValues,
	staticFormFields,
	emailTemplateSchema,
} from '../formDetails';

import useEmailTemplate from './useEmailTemplate';
import { showToastr } from '../../../utils/helpers';
import CreateTemplate from '../CreateTemplate';
import { modules } from '../../../constants/permissions';

const useCreateEmailTemplate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [customComponent, setCustomComponent] = useState();

	const [template, setTemplate] = useState('');
	const [selectedTab, setSelectedTab] = useState('EN');
	const [showGallery, setShowGallery] = useState(false);

	const { emailTemplateOrder } = useEmailTemplate();

	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const { emailTypes, dynamicKeys } = useSelector(
		(state) => state.EmailTemplate
	);

	const getTemplateKeys = (template) => {
		const mainKeys = [];
		const keys = template.match(/{{{ *[A-Za-z0-9]* *}}}/g);

		// let keys = template.match(/{{{(.*)}}}/g)
		if (keys) {
			keys.forEach((key) => {
				mainKeys.push(key.replaceAll('{', '').replaceAll('}', '').trim());
			});
			return [...new Set(mainKeys)];
		} else {
			return [];
		}
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
									type: parseInt(values?.type),
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
							type: parseInt(values?.type),
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

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(getLanguagesStart({ limit: '', pageNo: '', name: '' }));
		dispatch(getEmailTypes());
	}, []);

	const { validation, formFields, setFormFields } = useForm({
		initialValues: getInitialValues(),
		validationSchema: emailTemplateSchema,
		staticFormFields: staticFormFields(emailTemplateOrder),
		onSubmitEntry: formSubmitHandler,
	});

	useEffect(() => {
		emailTypes && dispatch(getDynamicKeys({ type: 0, emailTypes }));
		return () => {
			resetEmail();
		};
	}, [emailTypes]);

	const resetEmail = () => dispatch(resetEmailTemplate());

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

	const handleCreateClick = (e) => {
		e.preventDefault();
		navigate('create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleCreateClick,
			link: '#!',
			module: modules.EmailTemplate,
			operation: 'C',
		},
	]);

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
		validation,
		buttonList,
		galleryList,
		formFields,
		setFormFields,
		customComponent,
		setCustomComponent,
		onChangeRowsPerPage,
		showGallery,
		setShowGallery,
		handleGalleryClick,
	};
};

export default useCreateEmailTemplate;
