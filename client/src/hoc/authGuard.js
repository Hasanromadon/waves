import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from 'utils/loader';

export default function authGuard(ComposedComponent) {
    const AuthenticationCheck = (props) => {
        const [isAuth, setIsAuth] = useState(false);
        const users = useSelector(state => state.users);
        const navigate = useNavigate();

        useEffect(()=> {
            if(!users.auth){
            
                navigate('/');

            } else {

                setIsAuth(true);
            }
        }, [users, navigate]);

        if(!isAuth) {
            return(
                <Loader full={true}/>
            ) 
        }else {
            return <ComposedComponent users={users} {...props} />
            
        }


    }
    return AuthenticationCheck;
}