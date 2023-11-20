/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import { Comment, Id, KeyValueCell, KeyValueCellNA } from './TableCol';
import { getUserComments, resolveUserComment } from '../../store/actions';
import { getDateTime } from '../../utils/dateFormatter';
import FormModal from '../../components/Common/FormModal';
import useCreateComment from './hooks/useCreateComment';
import CrudSection from '../../components/Common/CrudSection';
import useCommentFilter from './hooks/useCommentFilter';
import Filters from '../../components/Common/Filters';
import CommentActionButtons from './CommentActions';

const Notes = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const {
		userComments,
		userCommentsLoading,
		createUserCommentsSuccess,
		resolveUserCommentSuccess,
	} = useSelector((state) => state.UserDetails);

	const formattedUserBonus = useMemo(() => {
		const formattedValues = [];
		if (userComments) {
			userComments?.rows?.map((comment) =>
				formattedValues.push({
					...comment,
					createdAt: getDateTime(comment.createdAt),
					status: comment.status ? 'Active' : 'Resolved' || 'NA',
				})
			);
		}
		return formattedValues;
	}, [userComments]);

	const fetchData = () => {
		dispatch(
			getUserComments({
				limit: itemsPerPage,
				pageNo: currentPage,
				userId,
			})
		);
	};

	useEffect(() => {
		if (createUserCommentsSuccess || resolveUserCommentSuccess) fetchData();
	}, [createUserCommentsSuccess, resolveUserCommentSuccess]);

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	const handleStatus = ({ commentId, isActive }) => {
		dispatch(
			resolveUserComment({
				commentId,
				status: isActive,
				userId,
			})
		);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'commentId',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'TITLE',
				accessor: 'title',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCellNA value={cell.value} />,
			},
			{
				Header: 'NOTE',
				accessor: 'comment',
				filterable: true,
				Cell: ({ cell }) => <Comment value={cell.value} />,
			},
			{
				Header: 'NOTED BY',
				accessor: 'commentedBy',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCellNA value={cell.value} />,
			},
			{
				Header: 'ROLE',
				accessor: 'role',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'NOTED AT',
				accessor: 'createdAt',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			{
				Header: 'ACTION',
				disableSortBy: true,
				Cell: ({ cell }) => (
					<CommentActionButtons handleStatus={handleStatus} cell={cell} />
				),
			},
		],
		[]
	);

	const {
		toggleAdvance,
		isAdvanceOpen,
		filterFields,
		actionButtons,
		filterValidation,
		isFilterChanged,
	} = useCommentFilter();

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateCommentLoading,
		buttonList,
	} = useCreateComment({ userId });

	return (
		<Container fluid>
			<Card className="p-2">
				<CrudSection buttonList={buttonList} title="Notes" />
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
						isLoading={userCommentsLoading}
						columns={columns}
						data={formattedUserBonus}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={userComments?.count}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
				</CardBody>
				<FormModal
					isOpen={isOpen}
					toggle={() => setIsOpen((prev) => !prev)}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateCommentLoading}
				/>
			</Card>
		</Container>
	);
};

export default Notes;
