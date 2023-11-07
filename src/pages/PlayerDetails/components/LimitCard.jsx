/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, Card, Form, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { CustomInputField } from '../../../helpers/customForms';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	getLimitInitialValues,
	limitsSchema,
	setDisableUserlimitsSchema,
} from '../formDetails';
import { disableUser } from '../../../store/actions';

const LimitCard = ({ limit, userId }) => {
	const dispatch = useDispatch();
	const labelArray = limit?.label?.split(' ');
	const label = `${labelArray?.[0] === 'Weekly' ? 'Daily ' : 'Weekly '}${
		labelArray?.[1]
	} ${labelArray?.[2]}`;
	const [isResetLimit, setIsResetLimit] = useState({ open: false, data: '' });

	const setDisableUser = ({ formValues, type }) => {
		let data = {};
		if (type === 'TAKE_A_BREAK') {
			data = {
				type: 'TAKE_A_BREAK',
				userId,
				reset: false,
				days: Number(formValues?.limit),
				portal: 'all',
			};
		} else {
			data = {
				userId,
				timeLimit: Number(formValues?.limit),
				reset: false,
			};
		}
		dispatch(disableUser(data));
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
		onSubmitEntry: (values) =>
			setDisableUser({
				formValues: values,
				reset: false,
				type: limit?.label === 'Take A Break' ? 'TAKE_A_BREAK' : null,
			}),
	});

	const resetDisableUser = (type) => {
		let data = {};
		if (type === 'Self Exclusion') {
			data = {
				userId,
				type: 'SELF_EXCLUSION',
				portal: 'all',
				days: 0,
				reset: true,
			};
		} else if (type === 'Take A Break') {
			data = {
				userId,
				type: 'TAKE_A_BREAK',
				portal: 'all',
				days: 0,
				reset: true,
			};
		} else {
			data = {
				userId,
				timeLimit: 1,
				reset: true,
			};
		}
		dispatch(disableUser(data));
	};

	useEffect(() => {
		if (limit.value) {
			validation.setValues({ limit: limit.value });
		}
	}, [limit]);

	const toggle = () =>
		setIsResetLimit((prev) => ({ open: !prev.open, data: prev.data }));

	const handleYes = () => {
		resetDisableUser(limit.label);
	};

	return (
		<Card className="p-3 border">
			<div>
				<Form
					onSubmit={(e) => {
						e.preventDefault();
						validation.handleSubmit();
						return false;
					}}
				>
					<h5 className="text-center">{limit.label}</h5>
					<CustomInputField
						label="Time Period"
						name="limit"
						placeholder={limit.placeholder}
						value={validation?.values?.limit}
						onChange={validation.handleChange}
						onBlur={validation.handleBlur}
						invalid={!!(validation.touched?.limit && validation.errors?.limit)}
						isError
						errorMsg={validation.touched?.limit && validation.errors?.limit}
					/>
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
			</div>
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

export default LimitCard;
