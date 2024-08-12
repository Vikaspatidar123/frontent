import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumb from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/Table';
import { projectName } from '../../constants/config';
import useBonusListing from './hooks/useBonusListing';
import CrudSection from '../../components/Common/CrudSection';
import Filters from '../../components/Common/Filters';
import useFilters from './hooks/useFilters';
import YesNoModal from '../../components/Common/YesNoModal';

const BonusDetail = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useFilters();

	const {
		formattedBonusDetails,
		isLoading,
		page,
		setPage,
		totalBonusCount,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		isDeleteConfirmationOpen,
		setDeleteConfirmation,
		bonusDeleteHandler,
		buttonList,
	} = useBonusListing(filterValidation.values);

	return (
		<div className="page-content">
			<Container fluid>
				{showBreadcrumb && (
					<Breadcrumb title="Bonus Management" breadcrumbItem="Bonus" />
				)}
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Bonuses" />
							<CardBody>
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
									isFilterChanged={isFilterChanged}
								/>
								<TableContainer
									columns={columns}
									data={formattedBonusDetails}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalBonusCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<YesNoModal
				show={isDeleteConfirmationOpen}
				content="Are you sure you want to delete bonus?"
				handleYes={() => bonusDeleteHandler()}
				handleClose={() => setDeleteConfirmation(false)}
			/>
		</div>
	);
};

BonusDetail.propTypes = {
	// t: PropTypes.func,
};

BonusDetail.defaultProps = {
	t: (string) => string,
};

export default BonusDetail;
