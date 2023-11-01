/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Card, Container } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import { KeyValueCell } from './TableCol';
import { keyArray } from './constants';
import { currencyCodeList } from '../../utils/currencyCodeList';
import { formatDate } from '../../utils/dateFormatter';

const PlayerWallet = ({ userDetails }) => {
	const formattedUserDetails = useMemo(() => {
		const arrayToReturn = [];
		if (userDetails) {
			const currencySymbol =
				currencyCodeList[userDetails?.userWallet?.currencyCode];
			const copyArray = {
				...userDetails,
				createdAt: formatDate(userDetails?.userWallet?.createdAt),
				averageBonus: `${currencySymbol} ${
					userDetails.userWallet?.averageBonus || 0
				}`,
				averageWithdrawal: `${currencySymbol} ${
					userDetails.userWallet?.averageWithdrawal || 0
				}`,
				averageDeposit: `${currencySymbol} ${
					userDetails.userWallet?.averageDeposit || 0
				}`,
				depositToBonus: `${userDetails.userWallet?.depositToBonus || 0}%`,
				totalBonus: `${currencySymbol} ${
					userDetails.userWallet?.totalBonus || 0
				}`,
				totalWithdrawals: `${currencySymbol} ${
					userDetails.userWallet?.totalWithdrawals || 0
				}`,
				addMoney: `${currencySymbol} ${userDetails.userWallet?.addMoney || 0}`,
				userDeposits: `${currencySymbol} ${
					userDetails.userWallet?.userDeposits || 0
				}`,
				netLoss: `${currencySymbol} ${userDetails.userWallet?.netLoss}`,
				pendingWithdrawals: `${currencySymbol} ${userDetails.userWallet?.pendingWithdrawals}`,
				pendingDeposits: `${currencySymbol} ${userDetails.userWallet?.pendingDeposits}`,
				bonus: `${currencySymbol} ${userDetails?.userWallet?.nonCashAmount}`,
				cash: `${currencySymbol} ${userDetails?.userWallet?.amount}`,
				totalAmount: `${currencySymbol} ${
					Number(userDetails?.userWallet?.amount) +
					Number(userDetails?.userWallet?.nonCashAmount)
				}`,
			};
			keyArray?.map((key) =>
				arrayToReturn.push({ key: key.label, value: copyArray[key.accessor] })
			);
		}

		return arrayToReturn;
	}, [userDetails]);

	const columns = useMemo(
		() => [
			{
				Header: 'Key',
				accessor: 'key',
				// filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'Value',
				accessor: 'value',
				// filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
		],
		[]
	);

	return (
		<Container fluid className="bg-white">
			<Card className="p-2">
				<h4 className="text-center">Player Wallet</h4>
				<TableContainer
					columns={columns}
					data={formattedUserDetails}
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					customPageSize={20}
					hideHeader
					cellPadding="0.25rem"
				/>
			</Card>
		</Container>
	);
};

export default PlayerWallet;
