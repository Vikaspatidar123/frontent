import React from 'react';
import Tree from 'react-d3-tree';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import NodeLabel from './NodeLabel';

const HierarchyTree = ({ adminDetails }) => {
	const { adminChildren } = useSelector((state) => state.AllAdmins);

	const containerStyles = {
		width: '100%',
		height: '100vh',
	};

	return (
		<div style={containerStyles}>
			{adminDetails && adminChildren && (
				<Tree
					data={adminChildren}
					orientation="vertical"
					translate={{ x: 550, y: 100 }}
					collapsible={false}
					separation={{ siblings: 1.3, nonSiblings: 2 }}
					// onNodeClick={(e) => {
					// 	getChildren(e?.data?.id);
					// }}
					renderCustomNodeElement={({ nodeDatum, onNodeClick }) => (
						<NodeLabel nodeDatum={nodeDatum} onNodeClick={onNodeClick} />
					)}
				/>
			)}
		</div>
	);
};

HierarchyTree.defaultProps = {
	adminDetails: {},
};

HierarchyTree.propTypes = {
	adminDetails: PropTypes.objectOf(),
};

export default HierarchyTree;
