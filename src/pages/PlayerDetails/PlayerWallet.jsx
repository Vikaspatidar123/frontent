/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Card, Container } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import { KeyValueCell } from './TableCol';

const PlayerWallet = ({ userDetails, heading = 'Player Wallet' }) => {
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
			// {
			// 	Header: 'Currency Id',
			// 	accessor: 'currencyId',
			// 	// filterable: true,
			// 	Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			// },
			{
				Header: 'Currency',
				accessor: 'currencyCode',
				// filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'Amount',
				accessor: 'amount',
				// filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
		],
		[]
	);

	return (
		<Container fluid>
			<Card className="p-2">
				<h4 className="border-bottom p-2">{heading}</h4>
				<TableContainer
					columns={columns}
					data={walletData}
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					customPageSize={50}
					tableClass="table-bordered align-middle nowrap mt-2"
					isShowColSettings={false}
				/>
			</Card>
		</Container>
	);
};

export default PlayerWallet;
