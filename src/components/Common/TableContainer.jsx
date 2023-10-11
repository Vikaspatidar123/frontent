/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-props-no-spreading */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
	useTable,
	useGlobalFilter,
	useSortBy,
	useFilters,
	useExpanded,
	usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Spinner } from 'reactstrap';
import { Pagination } from '@mui/material';
import { DefaultColumnFilter } from './filters';
import JobListGlobalFilter from './GlobalSearchFilter';

// Define a default UI for filtering
const GlobalFilter = ({
	preGlobalFilteredRows,
	globalFilter,
	setGlobalFilter,
	isJobListGlobalFilter,
}) => {
	const count = preGlobalFilteredRows.length;
	const [value, setValue] = React.useState(globalFilter);
	const onChange = (newValue) => {
		setGlobalFilter(newValue || undefined);
	};

	return (
		<>
			<Col xxl={3} lg={6}>
				<input
					type="search"
					className="form-control"
					id="search-bar-0"
					value={value || ''}
					placeholder={`${count} records...`}
					onChange={(e) => {
						setValue(e.target.value);
						onChange(e.target.value);
					}}
				/>
			</Col>
			{isJobListGlobalFilter && (
				<JobListGlobalFilter setGlobalFilter={setGlobalFilter} />
			)}
		</>
	);
};

