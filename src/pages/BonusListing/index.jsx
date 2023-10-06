/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

import {
	BonusId,
	Title,
	BonusType,
	ValidTill,
	IsExpired,
	IsClaimed,
	Status,
	ActionButtons,
} from './BonusListCol';
import useBonsuListing from './hooks/useBonusListing';

const BonusDetail = ({ t }) => {
	// meta title
	document.title = 'Bonus | Skote - Vite React Admin & Dashboard Template';

	const {
		formattedBonusDetails,
		isLoading,
		page,
		setPage,
		totalBonusCount,
		itemsPerPage,
	} = useBonsuListing();

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'bonusId',
				filterable: true,
				Cell: (cellProps) => <BonusId {...cellProps} />,
			},
			{
				Header: 'TITLE',
				accessor: 'title',
				filterable: true,
				Cell: (cellProps) => <Title {...cellProps} />,
			},
			{
				Header: 'BONUS TYPE',
				accessor: 'bonusType',
				filterable: true,
				Cell: (cellProps) => <BonusType {...cellProps} />,
			},
			{
				Header: 'VALID TILL',
				accessor: 'valiTill',
				filterable: true,
				Cell: (cellProps) => <ValidTill {...cellProps} />,
			},
			{
				Header: 'IS EXPIRED',
				accessor: 'isExpired',
				filterable: true,
				Cell: (cellProps) => <IsExpired {...cellProps} />,
			},
			{
				Header: 'IS CLAIMED',
				accessor: 'isClaimed',
				filterable: true,
				Cell: (cellProps) => <IsClaimed {...cellProps} />,
			},
			{
				Header: 'STATUS',
				accessor: 'isActive',
				disableFilters: true,
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				Cell: () => <ActionButtons />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
				<Container fluid>
					<Breadcrumbs title={t('Bonus')} breadcrumbItem={t('Bonus')} />
					<TableContainer
						columns={columns}
						data={formattedBonusDetails}
						isGlobalFilter
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={totalBonusCount}
						isManualPagination
						onChangePagination={setPage}
						currentPage={page}
						isLoading={!isLoading}
					/>
				</Container>
			</div>
	);
};

BonusDetail.propTypes = {
	t: PropTypes.func,
};

BonusDetail.defaultProps = {
	t: (string) => string,
};

export default BonusDetail;
