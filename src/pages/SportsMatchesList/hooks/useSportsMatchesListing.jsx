/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	fetchSportsMatchesStart,
	resetSportsMatchesData,
	// updateFeaturedMatchStart,
} from '../../../store/actions';
import { getDateTime } from '../../../utils/dateFormatter';
import {
	Id,
	// IsFeatured,
	// Live,
	Sport,
	FromDate,
	Status,
	Title,
	Tournament,
} from '../SportsMatchesListCol';
import { iconClass } from '../../../utils/constant';
import Actions from '../../../components/Common/Actions';

const useSportsMatchesListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const {
		sportsMatches,
		loading: isSportsMatchesLoading,
		// isFeaturedUpdateLoading,
		// featuredFabData,
	} = useSelector((state) => state.SportsMatches);

	const onChangeRowsPerPage = (value) => {
		setCurrentPage(1);
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchSportsMatchesStart({
				perPage: itemsPerPage,
				page: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting sports matches redux state
	useEffect(() => () => dispatch(resetSportsMatchesData()), []);

	const formattedSportsMatches = useMemo(() => {
		const formattedValues = [];
		if (sportsMatches) {
			sportsMatches?.events?.map((match) =>
				formattedValues.push({
					...match,
					title: `${match?.eventParticipants?.[0]?.participant?.name} vs ${match?.eventParticipants?.[1]?.participant?.name}`,
					tournamentName: match?.league?.name,
					sportName: match?.league?.sport?.name,
					fromDate: getDateTime(match.fromDate),
				})
			);
		}
		return formattedValues;
	}, [sportsMatches]);
	// const toggleIsFeatured = (event, cell) => {
	// 	const data = {
	// 		isFeatured: (!event.target.checked).toString(),
	// 		providerMatchId: cell.row.original.providerId,
	// 		matchId: cell.row.original.id,
	// 	};
	// 	dispatch(updateFeaturedMatchStart(data));
	// };

	const handleViewClick = ({ id }) => navigate(`/match/${id}`);

	const actionsList = [
		{
			actionName: 'Match Detail',
			actionHandler: handleViewClick,
			isHidden: false,
			icon: iconClass.view,
			iconColor: 'text-success',
		},
	];

	const columns = useMemo(
		() => [
			// {
			// 	Header: 'IS FEATURED',
			// 	accessor: 'bettingEnabled',
			// 	disableSortBy: true,
			// 	Cell: ({ cell }) => (
			// 		<IsFeatured
			// 			toggleIsFeatured={toggleIsFeatured}
			// 			isFeaturedUpdateLoading={isFeaturedUpdateLoading}
			// 			featuredFabData={featuredFabData}
			// 			cell={cell}
			// 		/>
			// 	),
			// },
			{
				Header: 'Id',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <Id value={cell.value} />,
			},
			{
				Header: 'Title',
				accessor: 'title',
				filterable: true,
				Cell: ({ cell }) => <Title cell={cell} />,
			},
			{
				Header: 'Tournament',
				accessor: 'tournamentName',
				filterable: true,
				Cell: ({ cell }) => <Tournament value={cell.value} />,
			},
			{
				Header: 'Sport',
				accessor: 'sportName',
				filterable: true,
				Cell: ({ cell }) => <Sport value={cell.value} />,
			},
			// {
			// 	Header: 'Is Featured',
			// 	accessor: 'isFeatured',
			// 	filterable: true,
			// 	Cell: ({cell}) => <IsFeatured value={cell.value} />,
			// },
			{
				Header: 'Start Date',
				accessor: 'fromDate',
				Cell: ({ cell }) => <FromDate value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			// {
			// 	Header: 'Live',
			// 	accessor: 'isLive',
			// 	Cell: ({ cell }) => <Live value={cell.value} />,
			// },
			{
				Header: 'Actions',
				accessor: 'action',
				disableSortBy: true,
				Cell: ({ cell }) => <Actions cell={cell} actionsList={actionsList} />,
			},
		],
		[]
	);

	return {
		currentPage,
		setCurrentPage,
		totalSportsMatchesCount: sportsMatches?.totalPages,
		isSportsMatchesLoading,
		formattedSportsMatches,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useSportsMatchesListing;
