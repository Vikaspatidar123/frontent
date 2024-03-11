/* eslint-disable react/prop-types */
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form } from 'reactstrap';
import {
	getAllEmailTemplates,
	getEmailTemplate,
	getLanguagesStart,
	deleteEmailTemplate,
	resetAllEmailTemplates,
} from '../../../store/actions';
import ActionButtons from '../ActionButtons';
import { EmailTemplateId, Label, Primary } from '../EmailTemplateListCol';
import { CustomSelectField } from '../../../helpers/customForms';

const useEmailTemplate = () => {
	const { emailTemplateOrder, emailTemplateloading, emailTemplates } =
		useSelector((state) => state.EmailTemplate);
	const { emailTemplate, isEmailTemplateLoading } = useSelector(
		(state) => state.EmailTemplate
	);
	const { languageData } = useSelector((state) => state.CasinoManagementData);
	const [clickId, setClickId] = useState('');
	const [customComponent, setCustomComponent] = useState();
	const [language, setLanguage] = useState('EN');

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
									{languageData?.languages?.length &&
										languageData?.languages?.map(
											({ name, code }) =>
												code !== 'EN' &&
												emailTemplate?.templateCode?.[code] !== undefined && (
													<option key={code} value={code}>
														{name}
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
							__html: emailTemplate?.[0].templateCode?.[language],
						}}
					/>
				</>
			);
		}
	}, [emailTemplate, languageData, language]);

	useEffect(() => {
		fetchData();
	}, []);

	const handleEditClick = (e, emailTemplateId) => {
		e.preventDefault();
		navigate(`/email-templates/edit/${emailTemplateId}`);
	};

	const toggleView = () => {
		setClickId('');
	};

	const handleViewClick = (e, emailTemplateId) => {
		e.preventDefault();
		setClickId(emailTemplateId);
		dispatch(getEmailTemplate(emailTemplateId));
	};

	const handleDeleteClick = (e, emailTemplateId) => {
		e.preventDefault();
		dispatch(
			deleteEmailTemplate({
				emailTemplateId: Number(emailTemplateId),
			})
		);
	};

	const columns = useMemo(
		() => [
			{
				Header: 'ID',
				accessor: 'id',
				filterable: true,
				Cell: ({ cell }) => <EmailTemplateId value={cell.value} />,
			},
			{
				Header: 'LABEL',
				accessor: 'label',
				filterable: true,
				Cell: ({ cell }) => <Label value={cell.value} />,
			},
			{
				Header: 'PRIMARY',
				accessor: 'isDefault',
				filterable: true,
				Cell: ({ cell }) => <Primary value={cell.value} />,
			},
			{
				Header: 'ACTION',
				accessor: 'action',
				disableFilters: true,
				disableSortBy: true,
				Cell: ({ cell }) => (
					<ActionButtons
						row={cell.row}
						handleEditClick={handleEditClick}
						handleViewClick={handleViewClick}
						handleDeleteClick={handleDeleteClick}
					/>
				),
			},
		],
		[]
	);

	return {
		emailTemplateOrder,
		emailTemplateloading,
		emailTemplates,
		toggleView,
		emailTemplate,
		isEmailTemplateLoading,
		customComponent,
		columns,
		clickId,
	};
};

export default useEmailTemplate;
