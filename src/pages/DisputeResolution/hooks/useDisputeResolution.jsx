import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchDisputesStart,
	fetchDisputeDetails,
	sendMessage,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getInitialValues, validationSchema } from '../formDetails';

const useDisputeResolution = () => {
	const dispatch = useDispatch();
	const [selectedDispute, setSelectedDispute] = useState('');
	const [showReplyForm, setShowReplyForm] = useState('');

	const {
		disputes,
		loading,
		detailsLoading,
		disputeDetails,
		sendMessageLoading,
	} = useSelector((state) => state.Disputes);

	const handleDisputeDetails = () => {
		if (selectedDispute) {
			dispatch(fetchDisputeDetails({ threadId: selectedDispute }));
		}
	};

	useEffect(() => {
		dispatch(fetchDisputesStart());
	}, []);

	useEffect(() => {
		const disputeId = disputes?.threadTickets?.[0]?.id || '';
		if (disputeId) setSelectedDispute(disputeId);
	}, [disputes]);

	useEffect(() => {
		handleDisputeDetails();
		setShowReplyForm('');
	}, [selectedDispute]);

	const handleSendMessage = (values) => {
		dispatch(
			sendMessage({
				data: {
					...values,
					files: null,
					file: values.files?.[0],
					threadId: selectedDispute,
					userId: disputeDetails?.userId,
				},
				setShowReplyForm,
			})
		);
	};

	const { validation } = useForm({
		initialValues: getInitialValues(),
		validationSchema,
		onSubmitEntry: handleSendMessage,
	});

	return {
		disputes,
		loading,
		selectedDispute,
		setSelectedDispute,
		detailsLoading,
		disputeDetails,
		showReplyForm,
		setShowReplyForm,
		validation,
		sendMessageLoading,
	};
};

export default useDisputeResolution;
