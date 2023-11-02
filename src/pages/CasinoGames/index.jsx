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
	IsFeatured,
} from './CasinoGamesListCol';
import ActionButtons from './ActionButtons';
import useCasinoGamesListings from './hooks/useCasinoGamesListing';
import CrudSection from '../../components/Common/CrudSection';
import useEditCasinoGames from './hooks/useEditCasinoGames';
import FormModal from '../../components/Common/FormModal';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

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
		toggleIsFeaturedGames,
	} = useCasinoGamesListings();

	const {
		onClickEdit,
		isEditCasinoGamesLoading,
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
	} = useEditCasinoGames();

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	const columns = [
		{
			Header: 'IS FEATURED',
			accessor: 'isFeatured',
			Cell: (cellProps) => (
				<IsFeatured
					toggleIsFeaturedGames={toggleIsFeaturedGames}
					isFeaturedUpdateLoading={false}
					// featuredFabData={featuredFabData}
					cellProps={cellProps}
				/>
			),
		},
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
				<ActionButtons
					cell={cell}
					handleStatus={handleStatus}
					onClickEdit={onClickEdit}
				/>
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
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
									isFilterChanged={isFilterChanged}
								/>
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
								<FormModal
									isOpen={isOpen}
									toggle={() => setIsOpen((prev) => !prev)}
									header={header}
									validation={validation}
									formFields={formFields}
									submitLabel="Submit"
									customColClasses="col-md-12"
									isSubmitLoading={isEditCasinoGamesLoading}
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
