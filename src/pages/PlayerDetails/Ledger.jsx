import React from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import PropTypes from 'prop-types';
import TableContainer from '../../components/Common/Table';
import useLedgerFilters from './hooks/useLedgerFilters';
import Filters from '../../components/Common/Filters';
import CrudSection from '../../components/Common/CrudSection';
import useLedgerDetails from './hooks/useLedgerDetails';

const Ledger = ({ userId }) => {
	const {
		currentPage,
		setCurrentPage,
		totalLedgerCount,
		ledgerDetailLoading,
		formattedLedgerDetails,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		exportComponent,
	} = useLedgerDetails(userId);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useLedgerFilters();

	return (
		<Container fluid>
			<Card className="p-2">
				<CrudSection
					buttonList={[]}
					exportComponent={exportComponent}
					title="Ledger"
				/>
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
						isLoading={ledgerDetailLoading}
						columns={columns}
						data={formattedLedgerDetails}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={totalLedgerCount || 0}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
				</CardBody>
			</Card>
		</Container>
	);
};

Ledger.defaultProps = {
	userId: '',
};

Ledger.propTypes = {
	userId: PropTypes.string,
};

export default Ledger;
