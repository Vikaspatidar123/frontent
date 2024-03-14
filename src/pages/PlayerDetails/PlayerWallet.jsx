/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Card, Container } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import { KeyValueCell } from './TableCol';

const PlayerWallet = ({ userDetails }) => {
	const walletData = useMemo(() => {
		if (userDetails?.wallets?.length > 0) {
			return userDetails?.wallets?.map((wallet) => ({
				...wallet,
				currencyCode: wallet?.currency?.code,
			}));
		}
		return [];
	}, [userDetails]);

	const columns = useMemo(
		() => [
			{
				Header: 'Currency Id',
				accessor: 'currencyId',
				// filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				// filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'Currency Code',
				accessor: 'currencyCode',
				// filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<Card className="p-2">
				<h4 className="text-center border-bottom p-3">Player Wallet</h4>
				<TableContainer
					columns={columns}
					data={walletData}
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					customPageSize={50}
					tableClass="table-bordered align-middle nowrap mt-2"
				/>
			</Card>
		</Container>
	);
};

export default PlayerWallet;
