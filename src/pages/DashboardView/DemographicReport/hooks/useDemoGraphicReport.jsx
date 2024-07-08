/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countryFilter } from '../../../../utils/countryFilter';
import { getDemographicStart } from '../../../../store/dashboardView/actions';
import {
	Country,
	DepositAmount,
	Depositors,
	Flag,
	SignUps,
} from '../DemoGraphCol';

const useDemoGraphicReport = () => {
	const dispatch = useDispatch();
	const [demoDateOptions, setDemoDateOptions] = useState({
		selected: 'last90days',
		fromDate: '',
		toDate: '',
	});
	const [demoGrapFormatedData, setDemoGrapFormatedData] = useState([]);
	const { defaultCurrency, currencyById } = useSelector(
		(state) => state.Currencies
	);
	const { demoGraphicData, isDemographicLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const fetchData = () => {
		dispatch(
			getDemographicStart({
				dateOptions: demoDateOptions?.selected,
				fromDate: demoDateOptions?.fromDate,
				toDate: demoDateOptions?.toDate,
			})
		);
	};

	const formattedDemoGraphicData = useMemo(
		() =>
			demoGraphicData?.demograph?.map((item) => {
				let totalDeposits = 0;
				let totalDepoCount = 0;

				item?.deposits?.forEach(
					({ currencyId, depositAmount, depositorCount }) => {
						const exchangeRate = Number(
							currencyById?.[currencyId]?.exchangeRate || 1
						);
						const amount = Number(depositAmount || 0);
						totalDeposits += amount * exchangeRate;
						totalDepoCount += Number(depositorCount || 0);
					}
				);
				const copiedItem = { ...item };
				delete copiedItem.deposits;
				return {
					...copiedItem,
					depositorCount: totalDepoCount,
					depositAmount: totalDeposits?.toFixed(2),
				};
			}),
		[demoGraphicData, currencyById]
	);

	const formatDataHandler = (list) => {
		const tempData = [];

		if (list?.length) {
			list?.map((item) => {
				const { countryName } = countryFilter(item.countryCode);
				const row = {
					x: countryName,
					y: Number(item.signUpCount),
				};
				tempData.push(row);
				return null;
			});
		}
		const finalData = [
			{
				data: tempData,
			},
		];
		setDemoGrapFormatedData(finalData);
	};

	useEffect(() => {
		const { fromDate, toDate, selected } = demoDateOptions;
		if (selected === 'custom') {
			if (fromDate && toDate) {
				fetchData();
			}
		} else {
			fetchData();
		}
	}, [demoDateOptions]);

	useEffect(() => {
		if (demoGraphicData?.demograph)
			formatDataHandler(demoGraphicData?.demograph);
	}, [demoGraphicData]);

	const demoGraphOptions = {
		chart: {
			type: 'bar',
		},
		tooltip: {
			y: {
				formatter: (value) => `${value}`,
				title: {
					formatter: () => '', // Remove the series name
				},
			},
		},
		plotOptions: {
			bar: {
				columnWidth: '40%',
				distributed: true,
			},
		},
		legend: {
			show: false,
		},
		dataLabels: {
			enabled: false,
			textAnchor: 'start',
			style: {
				colors: ['#fff'],
			},
		},
	};

	const demoGraphColumn = useMemo(
		() => [
			{
				Header: 'Flag',
				accessor: 'countryCode',
				filterable: true,
				Cell: ({ cell }) => <Flag cell={cell} />,
			},
			{
				Header: 'COUNTRY',
				accessor: 'countryName',
				filterable: true,
				Cell: ({ cell }) => <Country cell={cell} />,
			},
			{
				Header: 'SIGN UPS',
				accessor: 'signUpCount',
				filterable: true,
				Cell: ({ cell }) => <SignUps cell={cell} />,
			},
			{
				Header: 'DEPOSIT COUNT',
				accessor: 'depositorCount',
				filterable: true,
				Cell: ({ cell }) => <Depositors cell={cell} />,
			},
			{
				Header: 'DEPOSIT AMOUNT',
				accessor: 'depositAmount',
				filterable: true,
				Cell: ({ cell }) => (
					<DepositAmount cell={cell} defaultCurrency={defaultCurrency} />
				),
			},
		],
		[defaultCurrency]
	);

	return {
		demoGrapFormatedData,
		demoGraphOptions,
		formattedDemoGraphicData,
		demoGraphColumn,
		demoDateOptions,
		setDemoDateOptions,
		isDemographicLoading,
	};
};

export default useDemoGraphicReport;
