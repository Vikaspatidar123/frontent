import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { resetSnackbar } from '../../store/snackbar/actions';

let timeout = null;
const SnackbarComponent = ({ vertical, horizontal }) => {
	const dispatch = useDispatch();
	const { message, isOpen, type } = useSelector((state) => state.Snackbar);

	const closeSnackbar = () => {
		dispatch(resetSnackbar());
	};

	useEffect(() => {
		if (isOpen) {
			timeout = setTimeout(() => {
				closeSnackbar();
				clearTimeout(timeout);
			}, 3000);
		}
	}, [isOpen]);

	return (
		<Box sx={{ width: 500 }}>
			<Snackbar
				anchorOrigin={{ vertical, horizontal }}
				open={isOpen}
				onClose={closeSnackbar}
				message={message}
				key={vertical + horizontal + message}
				severity={type}
			/>
		</Box>
	);
};

SnackbarComponent.defaultProps = {
	vertical: 'top',
	horizontal: 'right',
};

SnackbarComponent.propTypes = {
	vertical: PropTypes.string,
	horizontal: PropTypes.string,
};

export default SnackbarComponent;
