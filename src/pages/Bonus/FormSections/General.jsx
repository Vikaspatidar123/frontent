/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import {
	generalStaticFormFields,
	typeDepositAdditionalFields,
	typeFreeSpinAdditionalFields,
	commonFields,
	generalStepInitialValues,
	generalStaticFormFieldsWithoutPercent,
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
	setSelectedCountries,
	setSelectedGames,
	setBonusTypeChanged,
	bonusDetails,
}) => {
	const [isDaysFieldAdded, setIsDaysFieldAdded] = useState(false);
	const [isInitialFieldRendered, setIsInitialFieldsRendered] = useState(false);

	const handleSubmit = (values) => {
		setAllFields((prev) => ({
			...prev,
			...values,
			validFrom: values.startDate,
			validTo: values.endDate,
		}));
		setActiveTab(values.nextTab);
		window.scrollTo(0, 0);
		setLangContent((prev) => ({
			promoTitle: { ...prev.promoTitle, EN: values.promotionTitle },
			terms: { ...prev.terms, EN: values.termCondition },
			desc: { ...prev.desc, EN: values.description },
		}));
	};

	const { formFields, setFormFields, validation } = useForm({
		initialValues: generalStepInitialValues({ bonusDetails }),
		validationSchema: generalFormSchema(),
		onSubmitEntry: handleSubmit,
	});

	useEffect(() => {
		if (nextPressed.currentTab === 'general') {
			validation.setFieldValue('nextTab', nextPressed.nextTab);
			validation.submitForm();
			setNextPressed({});
		}
	}, [nextPressed]);

	const handleBonusTypeChange = (e, type, firstRender = false) => {
		e?.preventDefault();
		if (!firstRender) {
			setBonusTypeChanged(true);
			setSelectedCountries([]);
			setSelectedGames([]);
			validation.setFieldValue('visibleInPromotions', false);
			validation.setFieldValue('validOnDays', []);
			validation.setFieldValue('wageringRequirementType', 'bonus');
		}
		const bonusType = e?.target?.value || type;
		setSelectedBonus(bonusType);
		switch (bonusType) {
			case 'deposit':
				setFormFields([
					...generalStaticFormFields(bonusDetails?.claimedCount),
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
						isDisabled: !!bonusDetails,
					},
					...typeDepositAdditionalFields(bonusDetails?.claimedCount),
				]);
				break;
			case 'freespins':
				setFormFields([
					...generalStaticFormFieldsWithoutPercent(bonusDetails?.claimedCount),
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
						isDisabled: !!bonusDetails,
					},
					...typeFreeSpinAdditionalFields(bonusDetails?.claimedCount),
				]);
				break;
			case 'promotion':
				setFormFields([
					...generalStaticFormFieldsWithoutPercent(bonusDetails?.claimedCount),
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
						isDisabled: !!bonusDetails,
					},
					...commonFields(bonusDetails?.claimedCount),
				]);
				break;
			default:
				break;
		}
		setIsInitialFieldsRendered(true);
	};

	useEffect(() => {
		handleBonusTypeChange(null, bonusDetails?.bonusType || 'deposit', true);
	}, [bonusDetails]);

	useEffect(() => {
		if (isInitialFieldRendered) {
			if (
				validation.values.visibleInPromotions &&
				validation.values.bonusType !== 'promotion'
			) {
				const copyArray = [...formFields];
				copyArray.splice(11, 0, {
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
					isDisabled: bonusDetails?.claimedCount,
				});
				setFormFields(copyArray);
				setIsDaysFieldAdded(true);
			} else if (isDaysFieldAdded) {
				const copyArray = formFields.filter(
					(field) => field.name !== 'validOnDays'
				);
				setFormFields(copyArray);
				validation.setFieldValue('validOnDays', []);
				setIsDaysFieldAdded(false);
			}
		}
	}, [validation.values.visibleInPromotions, isInitialFieldRendered]);

	useEffect(() => {
		if (['true', true].includes(validation.values.isSticky)) {
			validation.setFieldValue('wageringRequirementType', 'bonusdeposit');
		} else {
			validation.setFieldValue('wageringRequirementType', 'bonus');
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
