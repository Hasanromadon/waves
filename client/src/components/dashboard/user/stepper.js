import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Loader from 'utils/loader';
import { Button, Step, StepLabel, Stepper, TextField } from '@material-ui/core';
import Modal from 'react-bootstrap/Modal';
import { errorHelper } from 'utils/tools';
import {userChangeEMail} from 'store/actions/user.actions'


const EmailStepper = ({users})=> {
const [loading, setLoading] = useState(false);
const [emailModal, setEmailModal] = useState(false);
const notifications = useSelector(state => state.notifications);
const [activeStep, setActiveStep] = useState(0);
const steps = ['Enter old Email', 'Enter new Email', 'Are you sure?'];


const dispatch = useDispatch();

const formik = useFormik({
    enableReinitialize: true,
    initialValues: {email: '', newemail: ''},
    validationSchema: Yup.object({
        email: Yup.string()
        .required('This is required')
        .email('This is not valid email')
        .test('match', 'Please check youremail', (email)=> {
            return email === users.data.email
        }),
        newemail: Yup.string()
        .required('This is required')
        .email('This is not valid email')
        // custom validation
        .test('match', 'Please check youremail', (newemail)=> {
            return newemail !== users.data.email
        }),
        
    }),
    onSubmit: (values)=> {
        setLoading(true);
        dispatch(userChangeEMail(values))
        }
    })

    const closeModal =()=> setEmailModal(false);
    const openModal = () => setEmailModal(true);
    const handleNext =()=> {
        setActiveStep(prevStep => prevStep +1);
    }
    const handleBack =()=> {
        setActiveStep(prevStep => prevStep -1);
    }

    const nextBtn =()=>(
        <Button className="mt-3" variant="contained" color="primary" onClick={handleNext}>
            Next
        </Button>
    )
    const backBtn =()=>(
        <Button className="mt-3" style={{marginRight: '6px'}} variant="contained" onClick={handleBack}>
            Back
        </Button>
    );

    useEffect(()=> {

        if(notifications && notifications.success) {
            closeModal();
        }

        setLoading(false);

    }, [notifications])


    return(
        <>
            <form className="mt-3 article_form" style={{maxWidth: '250px'}}>
                <div className="form-group">
                    <TextField 
                        className="mb-3"
                        style={{width:'250px'}}
                        name="emailstatic"
                        variant="outlined"
                        disabled
                        value={users.data.email}
                        >
                    </TextField>
                </div>
                <Button
                    className="mb-3"
                    variant="contained"
                    color="primary"
                    onClick={openModal}
                    >
                    Edit Email
                </Button>
            <Modal centered size="lg" show={emailModal} onHide={closeModal}>
                <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Stepper activeStep={activeStep}>
                        {steps.map((label, index)=> (
                            <Step key={index}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                        { activeStep === 0 ? 
                        <div className="form-group">
                            <TextField
                            style={{width: '100%'}}
                            name="email"
                            label="current email"
                            variant="outlined"
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik, 'email')}
                            >
                            </TextField>
                            {formik.values.email && !formik.errors.email && nextBtn()}
                        </div> 
                        
                        : null

                        }
                    { activeStep === 1 ? 
                        <div className="form-group">
                            <TextField
                            style={{width: '100%'}}
                            name="newemail"
                            label="new email"
                            variant="outlined"
                            {...formik.getFieldProps('newemail')}
                            {...errorHelper(formik, 'newemail')}
                            >
                            </TextField>
                            {backBtn()}
                            {formik.values.newemail && !formik.errors.newemail && nextBtn()}
                        
                        </div> 
                        
                        : null

                        }
                        {activeStep === 2 ? 
                        loading? <Loader/> :
                        <>
                        {backBtn()}
                         <Button
                         className="mb-3"
                         variant="contained"
                         color="primary"
                         onClick={formik.submitForm}
                         >
                         Edit Email
                     </Button>
                     </>

                        : null
                        
                        
                        }
                </Modal.Body>
            </Modal>
            </form>
        </>
    )
}

export default EmailStepper;