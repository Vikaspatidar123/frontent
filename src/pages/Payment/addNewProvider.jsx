import React, { useEffect } from 'react';
import { Container } from 'reactstrap';
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import FormPage from '../../components/Common/FormPage';
import { formPageTitle } from '../../components/Common/constants';
import useAddNewProvider from './hooks/useAddNewProvider';

const AddNewProvider = () => {
    const {
        validation,
        leftFormFields,
        rightFormFields,
        isAddSuperUserLoading,
    } = useAddNewProvider();

    return (
        <div className="page-content">
            <Breadcrumbs
                title="Payment"
                breadcrumbItem="Configure"
                leftTitle={
                    <>
                        <i className="fas fa-angle-left" /> Back
                    </>
                }
                values={validation?.values}
            />
            <Container fluid>
                <FormPage
                    formTitle="Configure Payment Provider"
                    validation={validation}
                    leftFormFields={leftFormFields}
                    rightFormFields={rightFormFields}
                    submitLabel="Add"
                    customColClasses=""
                    isSubmitLoading={isAddSuperUserLoading}
                />
            </Container>
        </div>
    );
};

AddNewProvider.propTypes = {
    // t: PropTypes.func.isRequired,
};

export default AddNewProvider;
