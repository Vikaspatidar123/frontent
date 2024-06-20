import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/Table';
import {
	projectName,
	tableCustomClass,
	tbodyClass,
} from '../../constants/config';
// import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';
import usePaymentListing from './hooks/usePaymentListing';

const PaymentProviders = () => {
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
		isLoading,
		totalPages,
		page,
		setPage,
		itemsPerPage,
		columns,
		paymentListing,
		// buttonList,
		onChangeRowsPerPage,
	} = usePaymentListing(false, filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Payment" breadcrumbItem="Payment" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							{/* <CrudSection buttonList={buttonList} title="Payment" /> */}
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
									columns={columns || []}
									data={paymentListing?.paymentProviders || []}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									tbodyClass={tbodyClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalPages}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={isLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

PaymentProviders.propTypes = {
	// t: PropTypes.func,
};

PaymentProviders.defaultProps = {
	// t: (string) => string,
};

export default PaymentProviders;
