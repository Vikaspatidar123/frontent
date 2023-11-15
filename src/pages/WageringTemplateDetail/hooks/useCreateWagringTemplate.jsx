import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { showToastr } from '../../../utils/helpers';
import useForm from '../../../components/Common/Hooks/useFormModal';
import useWageringTemplate from './useWageringTemplate';
import CasinoGameForm from '../CasinoGameForm';
import { modules } from '../../../constants/permissions';
import {
	getCasinoProvidersDataStart,
	getCasinoGamesStart,
	createWageringTemplateDetails,
} from '../../../store/actions';

import {
	getInitialValues,
	createWageringTemplate,
	leftStaticFormFields,
	rightStaticFormFields,
} from '../formDetails';

const useCreateWageringTemplate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [customComponent, setCustomComponent] = useState();
	const { wageringTemplateDetail } = useWageringTemplate();
	const [selectedId, setSelectedId] = useState([]);

	// const [isEdit, setIsEdit] = useState(isEditPage || false);

	const {
		casinoProvidersData,
		casinoGames,
		isCasinoGamesLoading,
		createWageringTemplateDetailLoading,
	} = useSelector((state) => state.CasinoManagementData);

	const formSubmitHandler = (values) => {
		const templateData = {
			name: values.name,
			gameContribution: Object.fromEntries(
				selectedId?.map((id) => [id.casinoGameId, values.customValue])
			),
		};
		if (Object.keys(templateData.gameContribution).length < 1) {
			showToastr({
				message: 'Select At Least One Game',
				type: 'error',
			});
		} else {
			dispatch(createWageringTemplateDetails({ templateData, navigate }));
		}

		setSelectedId([]);
	};

	const onChangeRowsPerPage = (value) => {
		setItemsPerPage(value);
	};

	const {
		header,
		validation,
		leftFormFields,
		setLeftFormFields,
		rightFormFields,
		setRightFormFields,
		setHeader,
	} = useForm({
		header: 'Create',
		initialValues: getInitialValues(),
		validationSchema: createWageringTemplate,
		onSubmitEntry: formSubmitHandler,
		leftStaticFormFields,
		rightStaticFormFields,
	});

	useEffect(() => {
		if (casinoProvidersData) {
			setLeftFormFields([
				...leftStaticFormFields(),
				{
					name: 'provider',
					fieldType: 'select',
					label: 'Provider Name ',
					placeholder: 'Provider',
					optionList: casinoProvidersData?.rows?.map(
						({ casinoProviderId, name }) => ({
							optionLabel: name,
							value: casinoProviderId,
						})
					),
				},
			]);
		}
	}, [casinoProvidersData]);

	useEffect(() => {
		dispatch(getCasinoProvidersDataStart());
		dispatch(
			getCasinoGamesStart({
				limit: itemsPerPage,
				pageNo: page,
				casinoCategoryId: '',
				search: validation?.values?.search || '',
				isActive: '',
				tenantId: '',
				providerId: validation?.values?.provider || '',
			})
		);
	}, [
		validation?.values?.search,
		validation?.values?.provider,
		itemsPerPage,
		page,
	]);

	useEffect(() => {
		setCustomComponent(
			<CasinoGameForm
				values={validation.values}
				casinoGames={casinoGames}
				validation={validation}
				wageringTemplateDetail={wageringTemplateDetail}
				selectedId={selectedId}
				setSelectedId={setSelectedId}
				onChangeRowsPerPage={onChangeRowsPerPage}
				itemsPerPage={itemsPerPage}
				isCasinoGamesLoading={!isCasinoGamesLoading}
				page={page}
				setPage={setPage}
			/>
		);
	}, [
		validation?.values,
		casinoGames,
		validation?.values?.search,
		itemsPerPage,
		page,
	]);

	const handleCreateClick = (e) => {
		e.preventDefault();
		setHeader('Create');
		navigate('create');
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleCreateClick,
			link: '#!',
			module: modules.WageringTemplate,
			operation: 'C',
		},
	]);

	return {
		header,
		validation,
		leftFormFields,
		rightFormFields,
		setLeftFormFields,
		setRightFormFields,
		setHeader,
		buttonList,
		customComponent,
		setCustomComponent,
		selectedId,
		setSelectedId,
		isCasinoGamesLoading,
		createWageringTemplateDetailLoading,
	};
};

export default useCreateWageringTemplate;
