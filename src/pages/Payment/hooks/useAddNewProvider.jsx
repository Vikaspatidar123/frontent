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

	const {
		isOpen,
		setIsOpen,
		header,
		validation,
		setHeader,
		formFields,
		setFormFields,
	} = useForm({
		header: '',
		initialValues: getInitialValues(selectedProvider),
		onSubmitEntry: handleSubmit,
		staticFormFields: PaymentProviderStaticFormFields,
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

	useEffect(() => {
		if (dynamicField) {
			setFormFields([
				...PaymentProviderStaticFormFields,
				...dynamicField,
				{
					fieldType: 'addKeyValue',
					callBack: ({ key, value }) => {
						validation.setFieldValue(key, value);
						setDynamicField((prev) => [
							...prev,
							{
								name: key,
								fieldType: 'textField',
								type: 'text',
								label: `Enter ${key}`,
								placeholder: `Enter ${key} value`,
								// value,
							},
						]);
					},
				},
				{
					name: 'icon',
					fieldType: 'file',
					type: '',
					label: 'Payment Provider icon',
					placeholder: 'Upload payment provider icon',
					showThumbnail: true,
				},
				{
					name: 'isActive',
					fieldType: 'toggle',
					label: 'Set Active/Incative',
					isNewRow: false,
				},
			]);
		}
		if (selectedProvider?.credentials) {
			const credentialsFields = Object?.keys(selectedProvider?.credentials)
				.map((key) => {
					const field = {
						name: key,
						fieldType: 'textField',
						type: 'text',
						label: `Enter ${key}`,
						placeholder: `Enter ${key} value`,
					};
					validation.setFieldValue(key, selectedProvider.credentials[key]);
					return field;
				})
				.filter((field) => field.name !== 'BaseURL' || 'providerType');
			setFormFields([
				...PaymentProviderStaticFormFields,
				...credentialsFields,
				...dynamicField,
				{
					fieldType: 'addKeyValue',
					callBack: ({ key, value }) => {
						validation.setFieldValue(key, value);
						setDynamicField((prev) => [
							...prev,
							{
								name: key,
								fieldType: 'textField',
								type: 'text',
								label: `Enter ${key}`,
								placeholder: `Enter ${key} value`,
							},
						]);
					},
				},
				{
					name: 'icon',
					fieldType: 'file',
					type: '',
					label: 'Payment Provider icon',
					placeholder: 'Upload payment provider icon',
					showThumbnail: true,
				},
				{
					name: 'isActive',
					fieldType: 'toggle',
					label: 'Set Active/Incative',
					isNewRow: false,
				},
			]);
		}
	}, [dynamicField, selectedProvider]);

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
		formFields,
		buttonList,
	};
};

export default useCreate;
