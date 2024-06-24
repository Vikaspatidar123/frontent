import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row, Spinner } from 'reactstrap';
import TableContainer from '../../../components/Common/Table';
import useAddToRestrictedCountriesListing from '../hooks/useAddToRestrictedCountriesListing';
import useFilters from '../hooks/useFilters';
import Filters from '../../../components/Common/Filters';

const AddToRestrictedCountries = ({ unrestrictedCountries }) => {
	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	const {
		columns,
		unrestrictedCountriesState,
		selectedCountriesState,
		selectedTableColumns,
		onSubmitSelected,
		addToRestrictedCountriesLoading,
	} = useAddToRestrictedCountriesListing(
		filterValidation.values,
		unrestrictedCountries
	);

	return (
		<Card className="p-2">
			<Row className="col-reverse-sm">
				<Col sm={12} md={6} lg={6}>
					<h4 className="py-3">Unrestricted Countries</h4>
					<Filters
						validation={filterValidation}
						filterFields={filterFields}
						actionButtons={actionButtons}
						isAdvanceOpen={isAdvanceOpen}
						toggleAdvance={toggleAdvance}
						isFilterChanged={isFilterChanged}
						customFieldCols={{ xxl: 6, xl: 6, md: 6, sm: 6 }}
					/>
					<TableContainer
						columns={columns}
						data={unrestrictedCountriesState}
						tableClass="table-bordered align-middle nowrap mt-2"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						isManualPagination
						isShowColSettings={false}
					/>
				</Col>
				<Col sm={12} md={6} lg={6}>
					{selectedCountriesState?.length ? (
						<Card>
							<div className="d-flex justify-content-between my-2 align-items-center">
								<h4>Selected Countries</h4>
								<Button
									color="primary"
									disabled={addToRestrictedCountriesLoading}
									onClick={onSubmitSelected}
								>
									{addToRestrictedCountriesLoading ? <Spinner /> : 'Submit'}
								</Button>
							</div>
							<TableContainer
								columns={selectedTableColumns}
								data={selectedCountriesState}
								tableClass="table-bordered align-middle nowrap mt-2"
								isShowColSettings={false}
							/>
						</Card>
					) : (
						<Card>
							<h5 className="text-center text-primary p-5 mt-5">
								Select countries you want to restrict
							</h5>
						</Card>
					)}
				</Col>
			</Row>
		</Card>
	);
};

export default AddToRestrictedCountries;

AddToRestrictedCountries.propTypes = {
	unrestrictedCountries: PropTypes.arrayOf(
		PropTypes.objectOf({
			id: PropTypes.string,
			name: PropTypes.string,
			code: PropTypes.string,
		})
	).isRequired,
};
