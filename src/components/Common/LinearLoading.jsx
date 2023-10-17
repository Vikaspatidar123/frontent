import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import { useSelector } from 'react-redux';

const LinearLoading = () => {
	const { showLinearProgress } = useSelector((state) => state.ProgressLoading);
	return showLinearProgress ? (
		<Box sx={{ width: '100%', position: 'sticky', top: '70px', zIndex: '999' }}>
			<LinearProgress />
		</Box>
	) : null;
};
export default LinearLoading;
