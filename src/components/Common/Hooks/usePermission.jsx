// import { isEmpty } from 'lodash';
import { isEmpty } from 'lodash';
import { useSelector } from 'react-redux';

const usePermission = () => {
	const { superAdminUser } = useSelector((state) => state.PermissionDetails);
	const permissions = superAdminUser?.permissions?.[0]?.permission;

	const isGranted = (module, operation) => {
		if (!isEmpty(permissions)) {
			return (
				permissions &&
				Object.keys(permissions).includes(module) &&
				permissions[module].includes(operation)
			);
		}
		return false;
	};
	// for temporarily setting all permissions
	return { isGranted, permissions };
};

export default usePermission;
