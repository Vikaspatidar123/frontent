import React from 'react';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSegmentation from './hooks/useSegmentation';
import FormModal from '../../components/Common/FormModal';

const Segmentation = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		columns,
		actionList,
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
					<Breadcrumb title="CRM" breadcrumbItem="Segmentation" />
				)}
				<TableContainer
					isLoading={userTagsLoading}
					columns={columns || []}
					data={formattedSegments}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					isShowColSettings
					totalPageCount={1}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={onChangeRowsPerPage}
					actionList={actionList}
				/>
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
