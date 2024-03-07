/* eslint-disable array-callback-return */
/* eslint-disable no-inner-declarations */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
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
import NoDataFound from '../../../components/Common/NoDataFound';

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
			userDocuments.rows?.map((doc) =>
				formattedValues.push({
					...doc,
					createdAt: getDateTime(doc?.createdAt),
					updatedAt: getDateTime(doc?.updatedAt),
				})
			);
		}
		return formattedValues;
	}, [userDocuments]);

	const formattedDocumentLabels = useMemo(() => {
		const formattedValues = [];
		if (documentLabels) {
			documentLabels.rows?.map((doc) =>
				formattedValues.push({
					...doc,
					name: doc?.documentLabel?.name,
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
							name: doc?.documentLabel?.name,
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
				accessor: 'documentLabelId',
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
				Header: 'DOCUMENT PREVIEW',
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
				Header: 'UPDATED AT',
				accessor: 'updatedAt',
				filterable: true,
				Cell: ({ cell }) => <UpdatedAt value={cell.value} />,
			},
			{
				Header: 'ACTIONEE',
				accessor: 'actionee',
				Cell: ({ cell }) => <Actionee value={cell.value} />,
			},
			{
				Header: 'ACTION PERFORMED AT',
				accessor: 'createdAt',
				Cell: ({ cell }) => <ActionAt value={cell.value} />,
			},
			{
				Header: 'STATUS',
				accessor: 'status',
				disableSortBy: true,
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			// {
			// 	Header: 'ACTION',
			// 	disableSortBy: true,
			// 	Cell: ({ cell }) => (
			// 		<KYCActionButtons handleStatus={acceptOrReject} cell={cell} />
			// 	),
			// },
		],
		[]
	);

	const labelColumns = useMemo(
		() => [
			{
				Header: 'NAME',
				accessor: 'name',
				Cell: ({ cell }) => <Name value={cell.value} />,
			},

			// {
			// 	Header: 'Action',
			// 	Cell: ({ cell }) => (
			// 		<ActionButtons cell={cell} handleStatus={handleMarkAsRequired} />
			// 	),
			// },
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
			dispatch(getUserDetails({ playerId: userId }));
		}
	}, [markDocumentRequiredSuccess]);

	return (
		<Container fluid>
			{formattedDocumentLabels?.length && formattedUserDocuments?.length ? (
				<>
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
						<h4 className="text-center">Re-Request Documents</h4>
						<TableContainer
							isLoading={documentLabelsLoading}
							columns={labelColumns}
							data={formattedDocumentLabels}
							isPagination
							customPageSize={20}
							tableClass="table-bordered align-middle nowrap mt-2"
						/>
					</Card>
				</>
			) : (
				<NoDataFound height="400px" width="500px" />
			)}
		</Container>
	);
};

export default UserDocsList;
