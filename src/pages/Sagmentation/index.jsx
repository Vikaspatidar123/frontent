import React from 'react';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import CrudSection from '../../components/Common/CrudSection';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSegmentation from './hooks/useSegmentation';
import FormModal from '../../components/Common/FormModal';

const Segmentation = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		columns,
		buttonList,
		formattedSegments,
		itemsPerPage,
		setCurrentPage,
		currentPage,
		onChangeRowsPerPage,
		isOpen,
		toggleFormModal,
		header,
		validation,
		formFields,
		userTagsLoading,
	} = useSegmentation();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Segmentation" breadcrumbItem="Segmentation" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Segmentation" />
							<CardBody>
								<TableContainer
									isLoading={userTagsLoading}
									columns={columns || []}
									data={formattedSegments}
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
				<FormModal
					isOpen={isOpen}
					toggle={toggleFormModal}
					header={header}
					validation={validation}
					submitLabel="Create"
					customColClasses="col-md-12"
					formFields={formFields}
					// isSubmitLoading={}
				/>
			</Container>
		</div>
	);
};

export default Segmentation;
