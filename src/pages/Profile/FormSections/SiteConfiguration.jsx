/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import {
	adminSiteConfigSchema,
	getSiteConfigInitialValues,
	leftStaticSiteConfigFormFields,
	rightStaticSiteConfigFormFields,
} from '../formDetails';

import useForm from '../../../components/Common/Hooks/useFormModal';

import Spinners from '../../../components/Common/Spinner';
import FormPage from '../../../components/Common/FormPage';

const SiteConfig = ({
	details,
	languageData,
	editableSiteConfig,
	setEditableSiteConfig,
	updateSiteConfiguration,
	isLanguageDataLoading,
}) => {
	const languageOptions =
		languageData?.rows?.map(({ code, languageName }) => ({
			value: code,
			label: languageName,
		})) || [];

	const handleSubmit = (values) => {
		const label = {};
		if (values?.lang) {
			languageOptions.forEach((language) => {
				if (values?.lang.includes(language.label)) {
					label[language.value] = language.label;
				}
			});
		}
		updateSiteConfiguration({
			...values,
			lang: label && JSON.stringify(label),
		});
		setEditableSiteConfig(true);
	};

	const {
		leftFormFields,
		rightFormFields,
		setLeftFormFields,
		setRightFormFields,
		validation,
	} = useForm({
		initialValues: getSiteConfigInitialValues(details),
		validationSchema: adminSiteConfigSchema,
		onSubmitEntry: handleSubmit,
		leftStaticFormFields: leftStaticSiteConfigFormFields(editableSiteConfig),
		rightStaticFormFields: rightStaticSiteConfigFormFields(editableSiteConfig),
	});

	useEffect(() => {
		if (details.length) {
			setLeftFormFields(leftStaticSiteConfigFormFields(editableSiteConfig));
			setRightFormFields([
				...rightStaticSiteConfigFormFields(editableSiteConfig),
				{
					name: 'lang',
					fieldType: 'select',
					label: 'Allowed Languages',
					isDisabled: editableSiteConfig,
					callBack: (option) => {
						const isExist = option.find((op) => op.value === 'EN');
						if (!isExist) {
							option.unshift({ label: 'English', value: 'EN' });
						}
						validation.setFieldValue('lang', option);
					},
					multiSelectOption: languageOptions,
					multiple: true,
				},
				{
					name: 'maintenance',
					fieldType: 'toggle',
					label: 'Maintenance',
					isDisabled: editableSiteConfig,
					divClass: 'maintenance-margin',
				},
			]);
		}
	}, [editableSiteConfig]);

	useEffect(() => {
		if (details.length) {
			validation.resetForm({
				values: getSiteConfigInitialValues(details),
			});
			setRightFormFields([
				...rightStaticSiteConfigFormFields(editableSiteConfig),
				{
					name: 'lang',
					fieldType: 'select',
					label: 'Allowed Languages',
					isDisabled: editableSiteConfig,
					callBack: (option) => {
						const isExist = option.find((op) => op.value === 'EN');
						if (!isExist) {
							option.unshift({ label: 'English', value: 'EN' });
						}
						validation.setFieldValue('lang', option);
					},
					multiSelectOption: languageOptions,
					multiple: true,
				},
				{
					name: 'maintenance',
					fieldType: 'toggle',
					label: 'Maintenance',
					isDisabled: editableSiteConfig,
					divClass: 'maintenance-margin',
				},
			]);
		}
	}, [details]);
	console.log('VAlues = ', validation.values, details[1]);
	return (
		<Row>
			<Col lg="12">
				{isLanguageDataLoading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<FormPage
						validation={validation}
						leftFormFields={leftFormFields}
						rightFormFields={rightFormFields}
						submitLabel="Submit"
						isSubmit={!editableSiteConfig}
						isEdit={editableSiteConfig}
						enableEdit={setEditableSiteConfig}
						customColClasses=""
						isSubmitLoading={isLanguageDataLoading}
					/>
				)}
			</Col>
		</Row>
	);
};

SiteConfig.defaultProps = {};

export default SiteConfig;
