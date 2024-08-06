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
	const [filters, setFilters] = useState({
		username: '',
		status: null,
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
	}, [selectedDispute]);

	const updateStatus = (payload) => {
		dispatch(updateDisputeStatus(payload));
	};

	const resetForm = () => {
		// eslint-disable-next-line no-use-before-define
		validation?.resetForm();
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
				resetForm,
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
