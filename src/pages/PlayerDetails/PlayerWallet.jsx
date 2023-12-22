/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Card, Container } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import { KeyValueCell } from './TableCol';

const PlayerWallet = ({ userDetails }) => {
	const walletData = useMemo(() => {
		if (userDetails?.wallets?.length) {
			return userDetails.wallets.map((wallet) => ({
				id: wallet.id,
				amount: `${wallet.amount} ${wallet.currency.code}`,
				currencyName: wallet.currency.name,
				currencyCode: wallet.currency.code,
			}));
		}
		return [];
	}, [userDetails]);

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'id',
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
				Header: 'Currency',
				accessor: 'currencyName',
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
					data={walletData || []}
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					customPageSize={20}
					tableClass="table-striped table-hover "
				/>
			</Card>
		</Container>
	);
};

export default PlayerWallet;
