/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';

import {
	adminSiteConfigSchema,
	getSiteConfigInitialValues,
	leftStaticSiteConfigFormFields,
	rightStaticSiteConfigFormFields,
} from './formDetails';

import useForm from '../../components/Common/Hooks/useFormModal';

import Spinners from '../../components/Common/Spinner';
import FormPage from '../../components/Common/FormPage';

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
					name: 'Maintenance',
					fieldType: 'toggle',
					label: 'maintenance',
					isDisabled: editableSiteConfig,
				},
			]);
		}
	}, [editableSiteConfig]);

	useEffect(() => {
		if (details.length) {
			validation.resetForm({
				values: {
					name: details[1]?.value.name || '',
					url: details[1]?.value.url || '',
					supportEmail: details[1]?.value.supportEmail || '',
					sendgridEmail: details[0]?.value.SENDGRID_EMAIL || '',
					sendgridKey: details[0]?.value.SENDGRID_API_KEY || '',
					logo: null,
					lang: null,
					maintenance: !!details[1]?.value.maintenance,
				},
			});
			setRightFormFields([
				...rightStaticSiteConfigFormFields(editableSiteConfig),
				{
					name: 'lang',
					fieldType: 'select',
					label: 'Allowed Languages',
					isDisabled: editableSiteConfig,
					callBack: (option) => {
						console.log('option: ', option);
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
					name: 'Maintenance',
					fieldType: 'toggle',
					label: 'maintenance',
					isDisabled: editableSiteConfig,
				},
			]);
		}
	}, [details]);

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
