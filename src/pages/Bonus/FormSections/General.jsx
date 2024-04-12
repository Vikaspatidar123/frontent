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
	generalStepInitialValuesFromLocalStorage,
} from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import Spinners from '../../../components/Common/Spinner';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { BONUS_TYPES, bonusTypes, daysOfWeek } from '../constants';
import { generalFormSchema } from '../Validation/schema';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { dataURLtoBlob } from '../../../utils/helpers';

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
	existingFilledFields,
	setExistingFilledFields,
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

	const isStickyChangeCallback = (e) => {
		validation.setFieldValue(
			'wageringRequirementType',
			e.target.value === 'true' ? 'bonusdeposit' : 'bonus'
		);
	};

	const handleBonusTypeChange = (e, type, firstRender = false) => {
		e?.preventDefault();
		const bonusType = e?.target?.value || type;
		if (!firstRender) {
			setBonusTypeChanged(true);
			setSelectedCountries([]);
			setSelectedGames([]);
			validation.setFieldValue('visibleInPromotions', false);
			validation.setFieldValue('validOnDays', []);
			validation.setFieldValue('wageringRequirementType', 'bonus');
			if (bonusType === BONUS_TYPES.FREESPINS) {
				validation.setFieldValue('isSticky', true);
			} else {
				validation.setFieldValue('isSticky', false);
			}
			setExistingFilledFields({
				...existingFilledFields,
				bonusType,
				selectedCountries: [],
				visibleInPromotions: false,
				validOnDays: [],
				wageringRequirementType: 'bonus',
				isSticky: bonusType === BONUS_TYPES.FREESPINS,
			});
			window.localStorage.removeItem(formPageTitle.bonusManagement);
		}
		setSelectedBonus(bonusType);
		switch (bonusType) {
			case BONUS_TYPES.DEPOSIT:
				setFormFields([
					...generalStaticFormFields(
						bonusDetails?.claimedCount,
						bonusDetails ? [bonusDetails.validFrom, bonusDetails.validTo] : []
					),
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
					...typeDepositAdditionalFields(
						bonusDetails?.claimedCount,
						isStickyChangeCallback
					),
				]);
				break;
			case BONUS_TYPES.FREESPINS:
				setFormFields([
					...generalStaticFormFieldsWithoutPercent(
						bonusDetails?.claimedCount,
						bonusDetails ? [bonusDetails.validFrom, bonusDetails.validTo] : []
					),
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
			case BONUS_TYPES.JOINING:
				setFormFields([
					...generalStaticFormFieldsWithoutPercent(
						bonusDetails?.claimedCount,
						bonusDetails ? [bonusDetails?.validFrom, bonusDetails?.validTo] : []
					),
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
					{
						name: 'joiningAmount',
						fieldType: 'textField',
						type: 'number',
						label: 'Joining Amount',
						placeholder: 'Joining Amount',
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
		handleBonusTypeChange(
			null,
			bonusDetails?.bonusType || BONUS_TYPES.DEPOSIT,
			true
		);
	}, [bonusDetails]);

	useEffect(() => {
		if (isInitialFieldRendered) {
			if (
				validation?.values?.visibleInPromotions &&
				validation?.values?.bonusType !== BONUS_TYPES.JOINING
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
		if (
			isInitialFieldRendered &&
			validation?.values?.bonusType === BONUS_TYPES.JOINING
		) {
			const excludedFields = [
				'depositBonusPercent',
				'ranges',
				'isSticky',
				'wageringMultiplier',
				'wageringRequirementType',
				'daysToClear',
				'visibleInPromotions',
				'showBonusValidity',
				'toggle',
			];

			const copyArray = formFields.filter(
				(field) => !excludedFields.includes(field?.name)
			);

			setFormFields(copyArray);
		}
	}, [isInitialFieldRendered, validation?.values?.bonusType]);

	useEffect(() => {
		if (existingFilledFields) {
			setExistingFilledFields((prev) => ({
				...prev,
				...validation.values,
			}));
		}
	}, [validation.values]);

	useEffect(() => {
		if (localStorage.getItem(formPageTitle.bonusManagement)) {
			const storedValues = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.bonusManagement))
			);
			if (storedValues?.bonusImage?.thumbnail) {
				const base64Content = storedValues.bonusImage?.thumbnail;
				const blob = dataURLtoBlob(base64Content);

				storedValues.bonusImage = new File(
					[blob],
					storedValues.bonusImage.name,
					{
						type: blob.type,
					}
				);
			}
			validation.setValues(
				generalStepInitialValuesFromLocalStorage(storedValues)
			);
		}
	}, []);

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
