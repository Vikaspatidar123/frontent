/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Form, Row, Col, Card, Button } from 'reactstrap';
import { useFormik } from 'formik';
import {
	CustomInputField,
	CustomSelectField,
	CustomToggleButton,
} from '../../helpers/customForms';
import { adminSiteConfigSchema } from './formDetails';

const SiteConfig = ({
	details,
	languageData,
	isEditable,
	setIsEditable,
	updateSiteConfiguration,
}) => {
	const languageOptions =
		languageData?.rows?.map(({ code, languageName }) => ({
			value: code,
			label: languageName,
		})) || [];

	const formik = useFormik({
		initialValues: {
			name: details[1]?.value.name || '',
			url: details[1]?.value.url || '',
			supportEmail: details[1]?.value.supportEmail || '',
			sendgridEmail: details[0]?.value.SENDGRID_EMAIL || '',
			sendgridKey: details[0]?.value.SENDGRID_API_KEY || '',
			logo: null,
			lang: null,
			maintenance: !!details[1]?.value.maintenance,
		},
		validationSchema: adminSiteConfigSchema,
		onSubmit: (values) => {
			const label = {};
			if (values?.lang) {
				languageOptions.forEach((language) => {
					if (values?.lang.includes(language.label)) {
						label[language.value] = language.label;
					}
				});
			}
			updateSiteConfiguration({
				...values,
				lang: label && JSON.stringify(label),
			});
		},
	});

	useEffect(() => {
		if (details.length) {
			formik.resetForm({
				values: {
					name: details[1]?.value.name || '',
					url: details[1]?.value.url || '',
					supportEmail: details[1]?.value.supportEmail || '',
					sendgridEmail: details[0]?.value.SENDGRID_EMAIL || '',
					sendgridKey: details[0]?.value.SENDGRID_API_KEY || '',
					logo: null,
					lang: null,
					maintenance: !!details[1]?.value.maintenance,
				},
			});
		}
	}, [details]);

	return (
		<Form onSubmit={formik.handleSubmit}>
			<Card className="p-3">
				<Row>
					<Col lg={6}>
						<CustomInputField
							className="mb-2"
							label="Site Name"
							name="name"
							type="text"
							disabled={!isEditable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter Site Name"
							validate={{ required: { value: true } }}
							value={formik.values?.name || ''}
							invalid={!!(formik.touched?.name && formik.errors?.name)}
							isError
							errorMsg={formik.touched?.name && formik.errors?.name}
						/>

						<CustomInputField
							className="mb-2"
							label="Support Email Address"
							name="supportEmail"
							type="text"
							disabled={!isEditable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter Support Email Adress"
							validate={{ required: { value: true } }}
							value={formik.values?.supportEmail || ''}
							invalid={
								!!(formik.touched?.supportEmail && formik.errors?.supportEmail)
							}
							isError
							errorMsg={
								formik.touched?.supportEmail && formik.errors?.supportEmail
							}
						/>

						<CustomInputField
							className="mb-2"
							label="Send grid Api Key"
							name="sendgridKey"
							type="text"
							disabled={!isEditable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter Send grid Api Key"
							validate={{ required: { value: true } }}
							value={formik.values?.sendgridKey || ''}
							invalid={
								!!(formik.touched?.sendgridKey && formik.errors?.sendgridKey)
							}
							isError
							errorMsg={
								formik.touched?.sendgridKey && formik.errors?.sendgridKey
							}
						/>

						<CustomInputField
							className="mb-2"
							id="file"
							label="Site Logo"
							name="logo"
							type="file"
							disabled={!isEditable}
							onChange={(event) =>
								formik.setFieldValue('logo', event.currentTarget.files[0])
							}
							onBlur={formik.handleBlur}
							placeholder="upload Site Logo"
							validate={{ required: { value: true } }}
							invalid={!!(formik.touched?.logo && formik.errors?.logo)}
							isError
							errorMsg={formik.touched?.logo && formik.errors?.logo}
						/>
					</Col>

					<Col lg={6}>
						<CustomInputField
							className="mb-2"
							label="Site Url"
							name="url"
							type="text"
							disabled={!isEditable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter Site Url"
							validate={{ required: { value: true } }}
							value={formik.values?.url || ''}
							invalid={!!(formik.touched?.url && formik.errors?.url)}
							isError
							errorMsg={formik.touched?.url && formik.errors?.url}
						/>

						<CustomInputField
							className="mb-2"
							label="Send grid Email"
							name="sendgridEmail"
							type="text"
							disabled={!isEditable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter grid Email"
							validate={{ required: { value: true } }}
							value={formik.values?.sendgridEmail || ''}
							invalid={
								!!(
									formik.touched?.sendgridEmail && formik.errors?.sendgridEmail
								)
							}
							isError
							errorMsg={
								formik.touched?.sendgridEmail && formik.errors?.sendgridEmail
							}
						/>

						<CustomSelectField
							className="mb-2"
							label="Allowed Languages"
							name="lang"
							type="select"
							multiple
							disabled={!isEditable}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="Enter Allowed Languages"
							validate={{ required: { value: true } }}
							value={formik.values?.lang || ''}
							invalid={!!(formik.touched?.lang && formik.errors?.lang)}
							isError
							errorMsg={formik.touched?.lang && formik.errors?.lang}
							options={
								<>
									<option value={null} disabled selected>
										Select Language
									</option>
									{languageOptions.map(({ value, label }) => (
										<option key={value} value={label}>
											{label}
										</option>
									))}
								</>
							}
						/>
						<CustomToggleButton
							className="mb-2"
							disabled={!isEditable}
							labelClassName="form-check-label"
							label="Maintenance"
							htmlFor="flexSwitchCheckDefault"
							type="checkbox"
							role="switch"
							id="flexSwitchCheckDefault"
							name="maintenance"
							checked={formik.values?.maintenance}
							inputClassName="form-check-input"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
						/>
					</Col>
				</Row>
				<Row>
					<Col className="text-end">
						<Button
							color="primary"
							className="btn btn-primary waves-effect waves-light"
							hidden={isEditable}
							onClick={() => setIsEditable(true)}
						>
							Edit
						</Button>
					</Col>
				</Row>
				<Row>
					<Col className="text-end">
						<Button
							color="primary"
							className="btn btn-primary waves-effect waves-light"
							hidden={!isEditable}
							type="submit"
						>
							Submit
						</Button>
					</Col>
				</Row>
			</Card>
		</Form>
	);
};

SiteConfig.defaultProps = {};

export default SiteConfig;
