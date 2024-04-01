import React from 'react';
import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import useRestrictedCountriesListing from '../hooks/useRestrictedCountriesListing';
import TableContainer from '../../../components/Common/TableContainer';

const RestrictedCountries = ({ restrictedCountries }) => {
	const { columns } = useRestrictedCountriesListing();

	return (
		<Card className="p-2">
			<CardBody>
				{restrictedCountries?.length ? (
					<TableContainer
						columns={columns}
						data={restrictedCountries}
						customPageSize={restrictedCountries?.length || 10}
						tableClass="table-bordered align-middle nowrap mt-2"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
					/>
				) : (
					<h4 className="text-center text-primary p-5">No data found.</h4>
				)}
			</CardBody>
		</Card>
	);
};

export default RestrictedCountries;

RestrictedCountries.propTypes = {
	restrictedCountries: PropTypes.arrayOf(
		PropTypes.objectOf({
			id: PropTypes.string,
			name: PropTypes.string,
			code: PropTypes.string,
		})
	).isRequired,
};
