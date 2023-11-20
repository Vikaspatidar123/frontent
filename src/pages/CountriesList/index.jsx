import React from 'react';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
// import PropTypes from 'prop-types';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';

import useCountriesListing from './hooks/useCountriesListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import FormModal from '../../components/Common/FormModal';
import useEditCountry from './hooks/useEditCountry';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

const CountriesList = () => {
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
		currentPage,
		setCurrentPage,
		totalCountriesCount,
		isCountriesLoading,
		formattedCountries,
		itemsPerPage,
		onChangeRowsPerPage,
	} = useCountriesListing(filterValidation.values);

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		isEditCountryLoading,
		columns,
	} = useEditCountry();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Site Configurations" breadcrumbItem="Countries" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Countries" />
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
									isLoading={isCountriesLoading}
									columns={columns}
									data={formattedCountries}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCountriesCount}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
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
					isSubmitLoading={isEditCountryLoading}
				/>
			</Container>
		</div>
	);
};

CountriesList.propTypes = {
	// t: PropTypes.func,
};

CountriesList.defaultProps = {
	t: (string) => string,
};

export default CountriesList;
