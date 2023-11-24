/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { getWageringTemplateDetail } from '../../../store/actions';
import {
	CustomInputField,
	CustomSelectField,
} from '../../../helpers/customForms';
import TableContainer from '../../../components/Common/TableContainer';

const KeyValueCell = ({ cell }) => (cell.value ? cell.value : '');

const columns = [
	{
		Header: 'NAME',
		accessor: 'name',
		disableSortBy: true,
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'RTP',
		accessor: 'rtp',
		disableSortBy: true,
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
	{
		Header: 'WAGERING CONTRIBUTION',
		accessor: 'contribution',
		disableSortBy: true,
		Cell: ({ cell }) => <KeyValueCell cell={cell} />,
	},
];

const WageringContribution = ({
	nextPressed,
	setActiveTab,
	setNextPressed,
	setAllFields,
	bonusDetails,
	isEdit,
}) => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [searchText, setSearchText] = useState('');
	const [selectedTemplate, setSelectedTemplate] = useState('');
	const {
		allSAWageringTemplates,
		SAWageringTemplateLoading,
		SAWageringTemplate,
	} = useSelector((state) => state.WageringTemplate);

	useEffect(() => {
		if (bonusDetails) {
			setSelectedTemplate(bonusDetails?.wageringTemplateId);
		}
	}, [bonusDetails]);

	useEffect(() => {
		if (nextPressed.currentTab === 'wageringContribution') {
			setAllFields((prev) => ({
				...prev,
				selectedTemplateId: selectedTemplate,
			}));
			setActiveTab(nextPressed.nextTab);
			window.scrollTo(0, 0);
			setNextPressed({});
		}
	}, [nextPressed]);

	const wageringTemplateOptions = useMemo(() => {
		if (allSAWageringTemplates?.length) {
			return allSAWageringTemplates.map((template) => ({
				optionLabel: template.name,
				value: template.wageringTemplateId,
			}));
		}
		return [];
	}, [allSAWageringTemplates]);

	useEffect(() => {
		if (allSAWageringTemplates?.length && !isEdit) {
			setSelectedTemplate(allSAWageringTemplates[0].wageringTemplateId);
		}
	}, [allSAWageringTemplates, isEdit]);

	useEffect(() => {
		if (selectedTemplate) {
			dispatch(
				getWageringTemplateDetail({
					wageringTemplateId: selectedTemplate,
					pageNo: currentPage,
					search: searchText,
					limit: itemsPerPage,
				})
			);
		}
	}, [searchText, selectedTemplate, currentPage, itemsPerPage]);

	const formattedWageringTemplates = useMemo(() => {
		if (SAWageringTemplate) {
			return SAWageringTemplate?.gameDetail?.rows.map((item) => ({
				...item,
				rtp: `${item.returnToPlayer} %`,
				contribution: `${item.wageringContribution} %`,
			}));
		}
		return [];
	}, [SAWageringTemplate]);

	return (
		<Row>
			<Col sm="6" className="mb-3">
				<CustomSelectField
					label="Wagering Template"
					type="select"
					onChange={(e) => {
						setSelectedTemplate(e.target.value);
					}}
					placeholder="Select Wagering Template"
					value={selectedTemplate}
					options={
						<>
							<option value={null} selected disabled>
								Select Wagering Template
							</option>
							{wageringTemplateOptions?.map(({ optionLabel, value }) => (
								<option key={value} value={value}>
									{optionLabel}
								</option>
							))}
						</>
					}
				/>
			</Col>
			<Col sm="6" className="mb-3">
				<CustomInputField
					label="Search"
					onChange={(e) => {
						setSearchText(e.target.value);
					}}
					placeholder="Enter Game Name"
					value={searchText}
				/>
			</Col>
			<Col lg="12" className="mb-3">
				<TableContainer
					isLoading={SAWageringTemplateLoading}
					columns={columns}
					data={formattedWageringTemplates}
					isPagination
					customPageSize={itemsPerPage}
					tableClass="table-bordered align-middle nowrap mt-2"
					// paginationDiv="col-sm-12 col-md-7"
					paginationDiv="justify-content-center"
					pagination="pagination justify-content-start pagination-rounded"
					totalPageCount={SAWageringTemplate?.gameDetail?.count}
					isManualPagination
					onChangePagination={setCurrentPage}
					currentPage={currentPage}
					changeRowsPerPageCallback={setItemsPerPage}
				/>
			</Col>
		</Row>
	);
};

export default WageringContribution;
