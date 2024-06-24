/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import { Comment, Id, KeyValueCell, KeyValueCellNA } from './TableCol';
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

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Referred To',
				accessor: 'username',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCellNA value={cell.value} />,
			},
			{
				Header: 'Mode',
				accessor: 'mode',
				filterable: true,
				Cell: ({ cell }) => <Comment value={cell.value} />,
			},
			{
				Header: 'Date',
				accessor: 'createAt',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			// {
			// 	Header: 'NOTED AT',
			// 	accessor: 'createdAt',
			// 	Cell: ({ cell }) => <KeyValueCell value={(cell.value)} />,
			// },
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
						data={referrals || []}
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
					/>
				</CardBody>
			</Card>
		</Container>
	);
};

export default Referrals;
