/* eslint-disable arrow-body-style */
/* eslint-disable react/prop-types */
import React, { useMemo, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import useEditWageringTemplate from './hooks/useEditWageringTemplate';
import { getWageringTemplateDetail } from '../../store/actions';
import {
	RTP,
	TemplateName,
	WageringContribution,
	CustomValues,
} from './WageringTemplateListCol';

const columns = [
	{
		Header: 'NAME',
		accessor: 'name',
		Cell: ({ cell }) => <TemplateName cell={cell} />,
	},
	{
		Header: 'RTP',
		accessor: 'returnToPlayer',
		Cell: ({ cell }) => <RTP cell={cell} />,
	},
	{
		Header: 'DEFAULT',
		accessor: 'wageringContribution',
		Cell: ({ cell }) => <WageringContribution cell={cell} />,
	},
	{
		Header: 'DEFAULT',
		accessor: 'gameContribution',
		Cell: ({ cell }) => <CustomValues cell={cell} />,
	},
];

const WageringTemplateDetailList = () => {
	const dispatch = useDispatch();
	const { wageringTemplateId } = useParams();

	const {
		SAWageringTemplate,
		SAWageringTemplateLoading,
		itemsPerPage,
		onChangeRowsPerPage,
		page,
		setPage,
	} = useEditWageringTemplate();

	useEffect(() => {
		dispatch(
			getWageringTemplateDetail({
				wageringTemplateId: Number(wageringTemplateId),
				providerId: '',
				limit: itemsPerPage,
				pageNo: page,
				search: '',
			})
		);
	}, [itemsPerPage, page]);

	const formattedSAWageringTemplateData = useMemo(() => {
		if (SAWageringTemplate) {
			return SAWageringTemplate?.gameDetail?.rows?.map((template) => {
				return {
					...template,
					gameContribution:
						SAWageringTemplate?.gameContribution[template?.casinoGameId] || 100,
				};
			});
		}
		return [];
	}, [SAWageringTemplate]);

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title="Wagering Template"
					breadcrumbItem="View"
					titleLink="/wagering-template"
					leftTitle={
						<>
							<i className="fas fa-angle-left" /> Back
						</>
					}
				/>
				<Row>
					<Col>
						<TableContainer
							columns={columns}
							data={formattedSAWageringTemplateData}
							isPagination
							customPageSize={itemsPerPage}
							tableClass="table-bordered align-middle nowrap mt-2"
							paginationDiv="justify-content-center"
							pagination="pagination justify-content-start pagination-rounded"
							totalPageCount={SAWageringTemplate?.gameDetail?.count}
							isManualPagination
							onChangePagination={setPage}
							currentPage={page}
							isLoading={SAWageringTemplateLoading}
							changeRowsPerPageCallback={onChangeRowsPerPage}
						/>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default WageringTemplateDetailList;
