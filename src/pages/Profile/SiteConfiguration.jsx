/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import React from 'react';
import { Form, Row, Col, Card } from 'reactstrap';
import { useFormik } from 'formik';
import {
	CustomInputField,
	CustomSelectField,
	// CustomSwitchButton,
} from '../../helpers/customForms';
import { adminSiteConfigSchema } from './formDetails';

const SiteConfig = ({ details, languageData }) => {
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
			console.log(values);
		},
	});

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
							label="Site Logo"
							name="logo"
							type="file"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							placeholder="upload Site Logo"
							validate={{ required: { value: true } }}
							value={formik.values?.logo || ''}
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
									{languageData?.rows.map(({ languageId, languageName }) => (
										<option key={languageId} value={languageName}>
											{languageName}
										</option>
									))}
								</>
							}
						/>

						{/* <CustomSwitchButton
              className="mb-2"

						labelClassName="form-check-label"
						label="Maintenance"
						htmlFor="customRadioInline1"
						type="switch"
						id="customRadioInline1"
						name="maintenance"
						checked={formik.values?.maintenance}
						inputClassName="form-check-input"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
					/> */}
					</Col>
				</Row>
				<Row>
					<Col>
						<div className="text-end">
							<button type="submit" className="btn btn-success save-user">
								Edit
							</button>
						</div>
					</Col>
				</Row>
			</Card>
		</Form>
	);
};

SiteConfig.defaultProps = {};

export default SiteConfig;
