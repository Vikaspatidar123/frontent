/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPaymentListing } from '../../../store/actions';
import { modules } from '../../../constants/permissions';
import ButtonList from '../../../components/Common/ButtonList';

const usePaymentListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const { paymentListing, isLoading } = useSelector((state) => state.Payment);
	const [page, setPage] = useState(1);

	const fetchData = () => {
		dispatch(
			getPaymentListing({
				perPage: 10,
				page: 1,
				...filterValues,
			})
		);
	};

	const fetchMoreData = () => {
		setPage((prev) => prev + 1);
		dispatch(
			getPaymentListing(
				{
					perPage: 10,
					page: page + 1,
					...filterValues,
				},
				'MoreData'
			)
		);
	};

	useEffect(() => {
		if (location.pathname === '/payment') fetchData();
	}, [location]);

	const buttonList = useMemo(() => [
		{
			label: 'Configure New',
			link: 'add',
			module: modules.paymentManagement,
			operation: 'C',
		},
	]);

	const actionList = <ButtonList buttonList={buttonList} />;

	return {
		isLoading,
		page,
		paymentListing,
		actionList,
		navigate,
		fetchMoreData,
	};
};

usePaymentListing.propTypes = {};

usePaymentListing.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default usePaymentListing;
