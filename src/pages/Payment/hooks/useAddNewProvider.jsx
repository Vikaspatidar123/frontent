import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { modules } from '../../../constants/permissions';

const useCreate = ({
	selectedProvider,
	setSelectedProvider,
	type,
	previousSelectedProvider,
	setPreviousSelectedProvider,
	dynamicField,
	setDynamicField,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { paymentProviderData, isLoadinpaymentProvider } = useSelector(
		(state) => state.Payment
	);

	useEffect(() => {
		dispatch(getPaymentcredentialsProvider());
	}, []);

	const handleSubmit = (value) => {
		const {
			name,
			isActive,
			icon,
			BaseURL,
			MerchantId,
			Privatekey,
			SecretKey,
			...rest
		} = value;
		if (type === 'Edit') {
			dispatch(
				updatePaymentcredentialsProvider({
					id: selectedProvider?.id,
					providerCredentialId: selectedProvider?.id,
					name,
					icon,
					isActive,
					providerType: 'payment',
					credentials: {
						BaseURL,
						MerchantId,
						Privatekey,
						SecretKey,
						...rest,
					},
					// credentials: {},
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
						EndPoint: value?.EndPoint,
						Merchantid: value?.Merchantid,
						Privatekey: value?.Privatekey,
						SecretKey: value?.SecretKey,
					},
				})
			);
		}
		// eslint-disable-next-line no-use-before-define
		toggleFormModal();
		setSelectedProvider();
		setPreviousSelectedProvider();
	};

	const { isOpen, setIsOpen, header, validation, setHeader, staticFormFields } =
		useForm({
			header: '',
			initialValues: getInitialValues(selectedProvider),
			onSubmitEntry: handleSubmit,
			staticFormFields: PaymentProviderStaticFormFields(
				dynamicField,
				setDynamicField
			),
		});
	const toggleFormModal = () => {
		setIsOpen((prev) => !prev);
		setSelectedProvider();
	};

	const handleProviderClick = (provider) => {
		if (previousSelectedProvider?.id === provider.id) {
			setIsOpen(false);
			setSelectedProvider();
			setPreviousSelectedProvider();
		} else {
			// Otherwise, set the new provider
			setSelectedProvider(provider);
			setPreviousSelectedProvider(provider);
			setIsOpen(true);
		}
	};

	const onBackClick = () => {
		navigate('/payment');
	};
	const buttonList = useMemo(() => [
		{
			label: 'Configure Provider',
			handleClick: () => handleProviderClick({ id: 'Create' }),
			link: '#!',
			module: modules.paymentManagement,
			operation: 'C',
		},
	]);
	return {
		validation,
		isOpen,
		setIsOpen,
		toggleFormModal,
		handleProviderClick,
		header,
		setHeader,
		paymentProviderData,
		isLoadinpaymentProvider,
		onBackClick,
		staticFormFields,
		PaymentProviderStaticFormFields,
		buttonList,
	};
};

export default useCreate;
