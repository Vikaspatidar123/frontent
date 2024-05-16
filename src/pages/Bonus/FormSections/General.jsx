/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { commonFields, getCreateBonusInitialValues } from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import Spinners from '../../../components/Common/Spinner';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { BONUS_TYPES, bonusTypes } from '../constants';
import { generalFormSchema } from '../Validation/schema';

const General = ({
	isLoading,
	nextPressed,
	setActiveTab,
	setNextPressed,
	setAllFields,
	setSelectedBonus,
	setLangContent,
	setSelectedGames,
	setBonusTypeChanged,
	bonusDetails,
}) => {
	const [isInitialFieldRendered, setIsInitialFieldsRendered] = useState(false);

	const handleSubmit = (values) => {
		setAllFields((prev) => ({
			...prev,
			...values,
		}));
		window.scrollTo(0, 0);

		setLangContent((prev) => ({
			promoTitle: { ...prev.promoTitle, EN: values.promotionTitle },
			terms: { ...prev.terms, EN: values.termCondition },
			desc: { ...prev.desc, EN: values.description },
		}));
		setActiveTab(nextPressed.nextTab);
	};

	const { formFields, setFormFields, validation } = useForm({
		initialValues: getCreateBonusInitialValues({ bonusDetails }),
		validationSchema: generalFormSchema(),
		onSubmitEntry: handleSubmit,
	});

	useEffect(() => {
		if (nextPressed.currentTab === 'general') {
			validation.submitForm();
			setNextPressed({});
		}
	}, [nextPressed]);

	const handleBonusTypeChange = (e, type, firstRender = false) => {
		e?.preventDefault();
		const bonusType = e?.target?.value || type;
		if (!firstRender) {
			setBonusTypeChanged(true);
			setSelectedGames([]);
			validation.setFieldValue('visibleInPromotions', false);
			validation.setFieldValue('validOnDays', []);
		}
		setSelectedBonus(bonusType);

		// FIXME:
		switch (bonusType) {
			case BONUS_TYPES.DEPOSIT:
				setFormFields([
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
					...commonFields(
						bonusDetails?.claimedCount,
						bonusDetails ? [bonusDetails.validFrom, bonusDetails.validTo] : []
					),
				]);
				break;
			case BONUS_TYPES.FREESPINS:
				setFormFields([
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
					...commonFields(
						bonusDetails?.claimedCount,
						bonusDetails ? [bonusDetails.validFrom, bonusDetails.validTo] : []
					),
				]);
				break;
			case BONUS_TYPES.JOINING:
				setFormFields([
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
					...commonFields(
						bonusDetails?.claimedCount,
						bonusDetails ? [bonusDetails?.validFrom, bonusDetails?.validTo] : []
					),
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
		if (
			isInitialFieldRendered &&
			validation?.values?.bonusType === BONUS_TYPES.JOINING
		) {
			const excludedFields = [
				'ranges',
				'daysToClear',
				'visibleInPromotions',
				'showBonusValidity',
				'validOnDays',
			];

			const newFormFields = formFields.filter(
				(field) => !excludedFields.includes(field?.name)
			);

			setFormFields(newFormFields);
		}
	}, [isInitialFieldRendered, validation?.values?.bonusType]);

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
