/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Container } from 'reactstrap';
import TableContainer from '../../../components/Common/TableContainer';
import { getDocumentLabel, getUserDocuments } from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';
import {
	Action,
	ActionAt,
	Actionee,
	DocumentPreview,
	Name,
	Reason,
	UpdatedAt,
} from './UserDocsListCol';
import { Id, Status } from '../TableCol';

const UserDocsList = ({ userId }) => {
	const dispatch = useDispatch();

	const { userDocuments, userDocumentsLoading } = useSelector(
		(state) => state.UserDetails
	);
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
		}
		return formattedValues;
	}, [documentLabels]);

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
				Cell: (cellProps) => <DocumentPreview {...cellProps} />,
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
				Cell: (cellProps) => <Action {...cellProps} />,
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
				Cell: (cellProps) => <Action {...cellProps} />,
			},
		],
		[]
	);

	useEffect(() => {
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
	}, []);

	return (
		<Container fluid className="bg-white">
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
