import React, { useEffect, useReducer, useState } from 'react';
import DashboardLayout from 'hoc/dashboardLayout';
import { useSelector, useDispatch } from 'react-redux';
import { productByPaginate, productRemove } from 'store/actions/product.actions';
import ProductsTable from './productsTable';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {TextField } from '@material-ui/core';
import { errorHelper } from 'utils/tools';
import { Button } from 'react-bootstrap';

const defaultValue = {keywords: '', brand: [], min: 0, max: 10000, frets: [], page: 1};

const AdminProducts = props => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const notifications = useSelector(state => state.notifications);
    const [searchValues, setSearchValues ] = useReducer(
        (state, newState) => ({...state, ...newState}), defaultValue);


    // get id remove item
    const [toRemove, setToRemove] = useState(null);

    const [removeModal, setRemoveModal] = useState(false);

    // modal
    const handleClose = () => {
        setRemoveModal(false);
    }
    const handleModal = (id) => {
        setToRemove(id);
        setRemoveModal(true);
    }

    // actions
    const handleRemove = () => {
        dispatch(productRemove(toRemove));
    }    
    const goToEdit = (id) => {
        navigate(`/dashboard/admin/edit_products/${id}`)
    }

    // pagination
    const goToPage = (page) => {
        setSearchValues({
            page
        })
    }


    const formik = useFormik({
        initialValues: {
            keywords: '',
        },
        validationSchema: Yup.object({
            keywords: Yup.string().min(3, 'You need more than3').max(200, 'Your search is to long')
        }),
        onSubmit: (value, {resetForm}) => {
            setSearchValues({keywords: value.keywords, page: 1});
            resetForm();
        }
    })

    const resetSearch =()=> {
        setSearchValues(defaultValue);
    }

    useEffect(()=> {
        dispatch(productByPaginate(searchValues))
        console.log(searchValues);
    }, [dispatch, searchValues]);


    useEffect(()=> {
        handleClose();
        setRemoveModal(null)
        if(notifications && notifications.removeArticle) {
            dispatch(productByPaginate(searchValues)) 
        }
    }, [dispatch, searchValues, notifications])

    return(
        <DashboardLayout title="Products">
           <div className="products_table">
            <div>
                <form className="mt-3" onSubmit={formik.handleSubmit} >
                    <TextField
                        style={{width: '100%'}}
                        name="keywords"
                        label="your search"
                        variant="outlined"
                        {...formik.getFieldProps('keywords')}
                        {...errorHelper(formik, 'keywords')}
                    />
                </form>
                <Button onClick={()=> resetSearch}>
                    Reset search
                </Button>

            </div>
            <ProductsTable
                removeModal={removeModal}
                handleClose={()=> handleClose()}
                handleModal={(id)=> handleModal(id)}
                handleRemove={()=> {handleRemove()}}
                prods={products.byPaginate}
                prev={(page)=> goToPage(page)}
                next={(page)=> goToPage(page)}
                goToEdit={(id)=> goToEdit(id)}

            />
           </div>
        </DashboardLayout>
    )

}


export default AdminProducts;