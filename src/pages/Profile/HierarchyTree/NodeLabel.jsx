import React from 'react';
import PropTypes from 'prop-types';

class NodeLabel extends React.PureComponent {
	render() {
		const { nodeDatum, onNodeClick } = this.props;

		return (
			<g>
				<circle
					r={15}
					fill="#556ee6"
					stroke="white"
					strokeWidth={3}
					onClick={onNodeClick}
				/>
				<text
					strokeWidth="0"
					x="20"
					y="4"
					fill="#74788d"
					fontSize="18px"
					className="fas"
					onClick={onNodeClick}
				>
					{nodeDatum?.isInitial ? '' : '\uf007'}
				</text>
				<text
					strokeWidth="1"
					x={nodeDatum?.isInitial ? '25' : '40'}
					y="3"
					onClick={onNodeClick}
				>
					{nodeDatum?.name}
				</text>
			</g>
		);
	}
}

NodeLabel.defaultProps = {
	nodeDatum: {},
	onNodeClick: () => {},
};

NodeLabel.propTypes = {
	nodeDatum: PropTypes.objectOf(),
	onNodeClick: PropTypes.func,
};

export default NodeLabel;
