import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { showToastr } from '../../../utils/helpers';
import useForm from '../../../components/Common/Hooks/useFormModal';
import CasinoGameForm from '../CasinoGameForm';

import {
	getCasinoProvidersDataStart,
	getCasinoGamesStart,
	editWageringTemplateDetails,
	getWageringTemplateDetail,
	resetCasinoProvidersData,
	resetCasinoGamesData,
	resetWageringTemplateDetailData,
} from '../../../store/actions';

import {
	getInitialValues,
	createWageringTemplate,
	leftStaticFormFields,
	rightStaticFormFields,
} from '../formDetails';
import { debounceTime, selectedLanguage } from '../../../constants/config';

let debounce;
const useEditWageringTemplate = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { wageringTemplateId } = useParams();
	const [itemsPerPage, setItemsPerPage] = useState(10);
	const [page, setPage] = useState(1);
	const [customComponent, setCustomComponent] = useState();
	const { wageringTemplateDetail } = useSelector(
		(state) => state.WageringTemplate
	);
	const [selectedId, setSelectedId] = useState([]);

	const { casinoProvidersData, casinoGames, isCasinoGamesLoading } =
		useSelector((state) => state.CasinoManagementData);

	const { SAWageringTemplate, SAWageringTemplateLoading } = useSelector(
		(state) => state.WageringTemplate
	);

	useEffect(() => {
		if (wageringTemplateId) {
			dispatch(
				getWageringTemplateDetail({
					wageringTemplateId: Number(wageringTemplateId),
				})
			);
		}
	}, []);

	const formSubmitHandler = (values) => {
		const templateData = {
			name: values.name,
			gameContributions: Object.keys(selectedId || {})?.map((id) => ({
				casinoGameId: id,
				contributionPercentage: values.contributionPercentage,
			})),
			wageringTemplateId,
		};
		if (Object.keys(templateData.gameContributions).length < 1) {
			showToastr({
				message: 'Select At Least One Game',
				type: 'error',
			});
		} else {
			dispatch(editWageringTemplateDetails({ templateData, navigate }));
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
		header: 'Edit Wagering Template',
		initialValues: getInitialValues(),
		validationSchema: createWageringTemplate,
		onSubmitEntry: formSubmitHandler,
		leftStaticFormFields,
		rightStaticFormFields,
	});

	useEffect(() => {
		if (SAWageringTemplate && !SAWageringTemplateLoading) {
			validation.setValues(getInitialValues(SAWageringTemplate));
			const selectedIds = {};
			SAWageringTemplate?.template?.forEach(({ casinoGame }) => {
				selectedIds[casinoGame.id] = true;
			});
			setSelectedId(selectedIds);
		}
	}, [SAWageringTemplate, SAWageringTemplateLoading]);

	// resetting redux state
	useEffect(
		() => () => {
			dispatch(resetCasinoProvidersData());
			dispatch(resetCasinoGamesData());
			dispatch(resetWageringTemplateDetailData());
		},
		[]
	);

	useEffect(() => {
		if (casinoProvidersData?.providers) {
			setLeftFormFields([
				...leftStaticFormFields(),
				{
					name: 'provider',
					fieldType: 'select',
					label: 'Provider Name ',
					placeholder: 'Provider',
					optionList: casinoProvidersData?.providers?.map(({ id, name }) => ({
						optionLabel: name?.[selectedLanguage],
						value: id,
					})),
				},
			]);
		} else {
			dispatch(getCasinoProvidersDataStart());
		}
	}, [casinoProvidersData]);

	useEffect(() => {
		debounce = setTimeout(() => {
			dispatch(
				getCasinoGamesStart({
					perPage: itemsPerPage,
					page,
					searchString: validation?.values?.searchString || '',
					providerId: validation?.values?.provider || '',
				})
			);
		}, debounceTime);
		return () => clearTimeout(debounce);
	}, [
		validation?.values?.searchString,
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
		validation?.values?.searchString,
		itemsPerPage,
		page,
		selectedId,
	]);

	return {
		header,
		validation,
		leftFormFields,
		rightFormFields,
		setLeftFormFields,
		setRightFormFields,
		setHeader,
		customComponent,
		setCustomComponent,
		selectedId,
		setSelectedId,
		isCasinoGamesLoading,
		SAWageringTemplate,
		itemsPerPage,
		SAWageringTemplateLoading,
		onChangeRowsPerPage,
		page,
		setPage,
		wageringTemplateDetail,
	};
};

export default useEditWageringTemplate;
