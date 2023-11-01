/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import TableContainer from '../../../components/Common/TableContainer';
import { getDuplicateUsers } from '../../../store/actions';
import { KeyValueCellNA } from '../TableCol';
import { formatDateYMD } from '../../../helpers/dateFormatter';

const Duplicates = ({ show, toggle, header }) => {
	const dispatch = useDispatch();
	const { playerId } = useParams();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { getDuplicateUsersLoading, duplicateUsers, userDetails } = useSelector(
		(state) => state.UserDetails
	);

	const fetchData = () => {
		dispatch(
			getDuplicateUsers({
				userId: playerId,
				limit: itemsPerPage,
				pageNo: currentPage,
			})
		);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'USER ID',
				accessor: 'userId',
				subLabel: userDetails?.userId,
				// filterable: true,
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'FIRST NAME',
				accessor: 'firstName',
				subLabel: userDetails?.firstName,
				// filterable: true,
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'LAST NAME',
				accessor: 'lastName',
				subLabel: userDetails?.lastName,
				// filterable: true,
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'EMAIL',
				accessor: 'email',
				subLabel: userDetails?.email,
				// filterable: true,
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'USER NAME',
				accessor: 'username',
				subLabel: userDetails?.username,
				// filterable: true,
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'PHONE',
				accessor: 'phone',
				// filterable: true,
				subLabel: userDetails?.phone || 'NA',
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'SIGN IN IP',
				accessor: 'signInIp',
				// filterable: true,
				subLabel: userDetails?.signInIp || 'NA',
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'DOB',
				accessor: 'dateOfBirth',
				subLabel: formatDateYMD(userDetails?.dateOfBirth),
				// filterable: true,
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'ADDRESS',
				accessor: 'address',
				// filterable: true,
				subLabel: userDetails?.address,
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
		],
		[]
	);

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	const formattedDuplicates = useMemo(() => {
		const formattedValues = [];
		if (duplicateUsers) {
			duplicateUsers?.rows?.map((user) =>
				formattedValues.push({
					...user,
					dateOfBirth: formatDateYMD(user.dateOfBirth),
				})
			);
		}
		return formattedValues;
	}, [duplicateUsers]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return (
		<Modal isOpen={show} toggle={toggle} size="lg">
			<ModalHeader toggle={toggle} tag="h4">
				{header}
			</ModalHeader>
			<ModalBody>
				<TableContainer
					isLoading={getDuplicateUsersLoading}
					columns={columns}
					data={formattedDuplicates}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={duplicateUsers?.count}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={onChangeRowsPerPage}
				/>
			</ModalBody>
		</Modal>
	);
};

export default Duplicates;
