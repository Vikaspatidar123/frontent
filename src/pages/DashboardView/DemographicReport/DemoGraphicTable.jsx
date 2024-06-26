import React from 'react';
import PropTypes from 'prop-types';
// Simple bar
import TableContainer from '../../../components/Common/Table';
import { tableCustomClass } from '../../../constants/config';

const DemoGraphicTable = (props) => {
	const { demoGraphColumn, formattedDemoGraphicData, isDemographicLoading } =
		props;
	return (
		<div className="demo-graph-table">
			<TableContainer
				columns={demoGraphColumn || []}
				data={formattedDemoGraphicData || []}
				isGlobalFilter={false}
				isPagination={false}
				tableClass={`table-bordered align-middle nowrap mt-2 ${tableCustomClass}`}
				paginationDiv="justify-content-center"
				pagination="pagination justify-content-start pagination-rounded"
				customPageSize={formattedDemoGraphicData?.length || 15}
				isLoading={isDemographicLoading}
				isShowColSettings={false}
			/>
		</div>
	);
};
DemoGraphicTable.propTypes = {
	demoGraphColumn: PropTypes.arrayOf.isRequired,
	formattedDemoGraphicData: PropTypes.arrayOf.isRequired,
	isDemographicLoading: PropTypes.bool.isRequired,
};

export default DemoGraphicTable;
