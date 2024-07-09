/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import { Id, IsActive, KeyValueCellNA, KycStatus } from './TableCol';
import CrudSection from '../../components/Common/CrudSection';
import { userReferrals } from '../../store/actions';

const Referrals = ({ userId }) => {
	const dispatch = useDispatch();
	const { referrals, referralsLoading } = useSelector(
		(state) => state.UserDetails
	);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(
			userReferrals({
				userId,
				perPage: itemsPerPage,
				page: currentPage,
			})
		);
	}, []);

	const formattedReferrals = useMemo(
		() =>
			referrals?.referredUser?.map((referral) => ({
				...referral,
			})) || [],
		[referrals]
	);

	const columns = useMemo(
		() => [
			{
				Header: 'Player Id',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Username',
				accessor: 'username',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCellNA value={cell.value} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCellNA value={cell.value} />,
			},

			{
				Header: 'Status',
				accessor: 'isActive',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => <IsActive value={cell.value} />,
			},
			{
				Header: 'Kyc Status',
				accessor: 'kycStatus',
				Cell: ({ cell }) => <KycStatus value={cell.value} />,
			},
		],
		[]
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return (
		<Container fluid>
			<Card className="p-2">
				<CrudSection buttonList={[]} title="Referrals" />
				<CardBody>
					<TableContainer
						isLoading={referralsLoading}
						columns={columns || []}
						data={formattedReferrals}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={1}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						changeRowsPerPageCallback={onChangeRowsPerPage}
						isShowColSettings={false}
					/>
				</CardBody>
			</Card>
		</Container>
	);
};

export default Referrals;
