import React from 'react';
import PropTypes from 'prop-types';
// Simple bar
import TableContainer from '../../../components/Common/Table';
import { tableCustomClass } from '../../../constants/config';

const DemoGraphicTable = (props) => {
	const { demoGraphColumn, demoGraphicData, isDemographicLoading } = props;
	return (
		<div className="demo-graph-table">
			<TableContainer
				columns={demoGraphColumn || []}
				data={demoGraphicData?.demograph || []}
				isGlobalFilter={false}
				isPagination={false}
				tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
				// tbodyClass="kpiTableWrap"
				// theadClass={theadClass}
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				// totalPageCount={1}
				customPageSize={demoGraphicData?.demograph?.length || 15}
				// tbodyHeight="300"
				isLoading={isDemographicLoading}
				isShowColSettings={false}
			/>
		</div>
	);
};
DemoGraphicTable.propTypes = {
	demoGraphColumn: PropTypes.arrayOf.isRequired,
	demoGraphicData: PropTypes.arrayOf.isRequired,
	isDemographicLoading: PropTypes.bool.isRequired,
};

export default DemoGraphicTable;
