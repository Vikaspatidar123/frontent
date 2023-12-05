import React, { useEffect, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import PropTypes from 'prop-types';

const ImageCell = ({ imgSrc, cellImageCustomWidth }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [imageHasError, setImageHasError] = useState(false);
	const toggle = () => setIsModalOpen((prev) => !prev);

	useEffect(() => {
		if (!imgSrc) {
			setImageHasError(true);
		}
	}, [imgSrc]);

	return (
		<span
			tabIndex={0}
			role="button"
			onClick={!imageHasError && toggle}
			onKeyDown={!imageHasError && toggle}
			className={!imageHasError ? 'imageCellContent' : ''}
		>
			{isModalOpen && (
				<Modal isOpen={isModalOpen} toggle={toggle}>
					<ModalHeader toggle={toggle} tag="h4">
						Image Preview
					</ModalHeader>
					<ModalBody
						style={{
							padding: '50px',
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<img style={{ maxWidth: '100%' }} src={imgSrc} alt="thumbnail" />
					</ModalBody>
				</Modal>
			)}
			{!imageHasError ? (
				<img
					src={imgSrc}
					onError={() => setImageHasError(true)}
					alt="thumbnail"
					style={{ maxWidth: cellImageCustomWidth }}
				/>
			) : (
				'-'
			)}
		</span>
	);
};

ImageCell.defaultProps = {
	cellImageCustomWidth: 50,
};

ImageCell.propTypes = {
	imgSrc: PropTypes.string.isRequired,
	cellImageCustomWidth: PropTypes.number,
};

export default ImageCell;
