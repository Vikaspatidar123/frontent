import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCurrenciesStart } from '../../../store/actions';
import useForm from '../../Admins/hooks/useFormModal';
import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';

const itemsPerPage = 10;

const useCurrencyListing = () => {
	const dispatch = useDispatch();
	const [currentPage, setCurrentPage] = useState(1);
	const { currencies, loading: isCurrenciesLoading } = useSelector(
		(state) => state.Currencies
	);

	const handleCreateCurrency = () => {
		// dispatch()
	};

	useEffect(() => {
		dispatch(
			fetchCurrenciesStart({
				limit: itemsPerPage,
				pageNo: currentPage,
			})
		);
	}, [currentPage]);

	const formattedCurrencies = useMemo(() => {
		const formattedValues = [];
		if (currencies) {
			currencies.rows.map((currency) =>
				formattedValues.push({
					...currency,
					type: 'Fiat',
					primary: currency.isPrimary ? 'YES' : 'NO',
				})
			);
		}
		return formattedValues;
	}, [currencies]);

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Currency',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleCreateCurrency,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	return {
		currentPage,
		setCurrentPage,
		totalCurrenciesCount: currencies?.count,
		isCurrenciesLoading,
		formattedCurrencies,
		itemsPerPage,
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		handleAddClick,
	};
};

export default useCurrencyListing;
