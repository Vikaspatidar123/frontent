/* eslint-disable array-callback-return */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Container } from 'reactstrap';
import TableContainer from '../../../components/Common/TableContainer';
import {
	acceptUserDocs,
	getDocumentLabel,
	getUserDetails,
	getUserDocuments,
	markDocumentRequired,
	markDocumentRequiredReset,
} from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';
import {
	ActionAt,
	Actionee,
	Name,
	Reason,
	ThumbnailUrl,
	UpdatedAt,
} from './UserDocsListCol';
import { Id, Status } from '../TableCol';
import ActionButtons from '../ActionButtons';
import { getDocumentLabelCall } from '../../../network/getRequests';
import KYCActionButtons from '../KYCActions';

const UserDocsList = ({ userId }) => {
	const dispatch = useDispatch();
	const [docLabels, setDocLabels] = useState('');

	const {
		userDetails,
		userDocuments,
		userDocumentsLoading,
		markDocumentRequiredSuccess,
		acceptUserDocSuccess,
	} = useSelector((state) => state.UserDetails);
	const { documentLabels, documentLabelsLoading } = useSelector(
		(state) => state.SASettings
	);

	const formattedUserDocuments = useMemo(() => {
		const formattedValues = [];
		if (userDocuments) {
			userDocuments.map((doc) =>
				formattedValues.push({
					...doc,
					actionPerformedAt: getDateTime(doc.actionPerformedAt),
					updatedAt: getDateTime(doc.updatedAt),
				})
			);
		}
		return formattedValues;
	}, [userDocuments]);

	const formattedDocumentLabels = useMemo(() => {
		const formattedValues = [];
		if (documentLabels) {
			documentLabels.map((doc) =>
				formattedValues.push({
					...doc,
					name: doc.name.EN,
				})
			);
			if (
				docLabels &&
				docLabels.length &&
				Array.isArray(userDetails?.requestedDocuments)
			) {
				docLabels.map((doc) => {
					if (
						userDetails?.requestedDocuments?.includes(doc.documentLabelId) &&
						!formattedValues.find(
							(val) => val.documentLabelId === doc.documentLabelId
						)
					) {
						formattedValues.push({
							...doc,
							name: doc.name.EN,
							isRequired: true,
						});
					}
				});
			}
		}
		return formattedValues;
	}, [documentLabels, docLabels, userDetails]);

	const fetchAllLabels = async () => {
		await getDocumentLabelCall('').then((res) => {
			setDocLabels(res?.data?.data?.documentLabel);
		});
	};

	useEffect(() => {
		if (!docLabels) {
			fetchAllLabels();
		}
	}, [docLabels]);

	const handleMarkAsRequired = ({
		labelName,
		documentLabelId,
		isRequested,
	}) => {
		dispatch(
			markDocumentRequired({
				labelName,
				documentLabelId,
				userId: parseInt(userId, 10),
				isRequested,
			})
		);
	};

	const acceptOrReject = ({ userDocumentId, status }) => {
		dispatch(
			acceptUserDocs({
				userDocumentId,
				status,
				userId: parseInt(userId, 10),
			})
		);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'DOCUMENT ID',
				accessor: 'userDocumentId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'NAME',
				accessor: 'documentName',
				filterable: true,
				Cell: (cellProps) => <Name {...cellProps} />,
			},
			{
				Header: 'DOCUMENT PREVIEW',
				accessor: 'documentUrl',
				filterable: true,
				Cell: (cellProps) => <ThumbnailUrl {...cellProps} />,
			},
			{
				Header: 'REASON',
				accessor: 'reason',
				filterable: true,
				Cell: (cellProps) => <Reason {...cellProps} />,
			},
			{
				Header: 'UPDATED AT',
				accessor: 'updatedAt',
				filterable: true,
				Cell: (cellProps) => <UpdatedAt {...cellProps} />,
			},
			{
				Header: 'ACTIONEE',
				accessor: 'actionee',
				Cell: (cellProps) => <Actionee {...cellProps} />,
			},
			{
				Header: 'ACTION PERFORMED AT',
				accessor: 'actionPerformedAt',
				Cell: (cellProps) => <ActionAt {...cellProps} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'ACTION',
				Cell: (cellProps) => (
					<KYCActionButtons handleStatus={acceptOrReject} {...cellProps} />
				),
			},
		],
		[]
	);

	const labelColumns = useMemo(
		() => [
			{
				Header: 'NAME',
				accessor: 'name',
				Cell: (cellProps) => <Name {...cellProps} />,
			},

			{
				Header: 'Action',
				Cell: (cellProps) => (
					<ActionButtons {...cellProps} handleStatus={handleMarkAsRequired} />
				),
			},
		],
		[]
	);

	const fetchLabels = () => {
		dispatch(
			getUserDocuments({
				userId,
			})
		);
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
		if (acceptUserDocSuccess) fetchLabels();
	}, [acceptUserDocSuccess]);

	useEffect(() => {
		if (markDocumentRequiredSuccess) {
			fetchLabels();
			setDocLabels('');
			dispatch(markDocumentRequiredReset());
			dispatch(getUserDetails({ userId }));
		}
	}, [markDocumentRequiredSuccess]);

	return (
		<Container fluid>
			<Card className="p-2">
				<TableContainer
					isLoading={userDocumentsLoading}
					columns={columns}
					data={formattedUserDocuments}
					isPagination
					customPageSize={20}
					tableClass="table-bordered align-middle nowrap mt-2"
				/>
			</Card>
			<Card className="p-2">
				<h4 className="text-center">Request Documents</h4>
				<TableContainer
					isLoading={documentLabelsLoading}
					columns={labelColumns}
					data={formattedDocumentLabels}
					isPagination
					customPageSize={20}
					tableClass="table-bordered align-middle nowrap mt-2"
				/>
			</Card>
		</Container>
	);
};

export default UserDocsList;
