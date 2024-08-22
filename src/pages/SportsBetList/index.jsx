import React from 'react';
import PropTypes from 'prop-types';
import { Container } from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useSportsBetListing from './hooks/useSportsBetListing';
import { projectName } from '../../constants/config';
import useFilters from './hooks/useFilters';
import ModalView from '../../components/Common/Modal';

const SportsBetList = ({ userId }) => {
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

	const { filterValidation, filterComponent, selectedFiltersComponent } =
		useFilters(userId);

	const {
		currentPage,
		setCurrentPage,
		totalSportsBetCount,
		isSportsBetLoading,
		formattedSportsBet,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		viewModal,
		setViewModal,
		formattedBetSlips,
		betSlipColumns,
		actionList,
	} = useSportsBetListing(filterValidation.values, userId);

	return (
		<div className={`${userId ? '' : 'page-content'}`}>
			<Container fluid>
				{/* Render Breadcrumb */}
				{showBreadcrumb && !userId && (
					<Breadcrumb title="Reports" breadcrumbItem="Sports Bets" />
				)}

				<TableContainer
					isLoading={isSportsBetLoading}
					columns={columns}
					data={formattedSportsBet}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					totalPageCount={totalSportsBetCount}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					filterComponent={filterComponent}
					selectedFiltersComponent={selectedFiltersComponent}
					actionList={actionList}
					changeRowsPerPageCallback={onChangeRowsPerPage}
				/>
				<ModalView
					openModal={viewModal}
					toggleModal={() => setViewModal(!viewModal)}
					headerTitle="Bet Slips"
					className="modal-dialog modal-xl"
					hideFooter
				>
					<TableContainer
						isLoading={false}
						columns={betSlipColumns || []}
						data={formattedBetSlips}
						customPageSize={50}
						isShowColSettings={false}
					/>
				</ModalView>
			</Container>
		</div>
	);
};

SportsBetList.defaultProps = {
	userId: '',
};

SportsBetList.propTypes = {
	userId: PropTypes.string,
};

export default SportsBetList;
