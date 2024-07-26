// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Buffer } from 'buffer';
import {
	leftStaticFormFields,
	rightStaticFormFields,
	getInitialValues,
	// validationSchema,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
// import { addSuperAdminUserStart, getAllAdmins } from '../../../store/actions';
// import { showToastr } from '../../../utils/helpers';
// import { formPageTitle } from '../../../components/Common/constants';
// import { decryptCredentials } from '../../../network/storageUtils';
// import { getRolesStart } from '../../../store/auth/roles/actions';

const useCreate = () => {
	// const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleStaffSubmit = () => {};

	const { validation, leftFormFields, rightFormFields } = useForm({
		header: '',
		initialValues: getInitialValues(),
		onSubmitEntry: handleStaffSubmit,
		leftStaticFormFields,
		rightStaticFormFields,
	});

	return {
		validation,
		leftFormFields,
		rightFormFields,
		navigate,
	};
};

export default useCreate;
