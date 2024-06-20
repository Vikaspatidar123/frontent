/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { KPI_SUMMARY_NAMES, TABS } from '../../constant';
import { getKpiSummaryStart } from '../../../../store/dashboardView/actions';
import { Delta, RowName, Today, Yesterday } from '../KpiListCol';
import { getPercentage } from '../../../../utils/helpers';

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
				// dateOptions: kpiSummaryDate,
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
		if (!isEmpty(kPISummary)) {
			const currency =
				currencies?.currencies?.find((curr) => curr.id === currencyId) ||
				defaultCurrency;
			return KPI_SUMMARY_NAMES.filter(
				(names) =>
					!(names.value === 'wincount' && activeKpiSummTab === TABS.SPORT)
			).map(({ label, value, isAmount }) => {
				const delta = getPercentage(
					Number(kPISummary[`monthtodate${value}`] || 0),
					Number(kPISummary[`pastmonthtodate${value}`] || 0)
				);
				return {
					name: label,
					today: `${isAmount ? currency.symbol : ''} ${
						kPISummary[`today${value}`] || 0
					}`,
					yesterday: `${isAmount ? currency.symbol : ''} ${
						kPISummary[`yesterday${value}`] || 0
					}`,
					monthToDate: `${isAmount ? currency.symbol : ''} ${
						kPISummary[`monthtodate${value}`] || 0
					}`,
					delta: `${delta} %`,
				};
			});
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
