import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
	const navigate = useNavigate();

	const fetchData = () => {
		dispatch(getAllEmailTemplates({}));
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleEditClick = (e, emailTemplateId) => {
		e.preventDefault();
		navigate(`/email-templates/edit/${emailTemplateId}`);
	};

	return {
		emailTemplateOrder,
		emailTemplateloading,
		emailTemplates,
		templateCount,
		handleEditClick,
	};
};

export default useEmailTemplate;
