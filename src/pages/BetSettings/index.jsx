/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import {
	Card,
	CardBody,
	Col,
	Container,
	Row,
	Button,
	UncontrolledTooltip,
} from 'reactstrap';
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
import Breadcrumb from '../../components/Common/Breadcrumb';
import useCreateBetSettings from './hooks/useCreateBetSettings';
import FormModal from '../../components/Common/FormModal';
import CrudSection from '../../components/Common/CrudSection';
import usePermission from '../../components/Common/Hooks/usePermission';
import { modules } from '../../constants/permissions';

const computeColumns = ({ onClickEdit }) => [
	{
		Header: 'ID',
		accessor: 'betSettingId',
		filterable: true,
		Cell: ({ cell }) => <BetSettingId value={cell.value} />,
	},
	{
		Header: 'SPORTS NAME',
		accessor: 'sportsName',
		filterable: true,
		Cell: ({ cell }) => <SportsName value={cell.value} />,
	},
	{
		Header: 'MAX BET AMOUNT',
		accessor: 'maxBetAmount',
		filterable: true,
		Cell: ({ cell }) => <MaxBetAmount value={cell.value} />,
	},
	{
		Header: 'MIN BET AMOUNT',
		accessor: 'minBetAmount',
		filterable: true,
		Cell: ({ cell }) => <MinBetAmount value={cell.value} />,
	},
	{
		Header: 'MAX BET COUNT',
		accessor: 'maxBetCount',
		filterable: true,
		Cell: ({ cell }) => <MaxBetCount value={cell.value} />,
	},
	{
		Header: 'MAX WIN AMOUNT',
		accessor: 'maxWinAmount',
		disableFilters: true,
		Cell: ({ cell }) => <MaxWinAmount value={cell.value} />,
	},
	{
		Header: 'CASHOUT PERCENTAGE',
		accessor: 'cashoutPercentage',
		disableFilters: true,
		Cell: ({ cell }) => <CashoutPercentage value={cell.value} />,
	},
	{
		Header: 'MIN ODD LIMIT',
		accessor: 'minOddLimit',
		disableFilters: true,
		Cell: ({ cell }) => <MinOddLimit value={cell.value} />,
	},
	{
		Header: 'MAX ODD LIMIT',
		accessor: 'maxOddLimit',
		disableFilters: true,
		Cell: ({ cell }) => <MaxOddLimit value={cell.value} />,
	},
	{
		Header: 'MAX EVENT COUNT',
		accessor: 'maxEventCount',
		disableFilters: true,
		Cell: ({ cell }) => <MaxEventCount value={cell.value} />,
	},
	{
		Header: 'MAX MARKET OUTCOME COUNT',
		accessor: 'maxMarketOutcomeCount',
		disableFilters: true,
		Cell: ({ cell }) => <MaxMarketOutcomeCount value={cell.value} />,
	},
	{
		Header: 'UPDATED AT',
		accessor: 'updatedAt',
		disableFilters: true,
		Cell: ({ cell }) => <UpdatedAt value={cell.value} />,
	},
	{
		Header: 'Action',
		accessor: 'action',
		disableFilters: true,
		disableSortBy: true,
		Cell: ({ cell }) => {
			const { isGranted } = usePermission();
			return (
				<Button
					hidden={!isGranted(modules.BetSettings, 'U')}
					onClick={(e) => {
						e.preventDefault();
						onClickEdit(cell?.row?.original);
					}}
					className="btn btn-sm btn-soft-info"
				>
					<i className="mdi mdi-pencil-outline" id={`edit-${cell?.row?.id}`} />
					<UncontrolledTooltip placement="top" target={`edit-${cell?.row?.id}`}>
						Edit
					</UncontrolledTooltip>
				</Button>
			);
		},
	},
];

const BetSettings = () => {
	// meta title
	document.title = projectName;
	const showBreadcrumb = useSelector((state) => state.Layout.showBreadcrumb);

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
				{showBreadcrumb && (
					<Breadcrumb title="Sports Book" breadcrumbItem="Bet Settings" />
				)}
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
