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
import { projectName } from '../../../constants/config';
import useAggregatorList from './hooks/useAggregatorList';
import FormModal from '../../../components/Common/FormModal';
import useCreateAggregator from './hooks/useCreateAggregator';

const CasinoAggregators = () => {
	// meta title
	document.title = projectName;
	const dispatch = useDispatch();
	const fetchData = () => {
		dispatch(
			getAggregatorsList({
				limit: 15,
				pageNo: 1,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [dispatch]);

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		handleAddClick,
		isCreateAggregatorLoading,
	} = useCreateAggregator();

	const selectAggregatorsState = (state) => state.AggregatorsReducer;
	const columns = useAggregatorList();
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
	const [isLoading, setLoading] = useState(loading);
	const [page, setPage] = useState(1);
	const itemsPerPage = 10;

	useEffect(() => {
		if (isCreateAggregatorSuccess) fetchData();
	}, [isCreateAggregatorSuccess]);

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
							isAddOptions
							addOptionLabel="Create"
							handleAddClick={handleAddClick}
						/>
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
					</CardBody>
				)}
			</div>
		</div>
	);
};

export default CasinoAggregators;
