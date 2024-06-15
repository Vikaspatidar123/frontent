/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { isEmpty } from 'lodash';
import { generaFromFields, getInitialValues } from '../formDetails';
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
	paymentDetails,
	submitButtonLoading,
	toggleTab,
	tabsToShow,
}) => {
	const handleSubmit = (values) => {
		setAllFields((prev) => ({
			...prev,
			...values,
		}));
		window.scrollTo(0, 0);

		setLangContent((prev) => ({
			description: { ...prev.description, EN: values.description },
			displayName: { ...prev.displayName, EN: values.displayName },
		}));
	};

	const { formFields, validation, setFormFields } = useForm({
		initialValues: getInitialValues(),
		validationSchema: generalFormSchema(),
		staticFormFields: generaFromFields,
		onSubmitEntry: handleSubmit,
	});

	useEffect(() => {
		if (!isEmpty(paymentDetails)) {
			validation.setValues(getInitialValues(paymentDetails));
			setFormFields(generaFromFields);
		}
	}, [paymentDetails]);

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
