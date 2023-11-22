/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import {
	getCreateBonusInitialValues,
	generalStaticFormFields,
	typeDepositAdditionalFields,
	typeFreeSpinAdditionalFields,
	commonFields,
} from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import Spinners from '../../../components/Common/Spinner';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { bonusTypes, daysOfWeek } from '../constants';
import { generalFormSchema } from '../Validation/schema';

const General = ({
	isLoading,
	nextPressed,
	setActiveTab,
	setNextPressed,
	setAllFields,
	setSelectedBonus,
	setLangContent,
}) => {
	const [isDaysFieldAdded, setIsDaysFieldAdded] = useState(false);
	const handleSubmit = (values) => {
		setAllFields((prev) => ({ ...prev, ...values }));
		setActiveTab(values.nextTab);
		setLangContent((prev) => ({
			promoTitle: { ...prev.promoTitle, EN: values.promotionTitle },
			terms: { ...prev.terms, EN: values.termCondition },
			desc: { ...prev.desc, EN: values.description },
		}));
	};

	const { formFields, setFormFields, validation } = useForm({
		initialValues: getCreateBonusInitialValues(),
		validationSchema: generalFormSchema(),
		// staticFormFields: generalStaticFormFields(),
		onSubmitEntry: handleSubmit,
	});

	useEffect(() => {
		if (nextPressed.currentTab === 'general') {
			validation.setFieldValue('nextTab', nextPressed.nextTab);
			validation.submitForm();
			setNextPressed({});
		}
	}, [nextPressed]);

	const handleBonusTypeChange = (e, type) => {
		e?.preventDefault();
		const bonusType = e?.target?.value || type;
		setSelectedBonus(bonusType);
		switch (bonusType) {
			case 'deposit':
				setFormFields([
					...generalStaticFormFields(),
					{
						name: 'bonusType',
						fieldType: 'select',
						label: 'Bonus Type',
						placeholder: 'Select Bonus type',
						callBack: handleBonusTypeChange,
						optionList: bonusTypes.map(({ label, value, id }) => ({
							optionLabel: label,
							value,
							id,
						})),
					},
					...typeDepositAdditionalFields(),
				]);
				break;
			case 'freespins':
				setFormFields([
					...generalStaticFormFields(),
					{
						name: 'bonusType',
						fieldType: 'select',
						label: 'Bonus Type',
						placeholder: 'Select Bonus type',
						callBack: handleBonusTypeChange,
						optionList: bonusTypes.map(({ label, value, id }) => ({
							optionLabel: label,
							value,
							id,
						})),
					},
					...typeFreeSpinAdditionalFields(),
				]);
				break;
			case 'promotion':
				setFormFields([
					...generalStaticFormFields(),
					{
						name: 'bonusType',
						fieldType: 'select',
						label: 'Bonus Type',
						placeholder: 'Select Bonus type',
						callBack: handleBonusTypeChange,
						optionList: bonusTypes.map(({ label, value, id }) => ({
							optionLabel: label,
							value,
							id,
						})),
					},
					...commonFields(),
				]);
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		handleBonusTypeChange(null, 'deposit');
	}, []);

	useEffect(() => {
		if (
			validation.values.visibleInPromotions &&
			validation.values.bonusType !== 'promotion'
		) {
			const copyArray = [...formFields];
			copyArray.splice(
				validation.values.bonusType === 'freespins' ? 12 : 11,
				0,
				{
					name: 'validOnDays',
					fieldType: 'radioGroupMulti',
					label: 'Valid On Days',
					optionList: daysOfWeek.map(({ label, value, id }) => ({
						optionLabel: label,
						value,
						id,
					})),
					fieldColOptions: { lg: 12 },
					isNewRow: true,
				}
			);
			setFormFields(copyArray);
			setIsDaysFieldAdded(true);
		} else if (isDaysFieldAdded) {
			const copyArray = formFields.filter(
				(field) => field.name !== 'validOnDays'
			);
			setFormFields(copyArray);
			setIsDaysFieldAdded(false);
		}
	}, [validation.values.visibleInPromotions, validation.values.bonusType]);

	useEffect(() => {
		if (validation.values.isSticky === 'true') {
			validation.setFieldValue('wageringRequirementType', false);
		} else {
			validation.setFieldValue('wageringRequirementType', true);
		}
	}, [validation.values.isSticky]);

	return (
		<Row>
			<Col lg="12">
				{isLoading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<FormPage
						validation={validation}
						responsiveFormFields={formFields}
						customColClasses=""
						colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
						isSubmit={false}
					/>
				)}
			</Col>
		</Row>
	);
};

General.defaultProps = {};

export default General;
