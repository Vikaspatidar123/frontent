import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../../../store/actions';

const useUserDetails = ({ userId }) => {
	const dispatch = useDispatch();

	const { userDetails, userDetailsLoading } = useSelector(
		(state) => state.UserDetails
	);

	useEffect(() => {
		dispatch(getUserDetails({ userId }));
	}, []);

	return {
		userDetails,
		userDetailsLoading,
	};
};

export default useUserDetails;
