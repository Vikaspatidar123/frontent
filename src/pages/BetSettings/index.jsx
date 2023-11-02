/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, CardBody, Col, Container, Row } from 'reactstrap';
import TableContainer from '../../components/Common/TableContainer';
import useBetSettings from './hooks/useBetSettings';
import { projectName } from '../../constants/config';

import {
	BetSettingId,
	SportsName,
	MaxBetAmount,
	MinBetAmount,
	MaxBetCount,
	MaxWinAmount,
	CashoutPercentage,
	MinOddLimit,
	MaxOddLimit,
	MaxEventCount,
	MaxMarketOutcomeCount,
	UpdatedAt,
} from './BetSettingsListCol';
import ActionButtons from './ActionButtons';
import Breadcrumb from '../../components/Common/Breadcrumb';
import useCreateBetSettings from './hooks/useCreateBetSettings';
import FormModal from '../../components/Common/FormModal';
import CrudSection from '../../components/Common/CrudSection';

const computeColumns = ({ onClickEdit }) => [
	{
		Header: 'ID',
		accessor: 'betSettingId',
		filterable: true,
		Cell: ({ cell }) => <BetSettingId cell={cell} />,
	},
	{
		Header: 'SPORTS NAME',
		accessor: 'sportsName',
		filterable: true,
		Cell: ({ cell }) => <SportsName cell={cell} />,
	},
	{
		Header: 'MAX BET AMOUNT',
		accessor: 'maxBetAmount',
		filterable: true,
		Cell: ({ cell }) => <MaxBetAmount cell={cell} />,
	},
	{
		Header: 'MIN BET AMOUNT',
		accessor: 'minBetAmount',
		filterable: true,
		Cell: ({ cell }) => <MinBetAmount cell={cell} />,
	},
	{
		Header: 'MAX BET COUNT',
		accessor: 'maxBetCount',
		filterable: true,
		Cell: ({ cell }) => <MaxBetCount cell={cell} />,
	},
	{
		Header: 'MAX WIN AMOUNT',
		accessor: 'maxWinAmount',
		disableFilters: true,
		Cell: ({ cell }) => <MaxWinAmount cell={cell} />,
	},
	{
		Header: 'CASHOUT PERCENTAGE',
		accessor: 'cashoutPercentage',
		disableFilters: true,
		Cell: ({ cell }) => <CashoutPercentage cell={cell} />,
	},
	{
		Header: 'MIN ODD LIMIT',
		accessor: 'minOddLimit',
		disableFilters: true,
		Cell: ({ cell }) => <MinOddLimit cell={cell} />,
	},
	{
		Header: 'MAX ODD LIMIT',
		accessor: 'maxOddLimit',
		disableFilters: true,
		Cell: ({ cell }) => <MaxOddLimit cell={cell} />,
	},
	{
		Header: 'MAX EVENT COUNT',
		accessor: 'maxEventCount',
		disableFilters: true,
		Cell: ({ cell }) => <MaxEventCount cell={cell} />,
	},
	{
		Header: 'MAX MARKET OUTCOME COUNT',
		accessor: 'maxMarketOutcomeCount',
		disableFilters: true,
		Cell: ({ cell }) => <MaxMarketOutcomeCount cell={cell} />,
	},
	{
		Header: 'UPDATED AT',
		accessor: 'updatedAt',
		disableFilters: true,
		Cell: ({ cell }) => <UpdatedAt cell={cell} />,
	},
	{
		Header: 'Action',
		accessor: 'action',
		disableFilters: true,
		Cell: ({ cell }) => <ActionButtons cell={cell} onClickEdit={onClickEdit} />,
	},
];

const BetSettings = () => {
	// meta title
	document.title = projectName;

	const {
		formattedBetSettingsList,
		isLoading,
		totalBetCount,
		page,
		setPage,
		itemsPerPage,
		onChangeRowsPerPage,
	} = useBetSettings();

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateBetSettingsLoading,
		buttonList,
		onClickEdit,
	} = useCreateBetSettings();

	const columns = useMemo(() => computeColumns({ onClickEdit }), []);

	return (
		<div className="page-content">
			<Container fluid>
				<Breadcrumb title="Sports Book" breadcrumbItem="Bet Settings" />
				<Row>
					<Col lg="12">
						<Card>
							<CrudSection buttonList={buttonList} title="Bet Settings" />
							<CardBody>
								<TableContainer
									columns={columns}
									data={formattedBetSettingsList}
									isPagination
									customPageSize={itemsPerPage}
									tableClass="table-bordered align-middle nowrap mt-2"
									paginationDiv="justify-content-center"
									pagination="pagination justify-content-start pagination-rounded"
									totalPageCount={totalBetCount}
									isManualPagination
									onChangePagination={setPage}
									currentPage={page}
									isLoading={!isLoading}
									changeRowsPerPageCallback={onChangeRowsPerPage}
									thCustomClass="table-light"
								/>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<FormModal
					isOpen={isOpen}
					toggle={() => setIsOpen((prev) => !prev)}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateBetSettingsLoading}
				/>
			</Container>
		</div>
	);
};

export default BetSettings;
