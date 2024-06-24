import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Col, Row, Spinner } from 'reactstrap';
import TableContainer from '../../../components/Common/Table';
import useRemoveFromRestrictedCountriesListing from '../hooks/useRemoveFromRestrictedCountries';

const RemoveFromRestrictedCountries = ({ restrictedCountries }) => {
	const {
		restrictedCountriesLoading,
		restrictedCountriesState,
		columns,
		selectedCountriesState,
		selectedTableColumns,
		onSubmitSelected,
		addToRestrictedCountriesLoading,
	} = useRemoveFromRestrictedCountriesListing(restrictedCountries);

	return (
		<Card className="p-2">
			<Row className="col-reverse-sm">
				<Col sm={12} md={6} lg={6}>
					<h4 className="py-2">Restricted Countries</h4>
					<TableContainer
						columns={columns}
						isLoading={restrictedCountriesLoading}
						data={restrictedCountriesState}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						isShowColSettings={false}
					/>
				</Col>
				<Col sm={12} md={6} lg={6}>
					{selectedCountriesState?.length ? (
						<Card>
							<div className="d-flex justify-content-between my-2 align-items-center">
								<h4> Selected Countries </h4>
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
								{' '}
								Select countries you want to unrestrict
							</h5>
						</Card>
					)}
				</Col>
			</Row>
		</Card>
	);
};

export default RemoveFromRestrictedCountries;

RemoveFromRestrictedCountries.propTypes = {
	restrictedCountries: PropTypes.arrayOf(
		PropTypes.objectOf({
			id: PropTypes.string,
			name: PropTypes.string,
			code: PropTypes.string,
		})
	).isRequired,
};
