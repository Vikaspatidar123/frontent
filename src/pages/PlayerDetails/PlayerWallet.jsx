/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Card, Container } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import { KeyValueCell } from './TableCol';

const PlayerWallet = ({ userDetails, userWalletData: getUserWalletData }) => {
	const walletData = useMemo(() => {
		const defaultCurrencyObject = userDetails?.wallets?.find(
			(item) => item?.currency?.default === true
		);

		const wallet = {
			currencyId: defaultCurrencyObject?.currencyId,
			currency: defaultCurrencyObject?.currency?.name,
			currencyCode: defaultCurrencyObject?.currency?.code,
			amount: defaultCurrencyObject?.amount,
			exchangeRate: defaultCurrencyObject?.currency?.exchangeRate,
			...getUserWalletData,
		};

		if (Object.keys(wallet).length > 0) {
			return Object.keys(wallet).map((key) => ({
				id: key,
				key: wallet[key],
			}));
		}
		return [];
	}, [getUserWalletData, userDetails]);

	const columns = useMemo(
		() => [
			{
				Header: 'id',
				accessor: 'id',
				// filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'Key',
				accessor: 'key',
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
					customPageSize={20}
					hideHeader
					tableClass="table-striped table-hover "
				/>
			</Card>
		</Container>
	);
};

export default PlayerWallet;
