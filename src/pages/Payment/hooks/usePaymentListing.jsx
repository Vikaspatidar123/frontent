/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { getPaymentListing } from '../../../store/actions';
import { getRandomColor } from '../../../helpers/common';
import {
	PaymentId,
	Name,
	Aggregator,
	Category,
	BooleanCell,
} from '../PaymentListCol';
import ActionButtons from '../ActionButtons';
import { STORAGE_KEY } from '../../../components/Common/constants';
import { encryptCredentials } from '../../../network/storageUtils';
import { modules } from '../../../constants/permissions';

const usePaymentListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { isLoading, paymentListing } = useSelector((state) => state.Payment);

	const [page, setPage] = useState(1);

	// const handleStatus = (e) => {
	// 	e.preventDefault();
	// };

	const handleView = (e, paymentData) => {
		e.preventDefault();
		localStorage.setItem(
			`${STORAGE_KEY.ADMIN_VIEW}_${paymentData.id}`,
			encryptCredentials(JSON.stringify(paymentData))
		);
		navigate(`/payment/details/${paymentData.id}`);
	};

	const fetchData = () => {
		dispatch(
			getPaymentListing({
				perPage: itemsPerPage,
				page: 1,
				...filterValues,
			})
		);
	};

	useEffect(() => {
		if (location.pathname === '/payment') fetchData();
	}, [page, location, itemsPerPage]);

	const handleAddClick = (e) => {
		e.preventDefault();
		navigate('add');
	};

	// const handleEdit = (e, row) => {
	// 	e.preventDefault();
	// 	localStorage.setItem(
	// 		`${STORAGE_KEY.ADMIN_EDIT}_${row.id}`,
	// 		encryptCredentials(JSON.stringify(row))
	// 	);
	// 	setTimeout(() => {
	// 		navigate(`edit/${row.id}`);
	// 	}, 200);
	// };

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleAddClick,
			link: '#!',
			module: modules.paymentManagement,
			operation: 'C',
		},
	]);

	const columns = useMemo(
		() => [
			{
				Header: '#',
				disableFilters: true,
				filterable: true,
				notHidable: true,
				disableSortBy: true,
				accessor: (prop) => {
					const randomColor = getRandomColor();
					const { name } = prop;
					return (
						<div className="avatar-xs">
							<span
								className={`avatar-title rounded-circle ${randomColor} text-${randomColor}`}
							>
								{name?.charAt(0)?.toUpperCase()}
							</span>
						</div>
					);
				},
			},
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <PaymentId value={cell.value} />,
			},
			{
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => (
					<Name
						value={cell.value}
						paymentData={cell?.row?.original}
						handleView={handleView}
					/>
				),
			},
			{
				Header: 'Aggregator',
				accessor: 'aggregator',
				filterable: true,
				Cell: ({ cell }) => <Aggregator value={cell.value} />,
			},
			{
				Header: 'Category',
				accessor: 'category',
				filterable: true,
				Cell: ({ cell }) => <Category value={cell.value} />,
			},
			{
				Header: 'Deposit Allowed',
				accessor: 'depositAllowed',
				filterable: true,
				Cell: ({ cell }) => <BooleanCell value={cell.value} />,
			},
			{
				Header: 'Withdraw Allowed',
				accessor: 'withdrawAllowed',
				filterable: true,
				Cell: ({ cell }) => <BooleanCell value={cell.value} />,
			},
			// {
			// 	Header: 'Status',
			// 	accessor: 'isActive',
			// 	disableFilters: true,
			// 	disableSortBy: true,
			// 	Cell: ({ cell }) => <Status value={cell.value} />,
			// },
			{
				Header: 'Action',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						// handleEdit={handleEdit}
						row={cell.row}
						// handleStatus={handleStatus}
						handleView={handleView}
					/>
				),
			},
		],
		[]
	);

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	return {
		isLoading,
		totalPages: paymentListing?.totalPages,
		page,
		setPage,
		itemsPerPage,
		columns,
		paymentListing,
		buttonList,
		onChangeRowsPerPage,
	};
};

usePaymentListing.propTypes = {};

usePaymentListing.defaultProps = {
	cell: PropTypes.objectOf.isRequired,
};

export default usePaymentListing;
