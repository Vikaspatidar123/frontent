/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { CardBody } from 'reactstrap';
import TableContainer from '../../../components/Common/TableContainer';

// import components
import Breadcrumbs from '../../../components/Common/Breadcrumb';
import { getAggregatorsList } from '../../../store/actions';

// redux
import Spinners from '../../../components/Common/Spinner';
import useAggregatorList from './hooks/useAggregatorList';

const CasinoAggregators = () => {
	// meta title
	document.title =
		'Casino Game | Skote - Vite React Admin & Dashboard Template';
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			getAggregatorsList({
				limit: 15,
				pageNo: 1,
			})
		);
	}, [dispatch]);
	//   const {aggregatorsData,loading} = useSelector((state)=>state.AggregatorsReducer)
	const selectAggregatorsState = (state) => state.AggregatorsReducer;
	const columns = useAggregatorList();
	const AggregatorsProperties = createSelector(
		selectAggregatorsState,
		(aggregatorsReducer) => ({
			aggregatorsData: aggregatorsReducer.aggregatorsData,
			loading: aggregatorsReducer.loading,
		})
	);
	const { aggregatorsData, loading } = useSelector(AggregatorsProperties);
	const [isLoading, setLoading] = useState(loading);
	const [page, setPage] = useState(1);
	const itemsPerPage = 10;
	return (
		<div className="page-content">
			<div className="container-fluid">
				<Breadcrumbs
					title="Casino Management"
					breadcrumbItem="Casino Aggregators"
				/>
				{isLoading ? (
					<Spinners setLoading={setLoading} />
				) : (
					<CardBody>
						<TableContainer
							columns={columns}
							data={aggregatorsData?.rows}
							isGlobalFilter
							isPagination
							customPageSize={itemsPerPage}
							tableClass="table-bordered align-middle nowrap mt-2"
							paginationDiv="justify-content-center"
							pagination="pagination justify-content-start pagination-rounded"
							totalPageCount={aggregatorsData?.count}
							isManualPagination
							onChangePagination={setPage}
							currentPage={page}
							isLoading={isLoading}
						/>
					</CardBody>
				)}
			</div>
		</div>
	);
};

export default CasinoAggregators;
