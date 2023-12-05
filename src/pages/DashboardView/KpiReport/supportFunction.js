/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
export const objectToarrayKpiReport = (data, type) => {
	const dataInfo = data[type];
	const newItemInfo = [];
	for (const key in dataInfo) {
		const dataToPush = {
			...dataInfo[key],
			provider: key,
		};
		newItemInfo.push(dataToPush);
	}
	if (dataInfo) {
		return {
			data: newItemInfo || [],
			lengthValue: newItemInfo.length || 0,
		};
	}
	return {
		data: [],
		lengthValue: 0,
	};
};
