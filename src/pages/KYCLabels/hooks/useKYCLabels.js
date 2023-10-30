import { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDocumentLabel } from '../../../store/actions';
import languageCode from '../constants';

const useKYCLables = () => {
	const {
		documentLabels,
		documentLabelsLoading,
		isCreateKYCLabelsSuccess,
		isEditKYCLabelsSuccess,
	} = useSelector((state) => state.SASettings);
	const dispatch = useDispatch();

	const fetchData = () => {
		dispatch(getDocumentLabel({ userId: '' }));
	};

	const formattedDocumentLabels = useMemo(() => {
		if (documentLabels) {
			return documentLabels.map((label) => {
				const language = Object.keys(label.name);
				return [
					{
						...label,
						languageData: language?.map((lan) => ({
							language: `${languageCode[lan]} ${lan}`,
							labelName: label.name[lan],
						})),
					},
				];
			});
		}
		return [];
	}, [documentLabels]);

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		if (isCreateKYCLabelsSuccess || isEditKYCLabelsSuccess) fetchData();
	}, [isCreateKYCLabelsSuccess, isEditKYCLabelsSuccess]);

	return {
		documentLabels,
		formattedDocumentLabels,
		documentLabelsLoading,
	};
};

export default useKYCLables;
