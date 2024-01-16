import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	getDuplicateUsers,
	getUserDetails,
	resetUserDetails,
} from '../../../store/actions';

const useUserDetails = ({ userId }) => {
	const dispatch = useDispatch();

	const { userWalletData, userDetails, userDetailsLoading, duplicateUsers } =
		useSelector((state) => state.UserDetails);

	useEffect(() => {
		dispatch(getUserDetails({ userId }));
		dispatch(getDuplicateUsers({ userId, limit: 10, pageNo: 1 }));
	}, []);

	// resetting player details redux state
	useEffect(
		() => () => {
			dispatch(resetUserDetails());
		},
		[]
	);

	return {
		userDetails,
		userDetailsLoading,
		duplicateUsers,
		userWalletData,
	};
};

export default useUserDetails;
