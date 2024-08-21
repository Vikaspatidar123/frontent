import React from 'react';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useUpdateSettings from './hooks/useUpdateSettings';
import FormModal from '../../components/Common/FormModal';

const AllReferrals = () => {
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		columns,
		actionList,
		referralsLoading,
		formattedReferrals,
		itemsPerPage,
		setCurrentPage,
		currentPage,
		onChangeRowsPerPage,
		isOpen,
		toggleFormModal,
		header,
		validation,
		isEditAllReferralsLoading,
		formFields,
	} = useUpdateSettings();

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb
						title="Bonus Management"
						breadcrumbItem="Referral Management"
					/>
				)}

				<TableContainer
					isLoading={referralsLoading}
					columns={columns || []}
					data={formattedReferrals}
					isPagination
					customPageSize={itemsPerPage}
					totalPageCount={1}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={onChangeRowsPerPage}
					isShowColSettings={false}
					actionList={actionList}
				/>

				<FormModal
					isOpen={isOpen}
					toggle={toggleFormModal}
					header={header}
					validation={validation}
					submitLabel="Update Settings"
					customColClasses="col-md-12"
					formFields={formFields}
					isSubmitLoading={isEditAllReferralsLoading}
				/>
			</Container>
		</div>
	);
};

export default AllReferrals;
