import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllEmailTemplates } from '../../../store/actions';

const useEmailTemplate = () => {
	const {
		emailTemplateOrder,
		emailTemplateloading,
		emailTemplates,
		templateCount,
	} = useSelector((state) => state.EmailTemplate);

	const dispatch = useDispatch();

	const fetchData = () => {
		dispatch(getAllEmailTemplates({}));
	};

	useEffect(() => {
		fetchData();
	}, []);

	return {
		emailTemplateOrder,
		emailTemplateloading,
		emailTemplates,
		templateCount,
	};
};

export default useEmailTemplate;
