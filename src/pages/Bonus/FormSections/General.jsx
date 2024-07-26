/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { isEmpty } from 'lodash';
import { commonFields, getBonusInitialValues } from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import Spinners from '../../../components/Common/Spinner';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { generalFormSchema } from '../Validation/schema';
import Actions from './Actions';

const General = ({
	isLoading,
	activeTab,
	setAllFields,
	setLangContent,
	bonusDetails,
	submitButtonLoading,
	toggleTab,
	tabsToShow,
}) => {
	const handleSubmit = (values) => {
		setAllFields((prev) => ({
			...prev,
			...values,
			currencyDetails: prev.currencyDetails,
		}));
		window.scrollTo(0, 0);

		setLangContent((prev) => ({
			promoTitle: { ...prev.promoTitle, EN: values.promotionTitle },
			terms: { ...prev.terms, EN: values.termAndCondition },
			desc: { ...prev.desc, EN: values.description },
		}));
	};

	const handleBonusTypeChange = (e) => {
		const bnsType = e.target.value;
		setAllFields((prev) => ({
			...prev,
			bonusType: bnsType,
		}));
	};

	const { formFields, validation, setFormFields } = useForm({
		initialValues: getBonusInitialValues(),
		validationSchema: generalFormSchema(),
		staticFormFields: commonFields({}, handleBonusTypeChange),
		onSubmitEntry: handleSubmit,
	});
	useEffect(() => {
		if (!isEmpty(bonusDetails)) {
			validation.setValues(getBonusInitialValues(bonusDetails));
			setFormFields(commonFields(bonusDetails, handleBonusTypeChange));
		}
	}, [bonusDetails]);

	const handleNextClick = (nextTab) => {
		generalFormSchema()
			.validate(validation.values)
			.then(() => {
				handleSubmit(validation.values);
				toggleTab(nextTab);
			})
			.catch((err) => {
				console.log('Error in general form = ', err?.errors);
				validation.submitForm();
			});
	};

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
						customComponent={
							<Actions
								handleNextClick={handleNextClick}
								submitButtonLoading={submitButtonLoading}
								activeTab={activeTab}
								toggleTab={toggleTab}
								tabsToShow={tabsToShow}
							/>
						}
					/>
				)}
			</Col>
		</Row>
	);
};

General.defaultProps = {};

export default General;