const TableContainer = ({
	columns,
	data,
	isGlobalFilter,
	isAddOptions,
	// isAddUserList,
	// handleOrderClicks,
	// handleUserClick,
	// handleCustomerClick,
	// isAddCustList,
	customPageSize,
	tableClass,
	customPageSizeOptions,
	isShowingPageLength,
	isPagination,
	paginationDiv,
	// pagination,
	iscustomPageSizeOptions,
	theadClass,
	isJobListGlobalFilter,
	totalPageCount,
	isManualPagination,
	onChangePagination,
	currentPage,
	isLoading = false,
	handleAddClick,
	addOptionLabel,
}) => {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		prepareRow,
		// canPreviousPage,
		// canNextPage,
		// pageOptions,
		// pageCount,
		// gotoPage,
		// nextPage,
		// previousPage,
		setPageSize,
		state,
		preGlobalFilteredRows,
		setGlobalFilter,
		state: {
			// pageIndex,
			pageSize,
		},
	} = useTable(
		{
			columns,
			data,
			defaultColumn: { Filter: DefaultColumnFilter },
			initialState: {
				pageIndex: 0,
				pageSize: customPageSize,
				// sortBy: [
				//   {
				//     desc: true,
				//   },
				// ],
			},
			manualPagination: isManualPagination,
			pageCount: Math.ceil(totalPageCount / customPageSize),
		},
		useGlobalFilter,
		useFilters,
		useSortBy,
		useExpanded,
		usePagination
	);

	// const generateSortingIndicator = (column) => column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";

	const onChangeInSelect = (event) => {
		setPageSize(Number(event.target.value));
	};

	// const isPageSelected = (item) => {
	//   if (isManualPagination) {
	//     return currentPage === item + 1;
	//   }
	//   return pageIndex === item;
	// };

	const handlePagination = (e, item) => {
		if (isManualPagination) {
			onChangePagination(item);
		}
	};

	return (
		<>
			<Row className="mb-2">
				{iscustomPageSizeOptions && (
					<Col md={customPageSizeOptions ? 2 : 1}>
						<select
							className="form-select"
							value={pageSize}
							onChange={onChangeInSelect}
						>
							{[10, 20, 30, 40, 50].map((pageSizeExact) => (
								<option key={pageSize} value={pageSizeExact}>
									Show {pageSize}
								</option>
							))}
						</select>
					</Col>
				)}
				{isGlobalFilter && (
					<GlobalFilter
						preGlobalFilteredRows={preGlobalFilteredRows}
						globalFilter={state.globalFilter}
						setGlobalFilter={setGlobalFilter}
						isJobListGlobalFilter={isJobListGlobalFilter}
					/>
				)}
				{isAddOptions && (
					<Col sm="7" xxl="8">
						<div className="text-sm-end">
							<Button
								type="button"
								color="success"
								className="btn-rounded  mb-2 me-2"
								onClick={handleAddClick}
							>
								<i className="mdi mdi-plus me-1" />
								{addOptionLabel}
							</Button>
						</div>
					</Col>
				)}
				{/* {isAddUserList && (
					<Col sm="7" xxl="8">
						<div className="text-sm-end">
							<Button
								type="button"
								color="primary"
								className="btn mb-2 me-2"
								onClick={handleUserClick}
							>
								<i className="mdi mdi-plus-circle-outline me-1" />
								Create New User
							</Button>
						</div>
					</Col>
				)}
				{isAddCustList && (
					<Col sm="7" xxl="8">
						<div className="text-sm-end">
							<Button
								type="button"
								color="success"
								className="btn-rounded mb-2 me-2"
								onClick={handleCustomerClick}
							>
								<i className="mdi mdi-plus me-1" />
								New Customers
							</Button>
						</div>
					</Col>
				)} */}
			</Row>

			<div className="table-responsive react-table">
				<Table {...getTableProps()} className={tableClass}>
					<thead className={theadClass}>
						{headerGroups.map((headerGroup) => (
							<tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column) => (
									<th
										key={column.id}
										className={column.isSort ? 'sorting' : ''}
									>
										<div {...column.getSortByToggleProps()}>
											{column.render('Header')}
											{/* {generateSortingIndicator(column)} */}
										</div>
										{/* <Filter column={column} /> */}
									</th>
								))}
							</tr>
						))}
					</thead>

					<tbody
						{...getTableBodyProps({
							height: `${isLoading || !page?.length ? '500px' : '0'}`,
						})}
					>
						{isLoading || !page?.length ? (
							<Spinner
								color="primary"
								className="position-absolute top-50 start-50"
							/>
						) : (
							page.map((row) => {
								prepareRow(row);
								return (
									<Fragment key={row.getRowProps().key}>
										<tr>
											{row.cells.map((cell) => (
												<td key={cell.id} {...cell.getCellProps()}>
													{cell.render('Cell')}
												</td>
											))}
										</tr>
									</Fragment>
								);
							})
						)}
					</tbody>
				</Table>
			</div>

			{isPagination && (
				<Row className="justify-content-between align-items-center">
					{isShowingPageLength && (
						<div className="col-sm">
							<div className="text-muted">
								Showing <span className="fw-semibold">{page.length}</span> of{' '}
								<span className="fw-semibold">{data.length}</span> entries
							</div>
						</div>
					)}
					<div className={paginationDiv}>
						<Pagination
							color="primary"
							count={Math.ceil(totalPageCount / customPageSize)}
							page={currentPage}
							onChange={handlePagination}
						/>
					</div>
					{/* <div className={paginationDiv}>
            <ul className={pagination}>
              <li className={`page-item ${!canPreviousPage ? 'disabled' : ''}`}>
                <Link to="#" className="page-link" onClick={() => handlePreviousPage(currentPage)}>
                  <i className="mdi mdi-chevron-left" />
                </Link>
              </li>
              {pageOptions.map((item) => (
                <React.Fragment key={item}>
                  <li
                    className={
                      isPageSelected(item) ? 'page-item active' : 'page-item'
                    }
                  >
                    <Link
                      to="#"
                      className="page-link"
                      onClick={() =>
                        isManualPagination
                          ? onChangePagination(item + 1)
                          : gotoPage(item)
                      }
                    >
                      {item + 1}
                    </Link>
                  </li>
                </React.Fragment>
              ))}
              <li className={`page-item ${!canNextPage ? 'disabled' : ''}`}>
                <Link to="#" className="page-link" onClick={() => handleNextPage(currentPage)}>
                  <i className="mdi mdi-chevron-right" />
                </Link>
              </li>
            </ul>
          </div> */}
				</Row>
			)}
		</>
	);
};

TableContainer.defaultProps = {
	preGlobalFilteredRows: [],
};

TableContainer.propTypes = {
	// eslint-disable-next-line react/require-default-props
	preGlobalFilteredRows: PropTypes.arrayOf,
	// columns: PropTypes.arrayOf,
	// data: PropTypes.arrayOf,
	// isGlobalFilter: PropTypes.bool,
	// isAddOptions: PropTypes.bool,
	// isAddUserList: PropTypes.bool,
	// handleOrderClicks: PropTypes.func,
};

export default TableContainer;
