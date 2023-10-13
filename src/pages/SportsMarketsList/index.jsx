/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Input, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import { Id, Name } from './SportsMarketsListCol';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsMarketsListing from './hooks/useSportsMarketsListing';
import { projectName } from '../../constants/config';

const SportsMarketsList = ({ t }) => {
	document.title = projectName;

	const {
		searchText,
		setSearchText,
		currentPage,
		setCurrentPage,
		totalSportsMarketsCount,
		isSportsMarketsLoading,
		formattedSportsMarkets,
		itemsPerPage,
	} = useSportsMarketsListing();

	const columns = useMemo(
		() => [
			{
				Header: 'Id',
				accessor: 'marketId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: (cellProps) => <Name {...cellProps} />,
			},
		],
		[]
	);

	return (
		<div className="page-content">
			<Container fluid>
				{/* Render Breadcrumb */}
				<Breadcrumb title={t('Sports Book')} breadcrumbItem={t('Markets')} />
				<Row>
					<Col xs="12" sm="3">
						<Input
							className="form-control"
							placeholder="Search by Name"
							onChange={({ target }) =>
								setSearchText(target.value.replace(/[^\w\s]/gi, ''))
							}
							value={searchText}
						/>
					</Col>
				</Row>
				<TableContainer
					isLoading={isSportsMarketsLoading}
					columns={columns}
					data={formattedSportsMarkets}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					// paginationDiv="col-sm-12 col-md-7"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={totalSportsMarketsCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
				/>
			</Container>
		</div>
	);
};

SportsMarketsList.propTypes = {
	t: PropTypes.func,
};

SportsMarketsList.defaultProps = {
	t: (string) => string,
};

export default SportsMarketsList;
