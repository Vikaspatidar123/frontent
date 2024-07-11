/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from 'react-redux';
import { React, useEffect, useMemo, useState } from 'react';
import moment from 'moment';
import { Earned, KeyValueCellNA, UserName } from '../ReferralColList';
import {
	getReferralInitialValues,
	referralSchema,
	staticFormFields,
} from '../formDetails';
import {
	editReferralStart,
	fetchAllReferralsStart,
	getSiteConfigurationStart,
} from '../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { modules } from '../../../constants/permissions';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { YMDFormat } from '../../../constants/config';

const useUpdateSettings = () => {
	const dispatch = useDispatch();
	const [isEdit, setIsEdit] = useState({ open: false, selectedRow: '' });
	const {
		isEditAllReferralsSuccess,
		isEditAllReferralsLoading,
		allReferralsData,
		loading,
	} = useSelector((state) => state.AllReferrals);
	const { defaultCurrency } = useSelector((state) => state.Currencies);
	const { siteConfigDetails } = useSelector((state) => state.ProfileData);

	const referralValue =
		typeof siteConfigDetails?.referral?.value === 'string'
			? JSON.parse(siteConfigDetails.referral.value)
			: siteConfigDetails?.referral?.value;

	const handleUpdateReferralSettings = (values) => {
		dispatch(editReferralStart(values));
	};

	const { isOpen, setIsOpen, validation, setHeader, header, formFields } =
		useForm({
			header: 'Settings',
			initialValues: getReferralInitialValues(referralValue),
			validationSchema: referralSchema,
			onSubmitEntry: handleUpdateReferralSettings,
			staticFormFields: staticFormFields(),
		});

	useEffect(() => {
		if (isEditAllReferralsSuccess) setIsOpen(false);
	}, [isEditAllReferralsSuccess]);

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
		validation.setValues(getReferralInitialValues(referralValue));
		setHeader('Settings');
		setIsEdit({ open: false, selectedRow: '' });
	};

	useEffect(() => {
		if (
			window.localStorage.getItem(formPageTitle.notification) &&
			!isEdit.open &&
			isOpen
		) {
			const values = JSON.parse(
				decryptCredentials(localStorage.getItem(formPageTitle.notification))
			);
			validation.setValues(values);
		}
	}, [isOpen]);

	const buttonList = useMemo(() => [
		{
			label: 'Settings',
			handleClick: handleAddClick,
			link: '#/',
			module: modules.bonus,
			operation: 'C',
		},
	]);

	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		dispatch(
			fetchAllReferralsStart({
				perPage: itemsPerPage,
				page: currentPage,
			})
		);
		dispatch(getSiteConfigurationStart());
	}, []);

	const formattedReferrals = useMemo(
		() =>
			allReferralsData?.referralData?.map((referral) => ({
				...referral,
				username: referral?.user?.username,
				email: referral?.user?.email,
				amount: referral?.ledger?.amount,
			})) || [],
		[allReferralsData]
	);

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const toggleFormModal = () => {
		setIsOpen((prev) => !prev);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'Username',
				accessor: 'username',
				filterable: true,
				Cell: ({ cell }) => <UserName cell={cell} />,
			},
			{
				Header: 'Email',
				accessor: 'email',
				filterable: true,
				Cell: ({ cell }) => <KeyValueCellNA value={cell.value} />,
			},

			{
				Header: 'Amount Earned',
				accessor: 'amount',
				filterable: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<Earned value={cell.value} defaultCurrency={defaultCurrency} />
				),
			},

			{
				Header: 'Date',
				accessor: 'createdAt',
				filterable: true,
				Cell: ({ cell }) => (
					<KeyValueCellNA value={moment(cell.value).format(YMDFormat)} />
				),
			},
		],
		[defaultCurrency]
	);

	return {
		columns,
		buttonList,
		referralsLoading: loading,
		formattedReferrals,
		itemsPerPage,
		setCurrentPage,
		currentPage,
		onChangeRowsPerPage,
		isOpen,
		toggleFormModal,
		header,
		validation,
		isEditAllReferralsLoading,
		formFields,
	};
};

export default useUpdateSettings;
