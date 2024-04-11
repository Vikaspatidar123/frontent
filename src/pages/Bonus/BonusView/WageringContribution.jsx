import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Col, Row } from 'reactstrap';
import { getWageringTemplateDetail } from '../../../store/actions';
import TableContainer from '../../../components/Common/Table';

const KeyValueCell = ({ cell }) => (cell.value ? cell.value : '');

const columns = [
	{
		Header: 'NAME',
		accessor: 'name',
		disableSortBy: true,
		Cell: (cell) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'RTP',
		accessor: 'rtp',
		disableSortBy: true,
		Cell: (cell) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'WAGERING CONTRIBUTION',
		accessor: 'contribution',
		disableSortBy: true,
		Cell: (cell) => <KeyValueCell cell={cell} />,
	},
];

const WageringContribution = ({ wageringId }) => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const { SAWageringTemplateLoading, SAWageringTemplate } = useSelector(
		(state) => state.WageringTemplate
	);

	useEffect(() => {
		if (wageringId) {
			dispatch(
				getWageringTemplateDetail({
					wageringTemplateId: wageringId,
					page: currentPage,
					perPage: itemsPerPage,
				})
			);
		}
	}, [currentPage, itemsPerPage, wageringId]);

	const formattedWageringTemplates = useMemo(() => {
		if (SAWageringTemplate) {
			return SAWageringTemplate?.casinoGame.map((item) => ({
				...item,
				rtp: `${item.returnToPlayer} %`,
				contribution: `${item.wageringContribution ?? 0} %`,
			}));
		}
		return [];
	}, [SAWageringTemplate]);

	return (
		<Row>
			<Col sm="6" className="mb-3">
				<h6>Wagering Template: {SAWageringTemplate?.name}</h6>
			</Col>
			<Col lg="12" className="mb-3">
				<TableContainer
					isLoading={SAWageringTemplateLoading}
					columns={columns}
					data={formattedWageringTemplates}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={SAWageringTemplate?.gameDetail?.count}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={setItemsPerPage}
				/>
			</Col>
		</Row>
	);
};

WageringContribution.defaultProps = {
	wageringId: '',
};

WageringContribution.propTypes = {
	wageringId: PropTypes.number,
};

export default WageringContribution;
