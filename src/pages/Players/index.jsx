import React from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	CardBody,
	Col,
	Container,
	Modal,
	ModalBody,
	ModalHeader,
	Row,
} from 'reactstrap';
import { useSelector } from 'react-redux';
import TableContainer from '../../components/Common/Table';
import Breadcrumb from '../../components/Common/Breadcrumb';
import usePlayersListing from './hooks/usePlayersListing';
import { projectName } from '../../constants/config';
import CrudSection from '../../components/Common/CrudSection';
import useFilters from './hooks/useFilters';
import Filters from '../../components/Common/Filters';
import ManageMoney from '../PlayerDetails/modals/ManageMoney';
import BulkUpdatePlayers from './BulkUpdatePlayers';

const PlayersList = ({ userIds, toggleUserId, customContainerClass }) => {
	// userIds and toggleUserId can be used while importing player page on another form like in notify player.
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
		currentPage,
		setCurrentPage,
		totalPlayerPages,
		isPlayersLoading,
		formattedPlayers,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
		showManageMoney,
		setShowManageMoney,
		buttonList,
		isOpen,
		setIsOpen,
		selectedPlayers,
		onSuccess,
	} = usePlayersListing(filterValidation.values, userIds, toggleUserId);
	return (
		<div className={userIds ? '' : 'page-content'}>
			<Container fluid>
				{/* Render Breadcrumb */}
				{!userIds && showBreadcrumb ? (
					<Breadcrumb title="Player" breadcrumbItem="Players" />
				) : null}
				<Row>
					<Col lg="12">
						<Card>
							{!userIds ? (
								<CrudSection buttonList={buttonList} title="Players" />
							) : null}
							<CardBody className={`${customContainerClass}`}>
								<Filters
									validation={filterValidation}
									filterFields={filterFields}
									actionButtons={actionButtons}
									isAdvanceOpen={isAdvanceOpen}
									toggleAdvance={toggleAdvance}
									isFilterChanged={isFilterChanged}
								/>
								<TableContainer
									isLoading={isPlayersLoading}
									columns={columns}
									data={formattedPlayers}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									// paginationDiv="col-sm-12 col-md-7"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalPlayerPages}
									isManualPagination
									onChangePagination={setCurrentPage}
									currentPage={currentPage}
									changeRowsPerPageCallback={onChangeRowsPerPage}
									isShowColSettings={!userIds}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<ManageMoney
				show={!!showManageMoney}
				toggle={() => setShowManageMoney('')}
				playerId={showManageMoney}
			/>
			<Modal
				isOpen={isOpen}
				toggle={() => {
					setIsOpen((prev) => !prev);
				}}
				className="col-md-12"
				backdrop="static"
				size="xl"
			>
				<ModalHeader
					toggle={() => {
						setIsOpen((prev) => !prev);
					}}
					tag="h4"
				>
					{`Update info for selected players (${selectedPlayers?.length})`}
				</ModalHeader>
				<ModalBody>
					<BulkUpdatePlayers
						selectedPlayers={selectedPlayers}
						onSuccess={onSuccess}
					/>
				</ModalBody>
			</Modal>
		</div>
	);
};

PlayersList.propTypes = {
	userIds: PropTypes.objectOf({
		key: PropTypes.string,
	}),
	toggleUserId: PropTypes.func,
	customContainerClass: PropTypes.string,
};

PlayersList.defaultProps = {
	userIds: null,
	toggleUserId: () => {},
	customContainerClass: '',
};

export default PlayersList;
