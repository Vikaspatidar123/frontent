import React, { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { showToastr } from '../../../utils/helpers';
import useForm from '../../../components/Common/Hooks/useFormModal';
import useWageringTemplate from './useWageringTemplate';
import CasinoGameForm from '../CasinoGameForm';
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
	const [customComponent, setCustomComponent] = useState();
	const { wageringTemplateDetail } = useWageringTemplate();
	const [selectedId, setSelectedId] = useState([]);

	// const [isEdit, setIsEdit] = useState(isEditPage || false);

	const { casinoProvidersData, casinoGames, isCasinoGamesLoading } =
		useSelector((state) => state.CasinoManagementData);

	const formSubmitHandler = (values) => {
		const templateData = {
			name: values.name,
			gameContribution: Object.fromEntries(
				selectedId?.map((id) => [id.casinoGameId, values.customValue])
			),
		};
		if (templateData.gameContribution.length < 1) {
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
				pageNo: 1,
				casinoCategoryId: '',
				search: validation?.values?.search || '',
				isActive: '',
				tenantId: '',
				providerId: validation?.values?.provider || '',
			})
		);
	}, [validation?.values?.search, validation?.values?.provider]);

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
			/>
		);
	}, [validation?.values, casinoGames, validation?.values?.search]);

	// const handleEdit = (e, row) => {
	// 	e.preventDefault();
	// 	setIsEdit(true);
	// 	navigate(`edit/${row.adminUserId}`);
	// 	// setHeader('Edit Staff');
	// 	dispatch(showLinearProgress());
	// };

	const handleCreateClick = (e) => {
		e.preventDefault();
		setHeader('Create');
		navigate('create');
		// setIsEdit(false);
	};

	const buttonList = useMemo(() => [
		{
			label: 'Create',
			handleClick: handleCreateClick,
			link: '#!',
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
	};
};

export default useCreateWageringTemplate;
