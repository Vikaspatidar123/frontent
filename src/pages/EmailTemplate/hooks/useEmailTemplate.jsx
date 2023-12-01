import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'reactstrap';
import { isEmpty } from 'lodash';
import {
	getAllEmailTemplates,
	getEmailTemplate,
	getLanguagesStart,
	deleteEmailTemplate,
	resetAllEmailTemplates,
} from '../../../store/actions';
import { CustomSelectField } from '../../../helpers/customForms';

const useEmailTemplate = () => {
	const {
		emailTemplateOrder,
		emailTemplateloading,
		emailTemplates,
		templateCount,
	} = useSelector((state) => state.EmailTemplate);
	const [isView, setIsView] = useState(false);
	const { emailTemplate, isEmailTemplateLoading } = useSelector(
		(state) => state.EmailTemplate
	);
	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const [clickId, setClickId] = useState();
	const [customComponent, setCustomComponent] = useState();
	const [language, setLanguage] = useState('EN');
	const [expanded, setExpanded] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const fetchData = () => {
		dispatch(getAllEmailTemplates());
		dispatch(getLanguagesStart());
	};

	// resetting email templates redux state
	useEffect(() => () => dispatch(resetAllEmailTemplates()), []);

	useEffect(() => {
		if (emailTemplate) {
			setCustomComponent(
				<>
					<Form>
						<CustomSelectField
							name="language"
							type="select"
							onChange={(e) => {
								setLanguage(e.target.value);
							}}
							value={language}
							options={
								<>
									<option value="EN" selected disabled>
										English
									</option>
									{languageData?.count &&
										languageData?.rows?.map(
											({ languageName, code }) =>
												code !== 'EN' &&
												emailTemplate?.templateCode?.[code] !== undefined && (
													<option key={code} value={code}>
														{languageName}
													</option>
												)
										)}
								</>
							}
						/>
					</Form>
					<div
						className="d-flex p-2"
						dangerouslySetInnerHTML={{
							__html: emailTemplate?.templateCode?.[language],
						}}
					/>
				</>
			);
		}
	}, [emailTemplate, languageData, language]);

	useEffect(() => {
		if (!isEmpty(emailTemplates)) {
			const keyList = Object.keys(emailTemplates || {});
			setExpanded(keyList[0]);
		}
	}, [emailTemplates]);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (clickId) {
			dispatch(getEmailTemplate(clickId));
		}
	}, [clickId]);

	const handleEditClick = (e, emailTemplateId) => {
		e.preventDefault();
		navigate(`/email-templates/edit/${emailTemplateId}`);
	};

	const toggleView = () => {
		setIsView((prev) => !prev);
	};

	const handleViewClick = (e, emailTemplateId) => {
		e.preventDefault();
		setClickId(emailTemplateId);
		setIsView(true);
	};

	const handleDeleteClick = (e, emailTemplateId, type) => {
		e.preventDefault();
		dispatch(deleteEmailTemplate({ emailTemplateId, type }));
	};

	return {
		emailTemplateOrder,
		emailTemplateloading,
		emailTemplates,
		templateCount,
		handleEditClick,
		handleViewClick,
		toggleView,
		isView,
		emailTemplate,
		isEmailTemplateLoading,
		customComponent,
		setCustomComponent,
		handleDeleteClick,
		expanded,
		setExpanded,
	};
};

export default useEmailTemplate;
