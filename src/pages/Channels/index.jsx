import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/Table';
import { projectName } from '../../constants/config';
import useChannelListing from './hooks/useChannelListing';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';

const Channels = () => {
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
		formattedchannelDetails,
		isLoading,
		page,
		setPage,
		totalCount,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	} = useChannelListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Channel Management" breadcrumbItem="Channel" />
				)}
				<Row>
					<Col lg="12">
						<Card>
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
									columns={columns}
									data={formattedchannelDetails || []}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalCount || 15}
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

Channels.propTypes = {};

Channels.defaultProps = {
	t: (string) => string,
};

export default Channels;
