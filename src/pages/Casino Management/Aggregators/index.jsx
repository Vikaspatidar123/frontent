/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../../components/Common/TableContainer';

// import components
// import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { getAggregatorsList } from '../../../store/actions';

// redux
import { projectName } from '../../../constants/config';
import useAggregatorList from './hooks/useAggregatorList';
import useCreateAggregator from './hooks/useCreateAggregator';
import CrudSection from '../../../components/Common/CrudSection';
import FormModal from '../../../components/Common/FormModal';

const CasinoAggregators = () => {
	// meta title
	document.title = projectName;
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const dispatch = useDispatch();
	const fetchData = () => {
		dispatch(
			getAggregatorsList({
				limit: itemsPerPage,
				pageNo: currentPage,
			})
		);
	};

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		isCreateAggregatorLoading,
		buttonList,
		handleStatus,
		active,
	} = useCreateAggregator();

	useEffect(() => {
		fetchData();
	}, [active, currentPage, itemsPerPage]);

	const selectAggregatorsState = (state) => state.AggregatorsReducer;
	const columns = useAggregatorList(handleStatus);
	const AggregatorsProperties = createSelector(
		selectAggregatorsState,
		(aggregatorsReducer) => ({
			aggregatorsData: aggregatorsReducer.aggregatorsData,
			loading: aggregatorsReducer.loading,
			isCreateAggregatorSuccess: aggregatorsReducer.isCreateAggregatorSuccess,
		})
	);
	const { aggregatorsData, loading, isCreateAggregatorSuccess } = useSelector(
		AggregatorsProperties
	);

	useEffect(() => {
		if (isCreateAggregatorSuccess) fetchData();
	}, [isCreateAggregatorSuccess]);

	return (
		<div className="page-content">
			<Container fluid>
				{/* <Breadcrumbs
					title="Casino Management"
					breadcrumbItem="Casino Aggregators"
				/> */}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection
								buttonList={buttonList}
								title="Aggregators Listing"
							/>
							{!loading && (
								<CardBody>
									<TableContainer
										columns={columns || []}
										data={aggregatorsData?.rows}
										isGlobalFilter
										isPagination
										customPageSize={itemsPerPage}
										tableClass="table-bordered align-middle nowrap mt-2"
										paginationDiv="justify-content-center"
										pagination="pagination justify-content-start pagination-rounded"
										totalPageCount={aggregatorsData?.count}
										isManualPagination
										onChangePagination={setCurrentPage}
										currentPage={currentPage}
										isLoading={loading}
										changeRowsPerPageCallback={onChangeRowsPerPage}
									/>
								</CardBody>
							)}
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
					isSubmitLoading={isCreateAggregatorLoading}
				/>
			</Container>
		</div>
	);
};

export default CasinoAggregators;
