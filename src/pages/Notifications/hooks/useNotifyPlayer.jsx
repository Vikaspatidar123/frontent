/* eslint-disable no-param-reassign */
import React, { useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useForm from '../../../components/Common/Hooks/useFormModal';
import PlayersList from '../../Players';
import {
	getInitialNotifyData,
	validatedNotify,
	leftStaticFormFields,
	rightStaticFormFields,
} from '../formDetails';
import { showToastr } from '../../../utils/helpers';
import { notifyPlayersStart } from '../../../store/actions';

const useNotifyPlayer = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { notifyPlayerLoading } = useSelector((state) => state.Notification);
	const [userIds, setUserIds] = useState({});

	const toggleUserId = (userId) => {
		if (userIds[userId]) {
			setUserIds((prev) => {
				delete prev[userId];
				return { ...prev };
			});
		} else {
			setUserIds((prev) => ({
				...prev,
				[userId]: true,
			}));
		}
	};

	const notifyPlayersSubmit = (data) => {
		if (isEmpty(userIds)) {
			showToastr({
				message: 'Please select at least 1 player.',
				type: 'error',
			});
			return;
		}
		dispatch(
			notifyPlayersStart({
				payload: { ...data, userId: Object.keys(userIds || {}) },
				navigate,
			})
		);
	};

	const { validation, leftFormFields, rightFormFields } = useForm({
		header: 'Create',
		initialValues: getInitialNotifyData(),
		validationSchema: validatedNotify(),
		onSubmitEntry: notifyPlayersSubmit,
		leftStaticFormFields,
		rightStaticFormFields,
	});

	const customComponent = useMemo(
		() => <PlayersList userIds={userIds} toggleUserId={toggleUserId} />,
		[userIds]
	);

	return {
		validation,
		leftFormFields,
		rightFormFields,
		customComponent,
		notifyPlayerLoading,
	};
};

export default useNotifyPlayer;
