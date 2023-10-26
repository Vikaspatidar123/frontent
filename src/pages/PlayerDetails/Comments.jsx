/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, Container } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import TableContainer from '../../components/Common/TableContainer';
import { Action, Comment, Id, KeyValueCell, KeyValueCellNA } from './TableCol';
import { getUserComments } from '../../store/actions';
import { getDateTime } from '../../utils/dateFormatter';
import FormModal from '../../components/Common/FormModal';
import useCreateComment from './hooks/useCreateComment';
import CrudSection from '../../components/Common/CrudSection';

const Comments = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const { userComments, userCommentsLoading, createUserCommentsSuccess } =
		useSelector((state) => state.UserDetails);

	const formattedUserBonus = useMemo(() => {
		const formattedValues = [];
		if (userComments) {
			userComments.rows.map((comment) =>
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
		if (createUserCommentsSuccess) fetchData();
	}, [createUserCommentsSuccess]);

	useEffect(() => {
		fetchData();
	}, [currentPage, itemsPerPage]);

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'commentId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'TITLE',
				accessor: 'title',
				filterable: true,
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'COMMENT',
				accessor: 'comment',
				filterable: true,
				Cell: (cellProps) => <Comment {...cellProps} />,
			},
			{
				Header: 'COMMENTED BY',
				accessor: 'commentedBy',
				filterable: true,
				Cell: (cellProps) => <KeyValueCellNA {...cellProps} />,
			},
			{
				Header: 'ROLE',
				accessor: 'role',
				filterable: true,
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'COMMENTED AT',
				accessor: 'createdAt',
				Cell: (cellProps) => <KeyValueCell {...cellProps} />,
			},
			{
				Header: 'ACTION',
				Cell: (cellProps) => <Action {...cellProps} />,
			},
		],
		[]
	);

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
		<Container fluid className="bg-white">
			<Card className="p-2">
				<CrudSection buttonList={buttonList} />
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

export default Comments;
