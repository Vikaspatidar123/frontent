/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
// import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { projectName } from '../../constants/config';
import {
	CasinoProviderId,
	Name,
	ThumbnailUrl,
	Status,
} from './CasinoProvidersListCol';
import ActionButtons from './ActionButtons';
import useCasinoProvidersListing from './hooks/useCasinoProvidersListing';
import FormModal from '../../components/Common/FormModal';
import useCreateProvider from './hooks/useCreateProvider';
import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

const CasinoProviders = () => {
	// meta title
	document.title = projectName;

	const {
		casinoProvidersData,
		isCasinoProvidersDataLoading,
		page,
		setPage,
		itemsPerPage,
		handleStatus,
		onChangeRowsPerPage,
	} = useCasinoProvidersListing();

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateProviderLoading,
		buttonList,
		onClickEdit,
		isEditProviderLoading,
	} = useCreateProvider();

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
			Header: 'ID',
			accessor: 'casinoProviderId',
			filterable: true,
			Cell: ({ cell }) => <CasinoProviderId cell={cell} />,
		},
		{
			Header: 'NAME',
			accessor: 'name',
			filterable: true,
			Cell: ({ cell }) => <Name cell={cell} />,
		},
		{
			Header: 'THUMBNAIL',
			accessor: 'thumbnailUrl',
			filterable: true,
			Cell: ({ cell }) => <ThumbnailUrl cell={cell} />,
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
				{/* <Breadcrumbs
					title={t('Casino Management')}
					breadcrumbItem={t('Casino Providers')}
				/> */}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Providers Listing" />
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
									data={casinoProvidersData?.rows || []}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={casinoProvidersData?.count}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isCasinoProvidersDataLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					toggle={() => setIsOpen((prev) => !prev)}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateProviderLoading || isEditProviderLoading}
				/>
			</Container>
		</div>
	);
};

CasinoProviders.propTypes = {
	// t: PropTypes.func,
};

CasinoProviders.defaultProps = {
	t: (string) => string,
};

export default CasinoProviders;
