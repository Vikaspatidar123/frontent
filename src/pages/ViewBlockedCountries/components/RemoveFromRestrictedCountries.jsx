import React from 'react';
import { Button, Card, Spinner } from 'reactstrap';
import TableContainer from '../../../components/Common/TableContainer';
import useRemoveFromRestrictedCountriesListing from '../hooks/useRemoveFromRestrictedCountries';

const RemoveFromRestrictedCountries = () => {
	const {
		restrictedCountriesCount,
		restrictedCountriesLoading,
		restrictedCountriesState,
		currentPage,
		setCurrentPage,
		columns,
		itemsPerPage,
		onChangeRowsPerPage,
		selectedCountriesState,
		selectedTableColumns,
		onSubmitSelected,
		addToRestrictedCountriesLoading,
	} = useRemoveFromRestrictedCountriesListing({});

	return (
		<Card className="p-2">
			{selectedCountriesState?.length ? (
				<Card>
					<div className="d-flex justify-content-between my-2 align-items-center">
						<h4> Selected Countries </h4>
						<Button
							color="primary"
							disabled={
								!selectedCountriesState.length ||
								addToRestrictedCountriesLoading
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
				</Card>
			) : (
				<Card>
					<h4 className="text-center text-primary p-5">
						{' '}
						Countries you remove will appear here.
					</h4>
				</Card>
			)}
			<h4 className="py-3">Restricted Countries</h4>
			<TableContainer
				columns={columns}
				isLoading={restrictedCountriesLoading}
				data={restrictedCountriesState}
				isPagination
				customPageSize={itemsPerPage}
				tableClass="table-bordered align-middle nowrap mt-2"
				// paginationDiv="col-sm-12 col-md-7"
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				totalPageCount={restrictedCountriesCount}
				isManualPagination
				onChangePagination={setCurrentPage}
				currentPage={currentPage}
				changeRowsPerPageCallback={onChangeRowsPerPage}
			/>
		</Card>
	);
};

export default RemoveFromRestrictedCountries;
