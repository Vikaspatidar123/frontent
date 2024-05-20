/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { commonFields, getCreateBonusInitialValues } from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import Spinners from '../../../components/Common/Spinner';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { generalFormSchema } from '../Validation/schema';

const General = ({
	isLoading,
	nextPressed,
	setActiveTab,
	setNextPressed,
	setAllFields,
	setLangContent,
	bonusDetails,
}) => {
	const handleSubmit = (values) => {
		setAllFields((prev) => ({
			...prev,
			...values,
		}));
		window.scrollTo(0, 0);

		setLangContent((prev) => ({
			promoTitle: { ...prev.promoTitle, EN: values.promotionTitle },
			terms: { ...prev.terms, EN: values.termAndCondition },
			desc: { ...prev.desc, EN: values.description },
		}));
		setActiveTab(nextPressed.nextTab);
	};

	const handleBonusTypeChange = (e) => {
		setAllFields((prev) => ({
			...prev,
			bonusType: e.target.value,
		}));
	};

	const { formFields, validation } = useForm({
		initialValues: getCreateBonusInitialValues(bonusDetails),
		validationSchema: generalFormSchema(),
		staticFormFields: commonFields(bonusDetails, handleBonusTypeChange),
		onSubmitEntry: handleSubmit,
	});

	useEffect(() => {
		if (nextPressed.currentTab === 'general') {
			validation.submitForm();
			setNextPressed({});
		}
	}, [nextPressed]);

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
