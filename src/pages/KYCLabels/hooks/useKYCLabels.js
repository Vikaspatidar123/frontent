import { useEffect, useMemo, useState } from 'react';
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
	const [expanded, setExpanded] = useState('');

	const fetchData = () => {
		dispatch(getDocumentLabel({ userId: '' }));
	};

	const formattedDocumentLabels = useMemo(() => {
		if (documentLabels) {
			setExpanded(documentLabels[0]?.documentLabelId);
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
		expanded,
		setExpanded,
	};
};

export default useKYCLables;
