import React, { useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
// import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { resetToastr } from '../../store/toastr/actions';

let timeout = null;
const ToastrComponent = () => {
	const dispatch = useDispatch();
	const { message, isOpen, type, title } = useSelector((state) => state.Toastr);

	useEffect(() => {
		toastr.options = {
			positionClass: 'toast-top-right',
			timeOut: '4000',
			// extendedTimeOut,
			closeButton: true,
			// debug,
			progressBar: true,
			preventDuplicates: true,
			newestOnTop: true,
			// showEasing,
			// hideEasing,
			// showMethod,
			// hideMethod,
			// showDuration,
			// hideDuration
		};

		// setTimeout(() => toastr.success(`Settings updated `), 300)
		// Toaster Types
		if (type === 'info') toastr.info(message, title);
		else if (type === 'warning') toastr.warning(message, title);
		else if (type === 'error') toastr.error(message, title);
		else toastr.success(message, title);
	}, []);

	const closeToastr = () => {
		dispatch(resetToastr());
		toastr.clear();
	};

	useEffect(() => {
		if (isOpen) {
			timeout = setTimeout(() => {
				closeToastr();
				clearTimeout(timeout);
			}, 3000);
		}
	}, [isOpen]);

	return (
		// <Box sx={{ width: 500 }}>
		// 	<Toastr
		// 		anchorOrigin={{ vertical, horizontal }}
		// 		open={isOpen}
		// 		onClose={closeToastr}
		// 		message={message}
		// 		key={vertical + horizontal + message}
		// 		severity={type}
		// 	/>
		// </Box>
		<div />
	);
};

ToastrComponent.defaultProps = {};

ToastrComponent.propTypes = {};

export default ToastrComponent;
