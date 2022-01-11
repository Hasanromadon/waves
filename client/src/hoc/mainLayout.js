import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer, toast} from 'react-toastify';
import { showToast } from 'utils/tools';
import { useDispatch, useSelector } from 'react-redux';
import { clearNotification } from 'store/actions';
const MainLayout =(props)=> {
    const notifications = useSelector(state => state.notifications);
    const dispatch = useDispatch()
    useEffect(()=> {
        if(notifications && notifications.error) {
            showToast('ERROR', notifications.msg ? notifications.msg : 'Error');
            dispatch(clearNotification())
        }
        if(notifications && notifications.success) {
            showToast('SUCCESS', notifications.msg ? notifications.msg : 'Success!');
            dispatch(clearNotification())
        }
        
    },[notifications, dispatch])
    return(
        <>
        {props.children}
        <ToastContainer/>
        </>
    )
}


export default MainLayout;