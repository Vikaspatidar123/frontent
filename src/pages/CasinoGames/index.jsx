/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { projectName } from '../../constants/config';
import {
	CasinoGameId,
	Name,
	Provider,
	RTP,
	SubCategory,
	ThumbnailUrl,
	DeviceType,
	Status,
} from './CasinoGamesListCol';
import ActionButtons from './ActionButtons';
import useCasinoGamesListings from './hooks/useCasinoGamesListing';
import CrudSection from '../../components/Common/CrudSection';

const CasinoGames = ({ t }) => {
	// meta title
	document.title = projectName;

	const {
		formattedCasinoGames,
		isCasinoGamesLoading,
		totalCasinoGamesCount,
		page,
		setPage,
		itemsPerPage,
		handleStatus,
		onChangeRowsPerPage,
	} = useCasinoGamesListings();

	const columns = [
		{
			Header: 'GAME ID',
			accessor: 'casinoGameId',
			filterable: true,
			Cell: ({ cell }) => <CasinoGameId cell={cell} />,
		},
		{
			Header: 'NAME',
			accessor: 'name',
			filterable: true,
			Cell: ({ cell }) => <Name cell={cell} />,
		},
		{
			Header: 'PROVIDER',
			accessor: 'providerName',
			filterable: true,
			Cell: ({ cell }) => <Provider cell={cell} />,
		},
		{
			Header: 'RTP',
			accessor: 'returnToPlayer',
			filterable: true,
			Cell: ({ cell }) => <RTP cell={cell} />,
		},
		{
			Header: 'SUB CATEGORY',
			accessor: 'subCategoryType',
			filterable: true,
			Cell: ({ cell }) => <SubCategory cell={cell} />,
		},
		{
			Header: 'THUMBNAIL',
			accessor: 'thumbnailUrl',
			filterable: true,
			Cell: ({ cell }) => <ThumbnailUrl cell={cell} />,
		},
		{
			Header: 'DEVICE TYPE',
			accessor: 'devices',
			filterable: true,
			Cell: ({ cell }) => <DeviceType cell={cell} />,
		},
		{
			Header: 'STATUS',
			accessor: 'isActive',
			disableFilters: true,
			Cell: (cell) => <Status cell={cell} />,
		},
		{
			Header: 'ACTION',
			accessor: 'action',
			disableFilters: true,
			Cell: ({ cell }) => (
				<ActionButtons cell={cell} handleStatus={handleStatus} />
			),
		},
	];

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Casino Management')}
					breadcrumbItem={t('Casino Games')}
				/>
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Games Listing" />
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedCasinoGames}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCasinoGamesCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isCasinoGamesLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

CasinoGames.propTypes = {
	t: PropTypes.func,
};

CasinoGames.defaultProps = {
	t: (string) => string,
};

export default CasinoGames;
