import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
	getInitialValues,
	staticFormFields,
	validationSchema,
} from '../formDetails';
import // createReviewsStart,
'../../../store/actions';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useCreateReview = () => {
	// const dispatch = useDispatch();
	const { isCreateReviewLoading, reviewManagement } = useSelector(
		(state) => state.ReviewManagement
	);

	const handleCreateReview = () => {
		// dispatch(
		//   createReviewsStart({
		//     data: values,
		//   })
		// );
	};

	const { isOpen, setIsOpen, header, validation, formFields, setFormFields } =
		useForm({
			header: 'Add Review',
			initialValues: getInitialValues(),
			validationSchema,
			staticFormFields,
			onSubmitEntry: handleCreateReview,
			isEdit: false,
		});

	const handleAddClick = (e) => {
		e.preventDefault();
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setIsOpen(false);
	}, [reviewManagement?.count]);

	return {
		isOpen,
		setIsOpen,
		header,
		validation,
		formFields,
		setFormFields,
		handleAddClick,
		isCreateReviewLoading,
	};
};

export default useCreateReview;
