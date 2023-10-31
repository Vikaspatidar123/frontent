/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom'

import {
	getLoyaltyLevel,
	updateLoyaltyLevel,
} from '../../../store/superAdminSettings/actions';
import { staticFormFields, loyaltyLevelSchema } from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';

const useLoyalty = (isTenant, tenant) => {
	const dispatch = useDispatch();
	const { loyaltyLevel, loyaltyLevelLoading } = useSelector(
		(state) => state.SASettings
	);
	const [myLevels, setMyLevels] = useState(loyaltyLevel);

	useEffect(() => {
		dispatch(getLoyaltyLevel());
	}, []);

	useEffect(() => {
		const newLoyaltyLevel = [];
		for (const level in loyaltyLevel) {
			const obj = loyaltyLevel[level];
			newLoyaltyLevel.push({
				level: obj.level,
				startPoint: obj.startPoint,
				endPoint: obj.endPoint,
				cashback_multiplier: (obj?.cashback_multiplier * 100).toFixed(2),
			});
		}
		setMyLevels(newLoyaltyLevel);
	}, [loyaltyLevel]);

	const updateloyaltyLevel = (values) => {
		const newLoyaltyLevel = [];
		for (const level in values?.loyaltyLevel) {
			const obj = values?.loyaltyLevel[level];
			newLoyaltyLevel.push({
				...obj,
				cashback_multiplier: obj?.cashback_multiplier / 100,
			});
		}
		newLoyaltyLevel &&
			dispatch(
				updateLoyaltyLevel({
					isTenant,
					loyaltyLevel: { loyaltyLevel: newLoyaltyLevel },
					tenant,
					tenantId: '',
				})
			);
	};

	const { validation, formFields, setFormFields } = useForm({
		initialValues: {
			loyaltyLevel: myLevels || [],
		},
		validationSchema: loyaltyLevelSchema,
		onSubmitEntry: updateloyaltyLevel,
		staticFormFields,
	});

	const addLevels = () => {
		const { loyaltyLevel } = validation?.values;
		const lastLevel = loyaltyLevel?.[loyaltyLevel.length - 1]?.level;
		setMyLevels([
			...loyaltyLevel,
			{
				level: lastLevel + 1,
				startPoint: '',
				endPoint: '',
				cashback_multiplier: '',
			},
		]);
	};

	const deleteLevel = () => {
		const { loyaltyLevel } = validation?.values;
		setMyLevels(loyaltyLevel.slice(0, loyaltyLevel?.length - 1));
	};

	const buttonList = useMemo(() => [
		{
			label: 'Add Levels',
			handleClick: addLevels,
			link: '#!',
		},
	]);

	useEffect(() => {
		if (myLevels) {
			const fields = myLevels?.map((level, index) => [
				{
					name: `loyaltyLevel[${index}].level`,
					placeholder: 'Level',
					fieldType: 'loyaltyRangeField',
					isDisabled: true,
					levelIndex: index,
					levelFieldName: 'level',
				},
				{
					name: `loyaltyLevel[${index}].startPoint`,
					placeholder: 'Start Point',
					fieldType: 'loyaltyRangeField',
					type: 'number',
					levelIndex: index,
					levelFieldName: 'startPoint',
					minimum: 0,
					maximum: 9999999,
				},
				{
					name: `loyaltyLevel[${index}].endPoint`,
					placeholder: 'End Point',
					fieldType: 'loyaltyRangeField',
					type: 'number',
					levelIndex: index,
					levelFieldName: 'endPoint',
					minimum: 0,
					maximum: 9999999,
				},
				{
					name: `loyaltyLevel[${index}].cashback_multiplier`,
					placeholder: 'Cashback Multiplier',
					fieldType: 'loyaltyRangeField',
					type: 'number',
					levelIndex: index,
					levelFieldName: 'cashback_multiplier',
					minimum: 0,
					maximum: 9999999,
				},
			]);
			setFormFields(fields);
			validation.setValues({
				loyaltyLevel: myLevels,
			});
		}
	}, [myLevels]);

	return {
		loyaltyLevelLoading,
		myLevels,
		validation,
		formFields,
		buttonList,
		deleteLevel,
	};
};

export default useLoyalty;
