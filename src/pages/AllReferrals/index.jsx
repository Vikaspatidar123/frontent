import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import CrudSection from '../../components/Common/CrudSection';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useUpdateSettings from './hooks/useUpdateSettings';

const AllReferrals = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		columns,
		buttonList,
		referralsLoading,
		formattedReferrals,
		itemsPerPage,
		setCurrentPage,
		currentPage,
		onChangeRowsPerPage,
	} = useUpdateSettings();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Bonus" breadcrumbItem="Referrals" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Referrals" />
							<CardBody>
								<TableContainer
									isLoading={referralsLoading}
									columns={columns || []}
									data={formattedReferrals}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={1}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
									isShowColSettings={false}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default AllReferrals;
