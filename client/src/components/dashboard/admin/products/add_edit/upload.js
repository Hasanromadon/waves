import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Loader from 'utils/loader';
import { Button, Form } from 'react-bootstrap';
import {getTokenCookie} from 'utils/tools';

const PicUpload = ({picValue}) => {
    const [loading, setLoading] = useState(false);
    const formikImg = useFormik({
        initialValues : {pic: ''},
        validationSchema : Yup.object({
            pic: Yup.mixed().required('A file is required')
        }),
        onSubmit: (values) => {
            setLoading(true);
            let formData = new FormData();
            formData.append("file", values.pic);
            console.log(formData);
           axios.post('/api/products/upload', formData, {
               headers: {
                   'content-type': 'multipart/form-data',
                   'Authorization': `Bearer ${getTokenCookie()}`
               }
           }).then((res)=> {
               picValue(res.data);


           } ).catch((error)=> {}).finally(()=> {
               setLoading(false);
           })
        }
    })
    return(
        <>
            {
                loading ? <Loader/> :
                <Form onSubmit={formikImg.handleSubmit}>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" onChange={(event)=> {
                            formikImg.setFieldValue('pic', event.target.files[0])
                        }} />
                        {formikImg.errors.pic && formikImg.touched.pic ? 
                        <div>Error</div> : null}
                    </Form.Group>
                    <Button variant="secondary" type="submit">Add Image</Button>
                </Form>

            }
        </>
    )
}

export default PicUpload;