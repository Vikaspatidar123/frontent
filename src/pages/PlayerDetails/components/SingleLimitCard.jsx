/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Card } from 'reactstrap';
import { CustomInputField } from '../../../helpers/customForms';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLimitInitialValues,
	limitsSchema,
	setDisableUserlimitsSchema,
} from '../formDetails';

const SingleLimitCard = ({ limit }) => {
	const labelArray = limit?.label?.split(' ');
	const label = `${labelArray?.[0] === 'Weekly' ? 'Daily ' : 'Weekly '}${
		labelArray?.[1]
	} ${labelArray?.[2]}`;
	const onSubmitLimit = (values) => {
		console.log('Values', values);
	};

	const { validation } = useForm({
		validationSchema:
			limit?.label === 'Take A Break' || limit?.label === 'Session Limit'
				? setDisableUserlimitsSchema
				: limitsSchema({
						minimum: limit?.minimum,
						currLabel: limit?.label,
						label,
				  }),
		initialValues: getLimitInitialValues(),
		onSubmitEntry: onSubmitLimit,
	});

	return (
		<Card className="p-2">
			<div>
				<CustomInputField
					label={limit.label}
					name="limit"
					type="number"
					onChange={validation.handleChange}
					onBlur={validation.handleBlur}
					placeholder="Enter Limit"
					validate={{ required: { value: true } }}
					value={validation.values.limit}
					invalid={!!(validation.touched.limit && validation.errors.limit)}
					isError
					errorMsg={validation.touched.limit && validation.errors.limit}
				/>
				<Button>Set</Button>
			</div>
		</Card>
	);
};

export default SingleLimitCard;
