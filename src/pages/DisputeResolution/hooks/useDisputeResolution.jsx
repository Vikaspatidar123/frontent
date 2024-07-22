import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchDisputesStart,
	fetchDisputeDetails,
	sendMessage,
	updateDisputeStatus,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getInitialValues, validationSchema } from '../formDetails';
import { debounceTime } from '../../../constants/config';

let debounce;
const useDisputeResolution = () => {
	const dispatch = useDispatch();
	const [page, setPage] = useState(1);
	const [selectedDispute, setSelectedDispute] = useState('');
	const [showReplyForm, setShowReplyForm] = useState('');
	const [filters, setFilters] = useState({
		username: '',
		status: 'active',
	});

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
		debounce = setTimeout(() => {
			dispatch(
				fetchDisputesStart({
					page,
					perPage: 10,
					...filters,
				})
			);
		}, debounceTime);
		return () => clearInterval(debounce);
	}, [page, filters]);

	useEffect(() => {
		const disputeId = disputes?.threadTickets?.[0]?.id || '';
		if (!selectedDispute && disputeId) setSelectedDispute(disputeId);
	}, [disputes]);

	useEffect(() => {
		handleDisputeDetails();
		setShowReplyForm('');
	}, [selectedDispute]);

	const updateStatus = (payload) => {
		dispatch(updateDisputeStatus(payload));
	};

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
		updateStatus,
		setPage,
		page,
		filters,
		setFilters,
	};
};

export default useDisputeResolution;
