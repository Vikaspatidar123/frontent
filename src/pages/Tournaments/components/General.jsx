/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Col, Card } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
	generalStepInitialValues,
	generalFormSchema,
	staticFormFields,
} from '../formDetails';
import FormPage from '../../../components/Common/FormPage';
import Spinners from '../../../components/Common/Spinner';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { getLanguagesStart } from '../../../store/actions';
import TabsPage from '../../../components/Common/TabsPage';
import { CustomInputField } from '../../../helpers/customForms';
import Actions from './Actions';
import { filterEmptyPayload } from '../../../network/networkUtils';

const General = ({
	isLoading,
	setAllFields,
	tournamentDetail,
	submitButtonLoading,
	toggleTab,
	tabsToShow,
	activeTab,
}) => {
	const dispatch = useDispatch();
	const [activeLangTab, setActiveLangTab] = useState('EN');
	const { languageData } = useSelector((state) => state.CasinoManagementData);

	useEffect(() => {
		if (!languageData) {
			dispatch(getLanguagesStart());
		}
	}, [languageData]);

	const toggle = (tab) => {
		setActiveLangTab(tab);
	};

	const handleSubmit = (values) => {
		setAllFields((prev) => ({
			...prev,
			...values,
			name: filterEmptyPayload(values.name),
			description: filterEmptyPayload(values.description),
		}));
		window.scrollTo(0, 0);
	};

	const { formFields, validation } = useForm({
		initialValues: generalStepInitialValues(tournamentDetail),
		validationSchema: generalFormSchema(),
		staticFormFields: staticFormFields(),
		onSubmitEntry: handleSubmit,
	});

	const handleNextClick = (nextTab) => {
		validation.submitForm();
		generalFormSchema()
			.validate(validation.values)
			.then(() => {
				handleSubmit(validation.values);
				toggleTab(nextTab);
			})
			.catch((err) => {
				console.log('Error in general form = ', err?.errors);
			});
	};

	useEffect(() => {
		if (tournamentDetail) {
			validation.setValues(generalStepInitialValues(tournamentDetail));
		}
	}, [tournamentDetail]);

	const tabData = languageData?.languages?.map((item) => ({
		id: item.code,
		title: item.code,
		component: (
			<>
				<Col lg="4 mb-2">
					<CustomInputField
						label="Title"
						name={`name[${activeLangTab}]`}
						onChange={(e) => {
							e.preventDefault();
							validation.setFieldValue('name', {
								...validation?.values?.name,
								[activeLangTab]: e.target.value,
							});
						}}
						value={validation?.values?.name?.[activeLangTab] || ''}
						onBlur={validation.handleBlur}
						placeholder="Title"
						invalid={!!validation?.errors?.name?.[activeLangTab]}
						isError
						errorMsg={validation?.errors?.name?.[activeLangTab]}
						// disabled={isView}
					/>
				</Col>

				<CustomInputField
					label="Description"
					name={`description[${activeLangTab}]`}
					type="textarea"
					onChange={(e) => {
						e.preventDefault();
						validation.setFieldValue('description', {
							...validation?.values?.description,
							[activeLangTab]: e.target.value,
						});
					}}
					value={validation?.values?.description?.[activeLangTab] || ''}
					onBlur={validation.handleBlur}
					placeholder="Description"
					invalid={!!validation?.errors?.description?.[activeLangTab]}
					isError
					errorMsg={validation?.errors?.description?.[activeLangTab]}
				/>
			</>
		),
	}));

	return (
		<Card>
			<Col lg="12" className="my-3">
				{isLoading ? (
					<Spinners
						color="primary"
						className="position-absolute top-50 start-50"
					/>
				) : (
					<>
						<FormPage
							validation={validation}
							responsiveFormFields={formFields}
							customColClasses=""
							colOptions={{ xs: 12, sm: 4, md: 4, lg: 4, xl: 4, xxl: 4 }}
							isSubmit={false}
							formClass="shadow-none mb-0"
						/>
						<TabsPage
							activeTab={activeLangTab}
							tabsData={tabData}
							toggle={toggle}
							tabContentClass="px-3"
						/>
					</>
				)}
			</Col>
			<Actions
				handleNextClick={handleNextClick}
				submitButtonLoading={submitButtonLoading}
				activeTab={activeTab}
				toggleTab={toggleTab}
				tabsToShow={tabsToShow}
			/>
		</Card>
	);
};

General.defaultProps = {};

export default General;
