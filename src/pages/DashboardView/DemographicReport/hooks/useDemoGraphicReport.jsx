/* eslint-disable react/prop-types */
import React, { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countryFilter } from '../../../../utils/countryFilter';
import { getDemographicStart } from '../../../../store/dashboardView/actions';
import { Country, DepositAmount, Depositors, SignUps } from '../DemoGraphCol';

const useDemoGraphicReport = () => {
	const dispatch = useDispatch();
	const [demoDateOptions, setDemoDateOptions] = useState('last30days');
	const [demoGrapFormatedData, setDemoGrapFormatedData] = useState([]);
	const defaultCurrency = useSelector(
		(state) => state.Currencies.defaultCurrency
	);
	const { demoGraphicData, isDemographicLoading } = useSelector(
		(state) => state.DashboardViewInfo
	);

	const fetchData = () => {
		dispatch(
			getDemographicStart({
				dateOptions: demoDateOptions,
			})
		);
	};

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
		fetchData();
	}, [demoDateOptions]);

	useEffect(() => {
		if (demoGraphicData?.demograph)
			formatDataHandler(demoGraphicData?.demograph);
	}, [demoGraphicData]);

	const demoGraphOptions = {
		chart: {
			type: 'bar',
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
				Header: 'DEPOSITORS',
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
		demoGraphicData,
		demoGraphColumn,
		demoDateOptions,
		setDemoDateOptions,
		isDemographicLoading,
		fetchData,
	};
};

export default useDemoGraphicReport;
