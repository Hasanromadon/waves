import React, { useEffect, useState } from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import Loader from 'utils/loader';
import {useDispatch, useSelector} from 'react-redux';
import {TextField, Button} from '@material-ui/core';
import { errorHelper } from 'utils/tools';
import { userRegister, userSignIn } from 'store/actions/user.actions';
import { useNavigate } from 'react-router-dom';

const AuthForm =(props)=> {
    let navigate = useNavigate();
    const notifications = useSelector(state => state.notifications);  
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues : {email: '', password: ''},
        validationSchema : Yup.object({
            email: Yup.string().required('Sorry the email is required').email('This is invalid email'),
            password: Yup.string().required('Sorry the password is required')
        }),
        onSubmit : (values)=>{
            handleSubmit(values);
            setLoading(true);
        }
    });
    
    const handleSubmit = (values) => {
        if(props.formType) {
            // type register register 
            console.log(values);
            dispatch(userRegister(values));
        } else {
            dispatch(userSignIn(values));
        }
    }
    useEffect(()=> {
        if(notifications && notifications.success) {
            navigate('/dashboard');
        }
        setLoading(false);
    }, [notifications, navigate])
    
    return(
        <>  
            <div className="auth_container">

            { loading ?
                <Loader/>
                :
                <form className="mt-3" onSubmit={formik.handleSubmit}>
                    
                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="email"
                            label="Enter your email"
                            variant="outlined"  
                            {...formik.getFieldProps('email')}
                            {...errorHelper(formik, 'email')}

                        />
                    </div>
                    <div className="form-group">
                        <TextField
                            style={{width:'100%'}}
                            name="password"
                            label="Enter your password"
                            variant="outlined"  
                            type="password"
                            {...formik.getFieldProps('password')}
                            {...errorHelper(formik, 'password')}

                        />
                    </div>
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        size="small"
                    >
                        { props.formType ? 'Register':'Login'}
                    </Button>

                </form>    
            }


            </div>
        </>
    )
}


export default AuthForm;