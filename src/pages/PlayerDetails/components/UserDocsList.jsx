/* eslint-disable array-callback-return */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Card, CardBody, Container } from 'reactstrap';
import TableContainer from '../../../components/Common/TableContainer';
import {
	getDocumentLabel,
	rejectDocument,
	requestDocument,
	verifyDocument,
} from '../../../store/actions';
import { Actionee, Name, Reason, ThumbnailUrl } from './UserDocsListCol';
import { Id, Status } from '../TableCol';
import ActionButtons from '../ActionButtons';
import CrudSection from '../../../components/Common/CrudSection';
import { DOCUMENT_STATUS_TYPES } from '../constants';
import ModalView from '../../../components/Common/Modal';
import { CustomInputField } from '../../../helpers/customForms';

const UserDocsList = ({ userId }) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [showModal, setShowModal] = useState({
		documentLabelId: '',
		show: false,
	});
	const [reason, setReason] = useState('');
	const {
		requestDocument: requestDocuments,
		verifyDocument: verifyDocuments,
		rejectDocument: rejectDocuments,
	} = useSelector((state) => state.UserDetails);
	const { documentLabels, documentLabelsLoading } = useSelector(
		(state) => state.SASettings
	);

	const formattedKycLabels = useMemo(() => {
		if (documentLabels?.documentLabels?.length > 0) {
			return documentLabels?.documentLabels?.map((label) => ({
				id: label?.id,
				name: label?.name,
				url: label?.documents?.[0]?.url || 'Not Provided',
				comment: label?.documents?.[0]?.comment || 'NA',
				actionee: label?.documents?.[0]?.adminUser?.username || 'NA',
				status:
					DOCUMENT_STATUS_TYPES?.find(
						(status) => status.value === label?.documents?.[0]?.status
					)?.label || 'Not Provided',
			}));
		}
		return [];
	}, [documentLabels]);

	const handleRequestDocument = ({ documentLabelId }) => {
		dispatch(
			requestDocument({
				documentLabelId,
				userId,
			})
		);
	};

	const handleVerifyDocument = ({ documentLabelId }) => {
		dispatch(
			verifyDocument({
				userDocumentId: documentLabelId,
				userId,
			})
		);
	};

	const toggleModal = (documentLabelId) => {
		setShowModal((prev) => ({
			documentLabelId,
			show: !prev?.show,
		}));
	};

	const handleRejectDocument = (documentLabelId) => {
		dispatch(
			rejectDocument({
				documentLabelId,
				userId,
				kycStatus: 'false',
				reason,
			})
		);
		toggleModal(documentLabelId);
		setReason('');
	};

	const onChangeRowsPerPage = (value) => {
		setPage(1);
		setItemsPerPage(value);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'DOCUMENT ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'NAME',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <Name value={cell.value} />,
			},
			{
				Header: 'DOCUMENT THUMBNAIL',
				accessor: 'url',
				filterable: true,
				Cell: ({ cell }) => <ThumbnailUrl value={cell.value} />,
			},
			{
				Header: 'REASON',
				accessor: 'comment',
				filterable: true,
				Cell: ({ cell }) => <Reason value={cell.value} />,
			},
			{
				Header: 'ACTIONEE',
				accessor: 'actionee',
				Cell: ({ cell }) => <Actionee value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Action',
				Cell: ({ cell }) => (
					<ActionButtons
						cell={cell}
						handleRequestDocument={handleRequestDocument}
						handleVerifyDocument={handleVerifyDocument}
						toggleModal={toggleModal}
					/>
				),
			},
		],
		[]
	);

	const fetchLabels = () => {
		dispatch(
			getDocumentLabel({
				userId,
			})
		);
	};

	useEffect(() => {
		fetchLabels();
	}, []);

	useEffect(() => {
		if (requestDocuments || verifyDocuments || rejectDocuments) fetchLabels();
	}, [requestDocuments, verifyDocuments, rejectDocuments]);

	return (
		<Container fluid>
			<Card className="p-2">
				<CrudSection buttonList={[]} title="KYC Documents" />
				<CardBody>
					<TableContainer
						isLoading={documentLabelsLoading}
						columns={columns || []}
						data={formattedKycLabels || []}
						isGlobalFilter
						isPagination
						customPageSize={itemsPerPage}
						tableClass="table-bordered align-middle nowrap mt-2"
						paginationDiv="justify-content-center"
						pagination="pagination justify-content-start pagination-rounded"
						totalPageCount={documentLabels?.totalPages || 0}
						isManualPagination
						onChangePagination={setPage}
						currentPage={page}
						changeRowsPerPageCallback={onChangeRowsPerPage}
					/>
					<ModalView
						openModal={showModal.show}
						toggleModal={() =>
							setShowModal((prev) => ({
								...prev,
								show: !prev.show,
							}))
						}
						headerTitle="Reject Document Reason"
						className="modal-dialog"
						hideFooter
					>
						<CustomInputField
							name="reason"
							type="text"
							onChange={(e) => {
								setReason(e?.target?.value);
							}}
							placeholder="Enter Reject Document Reason"
							validate={{ required: { value: true } }}
							value={reason}
						/>
						<Button
							color="primary"
							className="mt-2 float-end"
							onClick={() => handleRejectDocument(showModal?.documentLabelId)}
						>
							Submit
						</Button>
					</ModalView>
				</CardBody>
			</Card>
		</Container>
	);
};

export default UserDocsList;
