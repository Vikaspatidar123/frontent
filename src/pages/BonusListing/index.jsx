/* eslint-disable react/prop-types */
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import TableContainer from '../../components/Common/TableContainer';
import { projectName } from '../../constants/config';

import {
	BonusId,
	Title,
	BonusType,
	ValidTill,
	IsExpired,
	IsClaimed,
	Status,
} from './BonusListCol';
import ActionButtons from './ActionButtons';
import useBonsuListing from './hooks/useBonusListing';
import CrudSection from '../../components/Common/CrudSection';

const columns = [
	{
		Header: 'ID',
		accessor: 'bonusId',
		filterable: true,
		Cell: ({ cell }) => <BonusId cell={cell} />,
	},
	{
		Header: 'TITLE',
		accessor: 'title',
		filterable: true,
		Cell: ({ cell }) => <Title cell={cell} />,
	},
	{
		Header: 'BONUS TYPE',
		accessor: 'bonusType',
		filterable: true,
		Cell: ({ cell }) => <BonusType cell={cell} />,
	},
	{
		Header: 'VALID TILL',
		accessor: 'validTill',
		filterable: true,
		Cell: ({ cell }) => <ValidTill cell={cell} />,
	},
	{
		Header: 'IS EXPIRED',
		accessor: 'isExpired',
		filterable: true,
		Cell: ({ cell }) => <IsExpired cell={cell} />,
	},
	{
		Header: 'IS CLAIMED',
		accessor: 'isClaimed',
		filterable: true,
		Cell: (cell) => <IsClaimed cell={cell} />,
	},
	{
		Header: 'STATUS',
		accessor: 'isActive',
		disableFilters: true,
		Cell: (cell) => <Status cell={cell} />,
	},
	{
		Header: 'ACTION',
		accessor: 'action',
		disableFilters: true,
		Cell: () => <ActionButtons />,
	},
];

const BonusDetail = ({ t }) => {
	// meta title
	document.title = projectName;

	const {
		formattedBonusDetails,
		isLoading,
		page,
		setPage,
		totalBonusCount,
		itemsPerPage,
	} = useBonsuListing();

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumbs
					title={t('Bonus Management')}
					breadcrumbItem={t('Bonus')}
				/>

				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={[]} title="Bonus Listing" />
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedBonusDetails}
									isGlobalFilter
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalBonusCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isLoading}
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

BonusDetail.propTypes = {
	t: PropTypes.func,
};

BonusDetail.defaultProps = {
	t: (string) => string,
};

export default BonusDetail;
