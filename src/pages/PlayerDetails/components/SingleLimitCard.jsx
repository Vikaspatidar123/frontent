/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
	Button,
	Card,
	Form,
	InputGroup,
	InputGroupText,
	Modal,
	ModalBody,
	ModalHeader,
} from 'reactstrap';
import { useDispatch } from 'react-redux';
import { CustomInputField } from '../../../helpers/customForms';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLimitInitialValues,
	limitsSchema,
	setDisableUserlimitsSchema,
} from '../formDetails';
import { resetUserLimit } from '../../../store/actions';

const SingleLimitCard = ({ limit, currencyCode, userId }) => {
	const dispatch = useDispatch();
	const labelArray = limit?.label?.split(' ');
	const label = `${labelArray?.[0] === 'Weekly' ? 'Daily ' : 'Weekly '}${
		labelArray?.[1]
	} ${labelArray?.[2]}`;
	const [isResetLimit, setIsResetLimit] = useState({ open: false, data: '' });

	const getData = ({ limitString, reset, labelString }) => {
		const timePeriod = labelString?.split(' ')?.[0]?.toLowerCase();
		const type = labelString?.split(' ')?.[1]?.toLowerCase();
		let data = {};
		if (type === 'wager') {
			data = {
				userId,
				dailyLimit: limitString,
				timePeriod,
				reset,
				type,
			};
		} else if (type === 'deposit') {
			data = {
				userId,
				depositLimit: limitString,
				timePeriod,
				reset,
				type,
			};
		} else {
			data = {
				userId,
				lossLimit: limitString,
				timePeriod,
				reset,
				type,
			};
		}
		return data;
	};

	const updateLimit = ({ formValues, labelString }) => {
		const data = getData({
			limitString: formValues?.limit,
			reset: false,
			labelString,
		});
		dispatch(
			resetUserLimit({
				...data,
			})
		);
	};

	const onSubmitLimit = (values) => {
		updateLimit({ formValues: values, labelString: limit.label });
	};

	const onResetLimit = () => {
		setIsResetLimit({ open: true, data: limit });
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

	useEffect(() => {
		if (limit.value) {
			validation.setValues({ limit: limit.value });
		}
	}, [limit]);

	const toggle = () =>
		setIsResetLimit((prev) => ({ open: !prev.open, data: prev.data }));

	const resetLimit = (labelString) => {
		const data = getData({
			limitString: validation.values?.limit,
			reset: true,
			labelString,
		});
		dispatch(
			resetUserLimit({
				...data,
			})
		);
	};

	const handleYes = () => {
		resetLimit(limit.label);
	};

	return (
		<Card className="p-3 border">
			<Form
				onSubmit={(e) => {
					e.preventDefault();
					validation.handleSubmit();
					return false;
				}}
			>
				<h5 className="text-center">{limit.label}</h5>
				<InputGroup>
					<InputGroupText>{currencyCode}</InputGroupText>
					<CustomInputField
						name="limit"
						placeholder="Enter Limit"
						value={validation?.values?.limit}
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						invalid={!!(validation.touched?.limit && validation.errors?.limit)}
						isError
						errorMsg={validation.touched?.limit && validation.errors?.limit}
					/>
				</InputGroup>
				<div className="mt-3 text-center">
					<Button type="submit" className="btn btn-primary" color="primary">
						Set
					</Button>
					{limit.value && (
						<Button onClick={onResetLimit} className="mx-2">
							Reset Limit
						</Button>
					)}
				</div>
			</Form>
			<Modal isOpen={isResetLimit.open} toggle={toggle}>
				<ModalHeader toggle={toggle} tag="h4">
					Are you sure you want to reset {limit?.label}?
				</ModalHeader>
				<ModalBody>
					<Button onClick={handleYes}>Yes</Button>
					<Button className="mx-2" onClick={toggle}>
						No
					</Button>
				</ModalBody>
			</Modal>
		</Card>
	);
};

export default SingleLimitCard;
