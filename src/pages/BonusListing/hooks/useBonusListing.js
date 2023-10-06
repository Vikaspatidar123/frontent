import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getBonusDetails } from '../../../store/actions';

const itemsPerPage = 10;

const useBonsuListing = () => {
	const { bonusDetails, isLoading } = useSelector(
		(state) => state.getAllBonusDetails
	);
	const [selectedClient, setSelectedClient] = useState('');
	const [selectedPortal, setSelectedPortal] = useState('');
	const [page, setPage] = useState(1);
	const [bonusTyp, setBonusTyp] = useState('');
	const [search, setSearch] = useState('');
	const [isActive, setIsActive] = useState('');
	const dispatch = useDispatch();

	const formatDate = (date) => {
		const d = new Date(date);
		let month = `${  d.getMonth() + 1}`;
		let day = `${  d.getDate()}`;
		const year = d.getFullYear();

		if (month.length < 2) month = `0${  month}`;
		if (day.length < 2) day = `0${  day}`;

		return [month, day, year].join('-');
	};

	const safeStringify = (object) => JSON.stringify(object)?.replace(/</g, '\\u003c');

	const formattedBonusDetails = useMemo(() => {
		if (bonusDetails) {
			return bonusDetails?.rows.map((bonus) => ({
				...bonus,
				title: bonus.promotionTitle.EN ?? 'NA',
				bonusType: bonus.bonusType,
				valiTill: formatDate(bonus.validTo),
				isExpired:
					formatDate(bonus.validTo) < formatDate(new Date()) ? 'Yes' : 'No',
				isClaimed: bonus.claimedCount ? 'Yes' : 'No',
			}));
		}
		return [];
	}, [bonusDetails]);

	const fetchData = () => {
		dispatch(
			getBonusDetails({
				adminId: selectedClient,
				tenantId: selectedPortal,
				limit: itemsPerPage,
				pageNo: page,
				search,
				bonusType: bonusTyp === '' ? '' : safeStringify([bonusTyp]),
				isActive,
			})
		);
	};

	useEffect(() => {
		fetchData();
	}, [selectedPortal, bonusTyp, isActive, page, search, selectedClient]);

	return {
		bonusDetails,
		formattedBonusDetails,
		isLoading,
		totalBonusCount: bonusDetails?.count,
		selectedClient,
		setSelectedClient,
		selectedPortal,
		setSelectedPortal,
		itemsPerPage,
		page,
		setPage,
		bonusTyp,
		setBonusTyp,
		search,
		setSearch,
		isActive,
		setIsActive,
	};
};

export default useBonsuListing;
