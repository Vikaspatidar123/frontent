import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	fetchDisputesStart,
	fetchDisputeDetails,
} from '../../../store/actions';

const useDisputeResolution = () => {
	const dispatch = useDispatch();
	const [selectedDispute, setSelectedDispute] = useState('');
	const { disputes, loading, detailsLoading, disputeDetails } = useSelector(
		(state) => state.Disputes
	);

	const handleDisputeDetails = () => {
		if (selectedDispute) {
			dispatch(fetchDisputeDetails({ threadId: selectedDispute }));
		}
	};

	useEffect(() => {
		dispatch(fetchDisputesStart());
	}, []);

	useEffect(() => {
		const disputeId = disputes?.rows?.[0]?.id || '';
		if (disputeId) setSelectedDispute(disputeId);
	}, [disputes]);

	useEffect(() => {
		handleDisputeDetails();
	}, [selectedDispute]);

	return {
		disputes,
		loading,
		selectedDispute,
		setSelectedDispute,
		detailsLoading,
		disputeDetails,
	};
};

export default useDisputeResolution;
