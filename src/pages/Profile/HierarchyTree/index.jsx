import React, { useEffect } from 'react';
import Tree from 'react-d3-tree';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
	getAdminChildren,
	getAdminChildrenSuccess,
} from '../../../store/admins/actions';
import NodeLabel from './NodeLabel';

const HierarchyTree = ({ adminDetails }) => {
	const dispatch = useDispatch();
	const { adminChildren } = useSelector((state) => state.AllAdmins);

	const getChildren = async (id, superRoleId) => {
		dispatch(
			getAdminChildren({
				superAdminId: id,
				parentAdmin: adminDetails.name,
				superRoleId,
			})
		);
	};

	const containerStyles = {
		width: '100%',
		height: '100vh',
	};

	useEffect(() => {
		dispatch(getAdminChildrenSuccess(adminDetails));
	}, []);

	return (
		<div style={containerStyles}>
			{adminDetails && adminChildren && (
				<Tree
					data={adminChildren}
					orientation="vertical"
					translate={{ x: 550, y: 100 }}
					collapsible={false}
					separation={{ siblings: 1.3, nonSiblings: 2 }}
					onNodeClick={(e) => {
						getChildren(e?.data?.id, e.data?.data?.adminRoleId);
					}}
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
