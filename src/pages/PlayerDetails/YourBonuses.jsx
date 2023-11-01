/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import { Action, Id, KeyValueCell, PromotionTitle } from './TableCol';
import { getUserBonus } from '../../store/actions';
import { formatDate } from '../../utils/dateFormatter';

const YourBonuses = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { userBonus, userBonusLoading } = useSelector(
		(state) => state.UserDetails
	);

	const formattedUserBonus = useMemo(() => {
		const formattedValues = [];
		if (userBonus) {
			userBonus?.rows?.map((bonus) =>
				formattedValues.push({
					...bonus,
					cancelledBy: bonus?.cancelledBy || '-',
					updatedAt: bonus?.updatedAt ? formatDate(bonus?.updatedAt) : '-',
					wageredAmount:
						bonus?.wageredAmount || (bonus?.amountToWager ? '0' : '-'),
					amountToWager: bonus?.amountToWager || '-',
					issuedAt: formatDate(bonus?.createdAt),
					issuedBy: bonus?.issuerRole
						? bonus?.issuerRole === 'user'
							? 'SYSTEM'
							: bonus?.issuerRole?.toUpperCase()
						: '-',
					isExpired:
						formatDate(new Date(String(bonus?.expireAt))) <
						formatDate(new Date())
							? 'Yes'
							: 'No',
					expiredAt: formatDate(bonus?.expireAt),
					promotionTitle:
						bonus?.other?.bonusTitle || bonus?.bonus?.promotionTitle?.EN,
				})
			);
		}
		return formattedValues;
	}, [userBonus]);

	useEffect(() => {
		dispatch(
			getUserBonus({
				limit: itemsPerPage,
				pageNo: currentPage,
				userId,
			})
		);
	}, [currentPage, itemsPerPage]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'userBonusId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'PROMOTION TITLE',
				accessor: 'promotionTitle',
				filterable: true,
				Cell: (cellProps) => <PromotionTitle {...cellProps} />,
			},
			{
				Header: 'BONUS TYPE',
				accessor: 'bonusType',
				filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'VALID TILL',
				accessor: 'expiredAt',
				filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'IS EXPIRED',
				accessor: 'isExpired',
				filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				Cell: (cellProps) => <keyValueCell {...cellProps} />,
			},
			{
				Header: 'ISSUED BY',
				accessor: 'issuedBy',
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'ISSUED AT',
				accessor: 'issuedAt',
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'AMOUNT TO WAGER',
				accessor: 'amountToWager',
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'WAGERED AMOUNT',
				accessor: 'wageredAmount',
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'CANCELLED BY',
				accessor: 'cancelledBy',
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'UPDATED AT',
				accessor: 'updatedAt',
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'ACTION',
				Cell: (cellProps) => <Action {...cellProps} />,
			},
		],
		[]
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return (
		<Container fluid className="bg-white">
			<Card className="p-2">
				<TableContainer
					isLoading={userBonusLoading}
					columns={columns}
					data={formattedUserBonus}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					// paginationDiv="col-sm-12 col-md-7"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={userBonus?.count}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={onChangeRowsPerPage}
				/>
			</Card>
		</Container>
	);
};

export default YourBonuses;
