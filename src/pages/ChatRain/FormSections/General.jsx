/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import {
	generalStaticFormFields,
	generalStepInitialValues,
} from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { generalFormSchema } from '../Validation/schema';
import { useDispatch, useSelector } from 'react-redux';
import { createChatrain, updateChatrain } from '../../../store/actions';
import { useNavigate } from 'react-router-dom';
import { capitalizeString } from '../../../utils/helpers';

const General = ({
	isLoading,
	nextPressed,
	setActiveTab,
	setNextPressed,
	setAllFields,
	chatRainDetails,
	isEdit
}) => {
	const dispatch = useDispatch();
	let navigate = useNavigate();
	let inital = true
	const { updateChatrainLoading } = useSelector((state) => state.Chatrain)
	const { channelDetails } = []

	const handleSubmit = (values) => {
		if (isEdit) {
			dispatch(updateChatrain({
				data: {
					chatGroupId: values?.chatGroupId,
					name: values?.name,
					prizeMoney: Number(values?.prizeMoney),
					currency: values?.currency,
					chatRainId: chatRainDetails?.chatRainId
				}
			}))
		} else {
			dispatch(createChatrain({
				data: {
					chatGroupId: values?.chatGroupId,
					name: values?.name,
					prizeMoney: Number(values?.prizeMoney),
					currency: values?.currency,
				}
			}))
		}
	};

	const { formFields, setFormFields, validation } = useForm({
		initialValues: generalStepInitialValues({ chatRainDetails }),
		validationSchema: generalFormSchema(),
		onSubmitEntry: handleSubmit,
		staticFormFields: generalStaticFormFields,
	});


	useEffect(() => {

		setFormFields([
			...formFields?.filter((item) => item?.name !== 'chatGroupId'),
			{
				name: 'chatGroupId',
				fieldType: 'select',
				type: '',
				label: 'Select Channel',
				placeholder: 'Select Channel',
				optionList: channelDetails?.rows?.map((item) => ({
					optionLabel: capitalizeString(item?.name),
					value: item?.chatGroupId,
					id: item?.chatGroupId,
				})),
			}
		])
	}, [channelDetails?.count])

	return (
		<Row>
			<Col lg="12">
				<FormPage
					validation={validation}
					responsiveFormFields={formFields}
					customColClasses=""
					colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
					isSubmit={true}
					isSubmitLoading={updateChatrainLoading}
				/>
			</Col>
		</Row>
	);
};

General.defaultProps = {};

export default General;
