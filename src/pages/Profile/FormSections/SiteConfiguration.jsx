import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

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
	// languageData,
	editableSiteConfig,
	setEditableSiteConfig,
	updateSiteConfiguration,
	isLanguageDataLoading,
}) => {
	// const [formLanguage, setFormLanguage] = useState([]);
	// const languageOptions =
	// 	languageData?.rows?.map(({ code, name }) => ({
	// 		value: code,
	// 		label: name,
	// 	})) || [];

	const handleSubmit = (values) => {
		// const label = {};
		// if (values?.lang.length) {
		// 	languageOptions?.forEach((language) => {
		// 		if (values?.lang.some((item) => item.label === language.label)) {
		// 			label[language.value] = language.label;
		// 		}
		// 	});
		// }
		updateSiteConfiguration({
			...values,
			// lang: label && JSON.stringify(label),
		});
		setEditableSiteConfig(true);
	};

	// useEffect(() => {
	// 	if (details && details[1]?.value?.languages) {
	// 		const selectedArray = [];
	// 		Object.keys(details[1]?.value?.languages).forEach((key) => {
	// 			const label = {};
	// 			label.label = details[1]?.value?.languages[key];
	// 			label.value = key;
	// 			selectedArray.push(label);
	// 		});
	// 		setFormLanguage(selectedArray);
	// 	}
	// }, [details]);

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
		if (Object.keys(details || {}).length > 0) {
			setLeftFormFields(leftStaticSiteConfigFormFields(editableSiteConfig));
			setRightFormFields([
				...rightStaticSiteConfigFormFields(editableSiteConfig),
				// {
				// 	name: 'lang',
				// 	fieldType: 'select',
				// 	label: 'Allowed Languages',
				// 	isDisabled: editableSiteConfig,
				// 	callBack: (option) => {
				// 		const isExist = option.find((op) => op.value === 'EN');
				// 		if (!isExist) {
				// 			option.unshift({ label: 'English', value: 'EN' });
				// 		}
				// 		validation.setFieldValue('lang', option);
				// 	},
				// 	multiSelectOption: languageOptions,
				// 	multiple: true,
				// },
				{
					name: 'maintenance',
					fieldType: 'toggle',
					label: 'Maintenance',
					isDisabled: editableSiteConfig,
					divClass: 'maintenance-margin',
				},
			]);
		}
	}, [editableSiteConfig, details]);

	useEffect(() => {
		if (Object.keys(details || {}).length > 0) {
			validation.resetForm({
				values: getSiteConfigInitialValues(details),
			});
			setRightFormFields([
				...rightStaticSiteConfigFormFields(editableSiteConfig),
				// {
				// 	name: 'lang',
				// 	fieldType: 'select',
				// 	label: 'Allowed Languages',
				// 	isDisabled: editableSiteConfig,
				// 	callBack: (option) => {
				// 		const isExist = option.find((op) => op.value === 'EN');
				// 		if (!isExist) {
				// 			option.unshift({ label: 'English', value: 'EN' });
				// 		}
				// 		validation.setFieldValue('lang', option);
				// 	},
				// 	multiSelectOption: languageOptions,
				// 	multiple: true,
				// },
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

SiteConfig.defaultProps = {
	details: [],
	// languageData: {},
	editableSiteConfig: false,
	setEditableSiteConfig: () => {},
	updateSiteConfiguration: () => {},
	isLanguageDataLoading: false,
};

SiteConfig.propTypes = {
	details: PropTypes.arrayOf(
		PropTypes.objectOf(
			PropTypes.oneOfType([PropTypes.number, PropTypes.node, PropTypes.string])
		)
	),
	// languageData: PropTypes.objectOf(
	// 	PropTypes.oneOfType([PropTypes.number, PropTypes.node, PropTypes.string])
	// ),
	editableSiteConfig: PropTypes.bool,
	setEditableSiteConfig: PropTypes.func,
	updateSiteConfiguration: PropTypes.func,
	isLanguageDataLoading: PropTypes.bool,
};

export default SiteConfig;
