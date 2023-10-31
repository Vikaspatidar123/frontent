import React from 'react';
import { Card } from 'reactstrap';
import useRestrictedCountriesListing from '../hooks/useRestrictedCountriesListing';
import TableContainer from '../../../components/Common/TableContainer';

const RestrictedCountries = () => {
	const {
		currentPage,
		setCurrentPage,
		restrictedCountriesLoading,
		columns,
		itemsPerPage,
		formattedRestrictedCountries,
		restrictedCountriesCount,
		onChangeRowsPerPage,
	} = useRestrictedCountriesListing({});

	return (
		<Card className="p-2">
			<TableContainer
				isLoading={restrictedCountriesLoading}
				columns={columns}
				data={formattedRestrictedCountries}
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

export default RestrictedCountries;
