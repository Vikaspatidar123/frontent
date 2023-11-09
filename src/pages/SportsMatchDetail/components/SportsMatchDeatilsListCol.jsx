/* eslint-disable react/prop-types */
import React from 'react';
import { getDateTime } from '../../../utils/dateFormatter';

const Id = ({ cell }) => (cell.value ? cell.value : '');

const Title = ({ cell }) =>
	cell?.row?.original
		? `${cell?.row?.original.teams?.[0]?.team?.teamName?.[0]?.name} VS ${cell?.row?.original.teams?.[0]?.team?.teamName?.[1]?.name}`
		: '-';

const Tournament = ({ cell }) =>
	cell?.row?.original
		? cell?.row?.original.tournaments?.tournamentName?.[0]?.name
		: '-';

const Sport = ({ cell }) =>
	cell?.row?.original
		? cell?.row?.original.sportCountry?.sport?.sportName?.[0]?.name
		: '-';

const Featured = ({ cell }) =>
	cell?.value ? (
		<span className="text-success">YES</span>
	) : (
		<span className="text-danger">NO</span>
	);

const Status = ({ cell }) => (cell?.value ? cell?.value : '-');

const Live = ({ cell }) =>
	cell?.value ? (
		<span className="text-success">YES</span>
	) : (
		<span className="text-danger">NO</span>
	);

const StartDate = ({ cell }) => (cell?.value ? getDateTime(cell?.value) : '-');

const columns = [
	{
		Header: 'ID',
		accessor: 'matchId',
		filterable: false,
		Cell: ({ cell }) => <Id cell={cell} />,
	},
	{
		Header: 'Title',
		filterable: false,
		Cell: ({ cell }) => <Title cell={cell} />,
	},
	{
		Header: 'Tournament',
		filterable: false,
		Cell: ({ cell }) => <Tournament cell={cell} />,
	},
	{
		Header: 'Sport',
		filterable: false,
		Cell: ({ cell }) => <Sport cell={cell} />,
	},
	{
		Header: 'Is Featured',
		accessor: 'isFeatured',
		filterable: false,
		Cell: ({ cell }) => <Featured cell={cell} />,
	},
	{
		Header: 'Status',
		accessor: 'status',
		filterable: false,
		Cell: ({ cell }) => <Status cell={cell} />,
	},
	{
		Header: 'Live',
		accessor: 'isLive',
		filterable: false,
		Cell: ({ cell }) => <Live cell={cell} />,
	},
	{
		Header: 'Start Date',
		accessor: 'matchDate',
		filterable: false,
		Cell: ({ cell }) => <StartDate cell={cell} />,
	},
];

export default columns;
