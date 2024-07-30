import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	getInitialValues,
	PaymentProviderStaticFormFields,
	validationSchema,
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
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [page, setPage] = useState(1);
	const [dynamicField, setDynamicField] = useState([]);
	const fields = useRef();
	const { paymentProviderData, isLoadinpaymentProvider } = useSelector(
		(state) => state.Payment
	);
	console.log(dynamicField);
	useEffect(() => {
		dispatch(
			getPaymentcredentialsProvider({
				perPage: 10,
				page,
			})
		);
	}, [page]);

	useEffect(() => {
		fields.current = dynamicField;
	}, [dynamicField]);

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
				updatePaymentcredentialsProvider(
					{
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
					},
					paymentProviderData?.providerCredentials?.length
				)
			);
		} else {
			dispatch(
				addPaymentProvider(
					{
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
					},
					paymentProviderData?.providerCredentials?.length,
					page
				)
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
		validationSchema,
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
			setDynamicField([]);
		} else {
			setSelectedProvider(provider);
			setPreviousSelectedProvider(provider);
			setIsOpen(true);
			setDynamicField([]);
		}
	};

	const onRemoveField = (name) => {
		validation.setFieldValue(name, null);
		const updatedFields = fields.current.filter((field) => field.name !== name);
		fields.current = updatedFields;
	};

	useEffect(() => {
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
			setFormFields([...PaymentProviderStaticFormFields, ...credentialsFields]);
		}
	}, [selectedProvider]);

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

	const fetchMoreData = () => {
		setPage((prevPage) => prevPage + 1);
	};

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
		formFields: [
			...formFields,
			...dynamicField,

			{
				name: 'isActive',
				fieldType: 'switch',
				label: 'Set Active/Inacative',
				// isNewRow: false,
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
				fieldType: 'addKeyValue',
				callBack: ({ key, value }) => {
					validation.setFieldValue(key, value);
					setDynamicField((prev) => [
						...prev,
						{
							name: key,
							fieldType: 'textField',
							onDelete: onRemoveField,
							type: 'text',
							label: `Enter ${key}`,
							placeholder: `Enter ${key} value`,
						},
					]);
				},
			},
		],
		buttonList,
		fetchMoreData,
		page,
	};
};

export default useCreate;
