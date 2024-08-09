/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useMemo, useState } from 'react';
import { Card, CardBody, Container } from 'reactstrap';
import TableContainer from '../../components/Common/Table';
import { Comment, Id, KeyValueCell, KeyValueCellNA } from './TableCol';
import FormModal from '../../components/Common/FormModal';
import useCreateComment from './hooks/useCreateComment';
import CrudSection from '../../components/Common/CrudSection';
import { formPageTitle } from '../../components/Common/constants';
import ConfirmationModal from '../../components/Common/ConfirmationModal';
import { ICON_CLASS, TEXT_COLORS } from '../../utils/constant';
import Actions from '../../components/Common/Actions';

const Notes = ({ userDetails, userId }) => {
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	const [userComment, setUserComment] = useState(
		userDetails?.userComment || []
	);

	useEffect(() => {
		setUserComment(userDetails?.userComment ? [userDetails?.userComment] : []);
	}, [userDetails?.userComment]);

	const {
		isOpen,
		setIsOpen,
		formFields,
		header,
		validation,
		isCreateCommentLoading,
		showModal,
		setShowModal,
		handleUpdateClick,
		handleAddClick,
		handleDelete,
	} = useCreateComment({ userId });

	const actionsList = [
		{
			actionName: 'Edit',
			actionHandler: handleUpdateClick,
			isHidden: false,
			icon: ICON_CLASS.edit,
			iconColor: TEXT_COLORS.primary,
		},
		{
			actionName: 'Delete',
			actionHandler: handleDelete,
			isHidden: false,
			icon: ICON_CLASS.delete,
			iconColor: TEXT_COLORS.danger,
		},
	];

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
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
				accessor: 'commenterId',
				Cell: ({ cell }) => <KeyValueCell value={cell.value} />,
			},
			// {
			// 	Header: 'NOTED AT',
			// 	accessor: 'createdAt',
			// 	Cell: ({ cell }) => <KeyValueCell value={(cell.value)} />,
			// },
			{
				Header: 'ACTION',
				disableSortBy: true,
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[userComment]
	);

	const buttonList = useMemo(() => {
		let list = [];
		if (!userComment?.length) {
			list = [
				{
					label: 'Add Note',
					handleClick: handleAddClick,
					link: '#!',
				},
			];
		}
		return list;
	}, [userComment]);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	return (
		<Container fluid>
			<Card className="p-2">
				<CrudSection buttonList={buttonList} title="Notes" />
				<CardBody>
					<TableContainer
						isLoading={false}
						columns={columns || []}
						data={userComment || []}
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						// paginationDiv="col-sm-12 col-md-7"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={1}
						isManualPagination
						onChangePagination={setCurrentPage}
						currentPage={currentPage}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
				</CardBody>
				<FormModal
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					showConfirmationModal={showModal}
					setShowConfirmationModal={setShowModal}
					isEditOpen={false}
					header={header}
					validation={validation}
					formFields={formFields}
					submitLabel="Submit"
					customColClasses="col-md-12"
					isSubmitLoading={isCreateCommentLoading}
				/>
				<ConfirmationModal
					openModal={showModal}
					setOpenModal={setShowModal}
					validation={validation}
					pageType={formPageTitle.notes}
				/>
			</Card>
		</Container>
	);
};

export default Notes;
