import React from 'react'
import * as Yup from 'yup';
import {useFormik} from 'formik';
import { errorHelper } from 'utils/tools';
import { TextField } from '@material-ui/core';



const SearchBar = ({handleKeywords}) => {
    const formik = useFormik({
        initialValues : {keywords: ''},
        validationSchema : Yup.object({
            keywords : Yup.string().min(3, 'You need search more than 3').max(200, 'you need to search less than 200')
        }),
        onSubmit: (values, {resetForm})=> {
            handleKeywords(values.keywords);
            resetForm();
        }
    })
    return (
        <div className="container">
            <form className="mt-3" onSubmit={formik.handleSubmit}>
                <div>
                    <TextField 
                        style={{width: '100%'}}
                        placeholder='Search guitar'
                        variant='outlined'
                        {...formik.getFieldProps('keywords')}
                        {...errorHelper(formik, 'keywords')}
                    />
                </div>
                
            </form>
        </div>
    )
}

export default SearchBar;
