/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	fetchSportsMatchesStart,
	resetSportsMatchesData,
	updateFeaturedMatchStart,
} from '../../../store/actions';
import { getDateTime } from '../../../helpers/dateFormatter';
import {
	Action,
	Id,
	IsFeatured,
	Live,
	Sport,
	StartDate,
	Status,
	Title,
	Tournament,
} from '../SportsMatchesListCol';

const useSportsMatchesListing = (filterValues = {}) => {
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);
	const {
		sportsMatches,
		loading: isSportsMatchesLoading,
		isFeaturedUpdateLoading,
		featuredFabData,
	} = useSelector((state) => state.SportsMatches);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	useEffect(() => {
		dispatch(
			fetchSportsMatchesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
				...filterValues,
			})
		);
	}, [currentPage, itemsPerPage]);

	// resetting sports matches redux state
	useEffect(() => () => dispatch(resetSportsMatchesData()), []);

	const formattedSportsMatches = useMemo(() => {
		const formattedValues = [];
		if (sportsMatches) {
			sportsMatches.rows.map((match) =>
				formattedValues.push({
					...match,
					title: `${match?.teams?.[0]?.team?.teamName?.[0]?.name} vs ${match?.teams?.[1]?.team?.teamName?.[0]?.name}`,
					tournamentName: match.tournaments.tournamentName[0].name,
					sportName: match.sportCountry.sport.sportName[0].name,
					startDate: getDateTime(match.matchDate),
				})
			);
		}
		return formattedValues;
	}, [sportsMatches]);
	const toggleIsFeatured = (event, cell) => {
		const data = {
			isFeatured: (!event.target.checked).toString(),
			providerMatchId: cell.row.original.providerMatchId,
			matchId: cell.row.original.matchId,
		};
		dispatch(updateFeaturedMatchStart(data));
	};

	const columns = useMemo(
		() => [
			{
				Header: 'IS FEATURED',
				accessor: 'isFeatured',
				disableSortBy: true,
				Cell: ({ cell }) => (
					<IsFeatured
						toggleIsFeatured={toggleIsFeatured}
						isFeaturedUpdateLoading={isFeaturedUpdateLoading}
						featuredFabData={featuredFabData}
						cell={cell}
					/>
				),
			},
			{
				Header: 'Id',
				accessor: 'matchId',
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
				accessor: 'startDate',
				Cell: ({ cell }) => <StartDate value={cell.value} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: ({ cell }) => <Status value={cell.value} />,
			},
			{
				Header: 'Live',
				accessor: 'isLive',
				Cell: ({ cell }) => <Live value={cell.value} />,
			},
			{
				Header: 'Action',
				accessor: '',
				disableSortBy: true,
				Cell: ({ cell }) => <Action row={cell.row} />,
			},
		],
		[]
	);

	return {
		currentPage,
		setCurrentPage,
		totalSportsMatchesCount: sportsMatches?.totalPage,
		isSportsMatchesLoading,
		formattedSportsMatches,
		itemsPerPage,
		onChangeRowsPerPage,
		columns,
	};
};

export default useSportsMatchesListing;
