/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { Container, Col, Row, Card, CardBody } from 'reactstrap';
import { useSelector } from 'react-redux';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import {
	projectName,
	tableCustomClass,
	tbodyClass,
} from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useActions from './hooks/useActions';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

const Admins = () => {
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
		totalAdminsCount,
		page,
		setPage,
		itemsPerPage,
		columns,
		formattedAdminDetails,
		buttonList,
		onChangeRowsPerPage,
	} = useActions(false, filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Dashboard" breadcrumbItem="Staff" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Staff" />
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
									data={formattedAdminDetails}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
									tbodyClass={tbodyClass}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalAdminsCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isLoading}
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

Admins.propTypes = {
	// t: PropTypes.func,
};

Admins.defaultProps = {
	// t: (string) => string,
};

export default Admins;
