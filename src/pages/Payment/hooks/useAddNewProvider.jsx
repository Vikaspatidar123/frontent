import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import {
    // leftStaticFormFields,
    // rightStaticFormFields,
    getInitialValues,
    // validationSchema,
} from '../formDetails';
import useForm from '../../../components/Common/Hooks/useFormModal';
import { addSuperAdminUserStart, getAllAdmins } from '../../../store/actions';
import { showToastr } from '../../../utils/helpers';
import { formPageTitle } from '../../../components/Common/constants';
import { decryptCredentials } from '../../../network/storageUtils';
import { getRolesStart } from '../../../store/auth/roles/actions';

const useCreate = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleStaffSubmit = (values) => {

    };


    const {
        validation,
        leftFormFields,
        rightFormFields,
    } = useForm({
        header: '',
        initialValues: getInitialValues(null),
        // validationSchema: validationSchema(),
        onSubmitEntry: handleStaffSubmit,
        // leftStaticFormFields: leftStaticFormFields(),
        // rightStaticFormFields: rightStaticFormFields(),
    });

    return {
        validation,
        leftFormFields,
        rightFormFields,
        navigate,
    };
};

export default useCreate;
