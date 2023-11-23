import React from 'react';
import PropTypes from 'prop-types';
// Simple bar
import TableContainer from '../../../components/Common/TableContainer';
import { tableCustomClass } from '../../../constants/config';

const DemoGraphicTable = (props) => {
	const { demoGraphColumn, demoGraphicData, isDemographicLoading } = props;

	return (
		<div className="demo-graph-table">
			<TableContainer
				columns={demoGraphColumn || []}
				data={demoGraphicData || []}
				isGlobalFilter={false}
				isPagination={false}
				tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
				// tbodyClass="kpiTableWrap"
				// theadClass={theadClass}
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				// totalPageCount={1}
				customPageSize={demoGraphicData?.length || 15}
				// tbodyHeight="300"
				isLoading={isDemographicLoading}
			/>
		</div>
	);
};
DemoGraphicTable.propTypes = {
	demoGraphColumn: PropTypes.arrayOf,
	demoGraphicData: PropTypes.arrayOf,
	isDemographicLoading: PropTypes.bool,
};
DemoGraphicTable.defaultProps = {
	demoGraphColumn: PropTypes.arrayOf,
	demoGraphicData: PropTypes.arrayOf,
	isDemographicLoading: PropTypes.bool,
};
export default DemoGraphicTable;
