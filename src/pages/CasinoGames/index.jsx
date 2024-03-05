import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { projectName } from '../../constants/config';
import useCasinoGamesListings from './hooks/useCasinoGamesListing';
import CrudSection from '../../components/Common/CrudSection';
import useEditCasinoGames from './hooks/useEditCasinoGames';
import FormModal from '../../components/Common/FormModal';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

const CasinoGames = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	const {
		formattedCasinoGames,
		isCasinoGamesLoading,
		totalCasinoPages,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
		buttonList,
	} = useCasinoGamesListings(filterValidation.values);

	const {
		isEditCasinoGamesLoading,
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		columns,
	} = useEditCasinoGames();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Casino Management" breadcrumbItem="Casino Games" />
				)}

				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Casino Games" />
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
									totalPageCount={totalCasinoPages}
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

CasinoGames.defaultProps = {
	t: (string) => string,
};

export default CasinoGames;
