/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TABS } from '../../constant';
import { getKpiSummaryStart } from '../../../../store/dashboardView/actions';
import { Delta, RowName, Today, Yesterday } from '../KpiListCol';

const useKpiSummary = () => {
	const dispatch = useDispatch();
	const [activeKpiSummTab, setActiveKpiSummTab] = useState(TABS.SPORT);
	const [kpiSummaryDate, setKpiSummaryDate] = useState('today');
	const { kPISummary, isKpiSummaryLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const loadKPISummary = () => {
		dispatch(
			getKpiSummaryStart({
				tab: activeKpiSummTab,
				dateOptions: kpiSummaryDate,
			})
		);
	};

	useEffect(() => {
		if (activeKpiSummTab) {
			loadKPISummary();
		}
	}, [activeKpiSummTab, kpiSummaryDate]);

	const formattedKpiSummary = useMemo(() => {
		if (kPISummary?.length) {
			return Object.values(
				kPISummary.reduce((acc, entry) => {
					Object.keys(entry).forEach((key) => {
						if (key !== 'data') {
							if (!acc[key]) {
								acc[key] = {
									name: key,
									today: 0,
									yesterday: 0,
									monthToDate: 0,
									// CustomDate: 0,
								};
							}
							acc[key][entry.data] = entry[key];
						}
					});
					return acc;
				}, {})
			);
		}
		return [];
	}, [kPISummary]);

	const kPISummaryColumn = useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <RowName cell={cell?.value || ''} />,
			},
			{
				Header: 'TODAY',
				accessor: 'today',
				filterable: true,
				Cell: ({ cell }) => <Today cell={cell?.value || ''} />,
			},
			{
				Header: 'YESTERDAY',
				accessor: 'yesterday',
				filterable: true,
				Cell: ({ cell }) => <Yesterday cell={cell?.value || ''} />,
			},
			{
				Header: 'MONTH TO DATE',
				accessor: 'monthToDate',
				filterable: true,
				// Cell: ({ cell }) => <Role cell={cell?.value || ''} />,
			},
			{
				Header: 'DELTA',
				accessor: 'delta',
				disableFilters: true,
				Cell: ({ cell }) => <Delta cell={cell?.value || ''} />,
			},
		],
		[]
	);

	return {
		activeKpiSummTab,
		setActiveKpiSummTab,
		kPISummaryColumn,
		kPISummary,
		formattedKpiSummary,
		isKpiSummaryLoading,
		loadKPISummary,
		kpiSummaryDate,
		setKpiSummaryDate,
	};
};

export default useKpiSummary;
