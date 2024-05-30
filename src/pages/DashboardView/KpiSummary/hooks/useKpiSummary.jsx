/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TABS } from '../../constant';
import { getKpiSummaryStart } from '../../../../store/dashboardView/actions';
import { Delta, RowName, Today, Yesterday } from '../KpiListCol';

const useKpiSummary = () => {
	const dispatch = useDispatch();
	const [activeKpiSummTab, setActiveKpiSummTab] = useState(TABS.CASINO);
	const [kpiSummaryDate, setKpiSummaryDate] = useState('today');
	const [currencyId, setCurrencyId] = useState(null);
	const { kPISummary, isKpiSummaryLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);
	const { currencies, defaultCurrency } = useSelector(
		(state) => state.Currencies
	);

	const loadKPISummary = () => {
		dispatch(
			getKpiSummaryStart({
				tab: activeKpiSummTab,
				dateOptions: kpiSummaryDate,
				currencyId,
			})
		);
	};

	useEffect(() => {
		setCurrencyId(defaultCurrency.id);
	}, [defaultCurrency.id]);

	useEffect(() => {
		if (activeKpiSummTab && currencyId) {
			loadKPISummary();
		}
	}, [activeKpiSummTab, kpiSummaryDate, currencyId]);

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
							acc[key][entry.data] = ['betamount', 'winamount'].includes(key)
								? `${
										currencies?.currencies?.find(
											(curr) => curr.id === currencyId
										)?.symbol || defaultCurrency.symbol
								  } ${entry[key]}`
								: entry[key];
						}
					});
					return acc;
				}, {})
			);
		}
		return [];
	}, [kPISummary, currencyId]);

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
		currencyId,
		setCurrencyId,
		currencies,
	};
};

export default useKpiSummary;
