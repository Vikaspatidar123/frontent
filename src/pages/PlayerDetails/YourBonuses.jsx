/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import { Id, KeyValueCell, PromotionTitle } from './TableCol';
import { cancelUserBonus, getUserBonus } from '../../store/actions';
import { formatDate } from '../../utils/dateFormatter';
import useBonusFilter from './hooks/useBonusFilter';
import Filters from '../../components/Common/Filters';
import BonusActionButtons from './BonusActionButtons';
import BonusDetails from './modals/BonusDetails';

const YourBonuses = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const [bonusDetailsModal, setBonusDetailsModal] = useState({
		open: false,
		data: '',
	});
	const { userBonus, userBonusLoading } = useSelector(
		(state) => state.UserDetails
	);

	const onViewClick = ({ bonusDetails }) => {
		setBonusDetailsModal({ open: true, data: bonusDetails });
	};

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

	const onCancelClick = ({ userBonusId }) => {
		dispatch(
			cancelUserBonus({
				userBonusId,
				userId,
			})
		);
	};

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
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
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
				Cell: (cellProps) => (
					<BonusActionButtons
						onViewClick={onViewClick}
						onCancelClick={onCancelClick}
						{...cellProps}
					/>
				),
			},
		],
		[]
	);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useBonusFilter();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return (
		<Container fluid className="bg-white">
			<Card className="p-2">
				<CardBody>
					<Filters
						validation={filterValidation}
						filterFields={filterFields}
						actionButtons={actionButtons}
						isAdvanceOpen={isAdvanceOpen}
						toggleAdvance={toggleAdvance}
						isFilterChanged={isFilterChanged}
					/>
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
				</CardBody>
				<BonusDetails
					show={bonusDetailsModal.open}
					toggle={() => setBonusDetailsModal({ open: false, data: '' })}
					bonusId={bonusDetailsModal.data?.bonusId}
					bonusTitle={bonusDetailsModal.data?.promotionTitle}
					userBonusId={bonusDetailsModal.data?.userBonusId}
				/>
			</Card>
		</Container>
	);
};

export default YourBonuses;
