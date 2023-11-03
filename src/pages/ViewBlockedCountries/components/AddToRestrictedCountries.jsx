import React from 'react';
import { Button, Card, Spinner } from 'reactstrap';
import TableContainer from '../../../components/Common/TableContainer';
import useAddToRestrictedCountriesListing from '../hooks/useAddToRestrictedCountriesListing';
import useFilters from '../hooks/useFilters';
import Filters from '../../../components/Common/Filters';

const AddToRestrictedCountries = () => {
	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	const {
		unrestrictedCountriesCount,
		unrestrictedCountriesLoading,
		currentPage,
		setCurrentPage,
		columns,
		itemsPerPage,
		onChangeRowsPerPage,
		unrestrictedCountriesState,
		selectedCountriesState,
		selectedTableColumns,
		onSubmitSelected,
		addToRestrictedCountriesLoading,
	} = useAddToRestrictedCountriesListing(filterValidation.values);

	return (
		<Card className="p-2">
			<div className="d-flex justify-content-between my-2 align-items-center">
				<h4>Countries you add will appear here</h4>
				<Button
					disabled={
						!selectedCountriesState.length || addToRestrictedCountriesLoading
					}
					onClick={onSubmitSelected}
				>
					{addToRestrictedCountriesLoading ? <Spinner /> : 'Submit'}
				</Button>
			</div>
			<TableContainer
				columns={selectedTableColumns}
				isLoading={false}
				data={selectedCountriesState}
				isPagination
				customPageSize={itemsPerPage}
				tableClass="table-bordered align-middle nowrap mt-2"
			/>
			<h4>Unrestricted Countries</h4>
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
				isLoading={unrestrictedCountriesLoading}
				data={unrestrictedCountriesState}
				isPagination
				customPageSize={itemsPerPage}
				tableClass="table-bordered align-middle nowrap mt-2"
				// paginationDiv="col-sm-12 col-md-7"
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				totalPageCount={unrestrictedCountriesCount}
				isManualPagination
				onChangePagination={setCurrentPage}
				currentPage={currentPage}
				changeRowsPerPageCallback={onChangeRowsPerPage}
			/>
		</Card>
	);
};

export default AddToRestrictedCountries;
