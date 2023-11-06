/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
	fetchSportsMatchesStart,
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
	const navigate = useNavigate();
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
	const onMatchClick = (matchId) => {
		navigate(`/match/${matchId}`);
	};
	const columns = useMemo(
		() => [
			{
				Header: 'IS FEATURED',
				accessor: 'isFeatured',
				Cell: (cellProps) => (
					<IsFeatured
						toggleIsFeatured={toggleIsFeatured}
						isFeaturedUpdateLoading={isFeaturedUpdateLoading}
						featuredFabData={featuredFabData}
						{...cellProps}
					/>
				),
			},
			{
				Header: 'Id',
				accessor: 'matchId',
				filterable: true,
				Cell: (cellProps) => <Id {...cellProps} />,
			},
			{
				Header: 'Title',
				accessor: 'title',
				filterable: true,
				Cell: ({ cell }) => <Title cell={cell} onMatchClick={onMatchClick} />,
			},
			{
				Header: 'Tournament',
				accessor: 'tournamentName',
				filterable: true,
				Cell: (cellProps) => <Tournament {...cellProps} />,
			},
			{
				Header: 'Sport',
				accessor: 'sportName',
				filterable: true,
				Cell: (cellProps) => <Sport {...cellProps} />,
			},
			// {
			// 	Header: 'Is Featured',
			// 	accessor: 'isFeatured',
			// 	filterable: true,
			// 	Cell: (cellProps) => <IsFeatured {...cellProps} />,
			// },
			{
				Header: 'Start Date',
				accessor: 'startDate',
				Cell: (cellProps) => <StartDate {...cellProps} />,
			},
			{
				Header: 'Status',
				accessor: 'status',
				Cell: (cellProps) => <Status {...cellProps} />,
			},
			{
				Header: 'Live',
				accessor: 'isLive',
				Cell: (cellProps) => <Live {...cellProps} />,
			},
			{
				Header: 'Action',
				accessor: '',
				Cell: (cellProps) => <Action {...cellProps} />,
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
