import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
	getInitialValues,
	PaymentProviderStaticFormFields,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import {
	addPaymentProvider,
	getPaymentcredentialsProvider,
	updatePaymentcredentialsProvider,
} from '../../../store/payment/actions';

const useCreate = ({ selectedProvider, setSelectedProvider, type }) => {
	const dispatch = useDispatch();
	const { paymentProviderData, isLoadinpaymentProvider } = useSelector(
		(state) => state.Payment
	);

	console.log(selectedProvider);

	useEffect(() => {
		dispatch(getPaymentcredentialsProvider());
	}, []);

	const handleStaffSubmit = (value) => {
		if (type === 'Edit') {
			dispatch(
				updatePaymentcredentialsProvider({
					id: selectedProvider?.id,
					name: value?.name,
					icon: value?.icon,
					isActive: value?.isActive,
					providerType: 'payment',
					// credentials: JSON.stringify({
					//     EndPoint: value?.EndPoint,
					//     Merchantid: value?.Merchantid,
					//     Privatekey: value?.Privatekey,
					//     SecretKey: value?.SecretKey,
					// })
					credentials: {},
				})
			);
		} else {
			dispatch(
				addPaymentProvider({
					name: value?.name,
					icon: value?.icon,
					isActive: value?.isActive,
					providerType: 'payment',
					credentials: {
						// EndPoint:value?.EndPoint,
						//  Merchantid:value?.Merchantid,
						//  Privatekey:value?.Privatekey,
						//  SecretKey:value?.SecretKey,
					},
				})
			);
		}
		// eslint-disable-next-line no-use-before-define
		toggleFormModal();
		setSelectedProvider();
	};

	const { isOpen, setIsOpen, header, setHeader, validation, staticFormFields } =
		useForm({
			header: '',
			initialValues: getInitialValues(selectedProvider),
			onSubmitEntry: handleStaffSubmit,
			staticFormFields: PaymentProviderStaticFormFields,
		});

	const toggleFormModal = () => {
		setIsOpen((prev) => !prev);
		setSelectedProvider();
	};

	const handleProviderClick = (key) => {
		setSelectedProvider(key);
		setIsOpen(true);
	};

	return {
		validation,
		PaymentProviderStaticFormFields,
		staticFormFields,
		isOpen,
		setIsOpen,
		toggleFormModal,
		handleProviderClick,
		header,
		setHeader,
		paymentProviderData,
		isLoadinpaymentProvider,
	};
};

export default useCreate;
