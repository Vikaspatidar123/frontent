/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Input } from 'reactstrap';
import { showToastr } from '../../../utils/helpers';
import {
	deatechOdsVariationStart,
	getSportsMatchDetailStart,
	resetSportsMatchDetailData,
	updateOdsVariationStart,
	// updateCompanyOddStart
} from '../../../store/actions';
import { CommonCell } from '../components/SportsMatchDetailsListCol';

const useSportsMatchDetail = () => {
	const { matchId } = useParams();
	const dispatch = useDispatch();
	const { matchOdsDetails, isSportsMatchDetailsLoading } = useSelector(
		(state) => state?.SportsList
	);
	const [showOddsModal, setShowOddsModal] = useState(false);
	const [varyType, setVaryType] = useState('increase');
	const [varyPercentage, setVaryPercentage] = useState('');
	const [varyPercentageMap, setVaryPercentageMap] = useState({});
	const [isAllEvents, setIsAllEvents] = useState('');
	const [matchMarketId, setMatchMarketId] = useState('');
	const [showDetachMarketModal, setShowDetachMarketModal] = useState(false);
	const [marketDetail, setMarketDetail] = useState({
		name: '',
		isDetached: '',
	});
	const [openAccordion, setOpenAccordion] = useState('');

	useEffect(() => {
		if (matchId) {
			dispatch(getSportsMatchDetailStart({ matchId }));
		}
	}, [matchId]);

	// resetting match details redux state
	useEffect(() => () => dispatch(resetSportsMatchDetailData()), []);

	const handleChange = (item) => {
		setMarketDetail({
			name: item?.markets?.marketName[0]?.name,
			isDetached: item?.detach || false,
		});
		setMatchMarketId(item.matchMarketId);
	};

	const toggleModal = () => {
		setShowOddsModal(!showOddsModal);
	};

	const handleVarySubmit = () => {
		if (varyPercentage > 100) {
			showToastr({
				message: 'Odd Percentage can not be more than 100',
				type: 'error',
			});
		} else if (varyPercentage < 1) {
			showToastr({
				message: 'Odd Percentage can not be less than 1',
				type: 'error',
			});
		} else {
			dispatch(
				updateOdsVariationStart({
					matchId,
					modificationType: 'percentage',
					modificationValue: varyPercentage,
					matchMarketId: !isAllEvents && matchMarketId ? matchMarketId : '',
					type: varyType,
					toggleModal,
					setVaryPercentage,
				})
			);
		}
	};

	const toggleDetachMarketModal = () => {
		setShowDetachMarketModal(!showDetachMarketModal);
		setVaryType('');
		setVaryPercentage('');
	};

	const handleDetachMarket = () => {
		const currentMarket = matchOdsDetails?.rows?.find(
			(item) => item.matchMarketId === matchMarketId
		);
		dispatch(
			deatechOdsVariationStart({
				matchMarketId: matchMarketId || '',
				toggleFlag: currentMarket?.detach ? 0 : 1,
				marketId: matchId,
				toggleDetachMarketModal,
			})
		);
	};

	const toggleAccordion = (id) => {
		if (openAccordion === id) {
			setOpenAccordion();
		} else {
			setOpenAccordion(id);
		}
		setVaryPercentageMap({});
	};

	// const handleSetClick = (value, item, index) => {
	// 	if (!varyPercentageMap[index] || Number(varyPercentageMap[index] < 0)) {
	// 		showToastr({ message: 'Please Error a Valid Number.', type: 'error' });
	// 	} else {
	// 		dispatch(
	// 			updateCompanyOddStart({
	// 				matchId,
	// 				matchMarketId: Number(item?.matchMarketId),
	// 				outcomeId: Number(value.outcomeId),
	// 				modificationValue: Number(varyPercentageMap[index]),
	// 			})
	// 		);
	// 	}
	// };

	const marketColumns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				notHidable: true,
				filterable: true,
				Cell: ({ cell }) => <CommonCell cell={cell} />,
			},
			{
				Header: 'Name',
				accessor: 'name',
				filterable: true,
				Cell: ({ cell }) => <CommonCell cell={cell} />,
			},
			{
				Header: 'Feed Odd',
				accessor: 'price',
				filterable: false,
				Cell: ({ cell }) => <CommonCell cell={cell} />,
			},
			{
				Header: 'Company Odd',
				accessor: 'customOdd',
				filterable: false,
				Cell: ({ cell }) => <CommonCell cell={cell} />,
			},
			{
				Header: 'Actions',
				accessor: 'actions',
				filterable: false,
				Cell: () => (
					<div className="d-flex justify-content-start align-items-start ">
						<Input
							type="number"
							// disabled={!item?.detach}
							// value={varyPercentageMap[index] || ''}
							maxLength={3}
							onChange={() => {
								// const newVaryPercentage = e.target.value;
								setVaryPercentageMap((prevState) => ({
									...prevState,
									// [index]: newVaryPercentage,
								}));
							}}
							placeholder="Enter odd"
						/>
						<Button
							// disabled={!item?.detach}
							onClick={() => {}}
							// handleSetClick(value, item, index)
							color="info"
						>
							Set
						</Button>
					</div>
				),
			},
		],
		[varyPercentageMap]
	);

	return {
		matchId,
		matchOdsDetails,
		toggleModal,
		setMatchMarketId,
		toggleDetachMarketModal,
		handleChange,
		setIsAllEvents,
		handleDetachMarket,
		handleVarySubmit,
		showDetachMarketModal,
		varyType,
		setVaryType,
		varyPercentage,
		setVaryPercentage,
		showOddsModal,
		marketDetail,
		setMarketDetail,
		isSportsMatchDetailsLoading,
		marketColumns,
		toggleAccordion,
		openAccordion,
	};
};

useSportsMatchDetail.propTypes = PropTypes.any;

export default useSportsMatchDetail;
