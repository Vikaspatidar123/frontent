import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../../components/Common/Table';
// import components
import Breadcrumb from '../../../components/Common/Breadcrumb';
// redux
import { projectName } from '../../../constants/config';
import useCreateAggregator from './hooks/useCreateAggregator';
import CrudSection from '../../../components/Common/CrudSection';
import FormModal from '../../../components/Common/FormModal';
import { formPageTitle } from '../../../components/Common/constants';
import ConfirmationModal from '../../../components/Common/ConfirmationModal';
import useAggregatorListing from './hooks/useAggregatorListing';

const CasinoAggregators = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		isOpen,
		setIsOpen,
		showModal,
		setShowModal,
		header,
		validation,
		formFields,
		isCreateAggregatorLoading,
		buttonList,
		handleStatus,
	} = useCreateAggregator();

	const {
		onChangeRowsPerPage,
		columns,
		aggregatorsData,
		itemsPerPage,
		setCurrentPage,
		currentPage,
		loading,
	} = useAggregatorListing(handleStatus);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb
						title="Casino Management"
						breadcrumbItem="Casino Aggregators"
					/>
				)}

				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Casino Aggregators" />
							<CardBody>
								<TableContainer
									columns={columns || []}
									data={aggregatorsData?.aggregators || []}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={aggregatorsData?.totalPages}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									isLoading={loading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					showConfirmationModal={showModal}
					setShowConfirmationModal={setShowModal}
					isEditOpen={false}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateAggregatorLoading}
				/>
				<ConfirmationModal
					openModal={showModal}
					setOpenModal={setShowModal}
					validation={validation}
					pageType={formPageTitle.aggregators}
				/>
			</Container>
		</div>
	);
};

export default CasinoAggregators;
