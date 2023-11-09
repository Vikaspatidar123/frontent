/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
	deatechOdsVariationStart,
	getSportsMatchDetailStart,
	updateOdsVariationStart,
} from '../../../store/actions';
import columns from '../components/SportsMatchDeatilsListCol';

const useSportsMatchDetail = () => {
	const { matchId } = useParams();
	const dispatch = useDispatch();
	const { matchOdsDetails, isSportsMatchDetailsLoading } = useSelector(
		(state) => state?.SportsList
	);
	const [showOddsModal, setShowOddsModal] = useState(false);
	const [varyType, setVaryType] = useState('increase');
	const [varyPercentage, setVaryPercentage] = useState('');
	const [isAllEvents, setIsAllEvents] = useState('');
	const [matchMarketId, setMatchMarketId] = useState('');
	const [showDetachMarketModal, setShowDetachMarketModal] = useState(false);
	const [marketDetail, setMarketDetail] = useState({
		name: '',
		isDetached: '',
	});

	useEffect(() => {
		if (matchId) {
			dispatch(getSportsMatchDetailStart({ matchId }));
		}
	}, [matchId]);

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
			toast.error('Odd Percentage can not be more than 100');
		} else if (varyPercentage < 1) {
			toast.error('Odd Percentage can not be less than 1', { autoClose: 2000 });
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

	return {
		columns,
		dispatch,
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
	};
};

useSportsMatchDetail.propTypes = PropTypes.any;

export default useSportsMatchDetail;
