/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
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
import { bonusTypes } from '../contants';
import { bonusSchema } from '../Validation/schema';

const General = ({ isLoading }) => {
	// const handleEdit = () => {
	// 	setIsEditable((prev) => !prev);
	// };

	const handleSubmit = () => {};

	const { formFields, setFormFields, validation } = useForm({
		initialValues: getCreateBonusInitialValues(),
		validationSchema: bonusSchema('en', { bonusDetail: null })[1],
		// staticFormFields: generalStaticFormFields(),
		onSubmitEntry: handleSubmit,
	});

	useEffect(() => {
		validation.validateForm(validation.values);
	}, []);

	const handleBonusTypeChange = (e, type) => {
		e?.preventDefault();
		const bonusType = e?.target?.value || type;
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
						submitLabel="Next"
						customColClasses=""
						isSubmitLoading={isLoading}
						colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
						// customComponent={
						//   <
						// }
					/>
				)}
			</Col>
		</Row>
	);
};

General.defaultProps = {};

export default General;
