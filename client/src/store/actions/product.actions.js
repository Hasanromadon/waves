import axios from 'axios';
import { getAuthHeader } from 'utils/tools';
import * as actions from './index';

export const productsBySort = ({limit, sortBy, order, where}) => {

    return async(dispatch) => {
        try {
            const products = await axios.get('/api/products/all',  {
                params :  {
                    limit,
                    sortBy,
                    order
                }
            });
            switch(where){
                case 'bySold':
                    dispatch(actions.productsBySold(products.data))
                break;
                case 'byDate':
                    dispatch(actions.productsByDate(products.data))
                break;
                default:
                return false
            }
            
        } catch(error) {
            dispatch(actions.errorGlobal('Server error'));
            console.log(error);
        }
    }
}

export const productByPaginate = (args) => {
    return async(dispatch) => {
        try {
            const products = await axios.post('/api/products/paginate/all', args);
            dispatch(actions.productByPaginate(products.data));

        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}
export const productRemove = (id) => {
    return async(dispatch) => {
        try {
           await axios.delete(`/api/products/product/${id}`, getAuthHeader());
            
            dispatch(actions.productRemove())
            dispatch(actions.successGlobal());

        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}
export const productAdd = (data) => {
    return async(dispatch) => {
        try {
            const product = await axios.post(`/api/products/`,data, getAuthHeader());
            
            dispatch(actions.productAdd(product.data))
            dispatch(actions.successGlobal());

        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}
export const productsById = (id) => {
    return async(dispatch) => {
        try {
            const product = await axios.get(`/api/products/product/${id}`);
            
            dispatch(actions.productsById(product.data))

        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}
export const productsEdit = (values, id) => {
    return async(dispatch) => {
        try {
            await axios.patch(`/api/products/product/${id}`, values, getAuthHeader());
            
            // dispatch(actions.productsEdit(product.data))
            dispatch(actions.successGlobal('Update done'));

        } catch(error) {
            dispatch(actions.errorGlobal(error.response.data.message));
        }
    }
}