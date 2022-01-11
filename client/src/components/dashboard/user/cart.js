import React, { useState, useEffect} from 'react';
import DashboardLayout from 'hoc/dashboardLayout';
import Loader from 'utils/loader';
import CartDetail from './cartDetail';

import { useDispatch,useSelector} from 'react-redux';
import { removeFromCart, userPurchaseSuccess } from 'store/actions/user.actions';
import  { PayPalButtons  }  from  '@paypal/react-paypal-js' ;
import { useNavigate } from 'react-router-dom';


const UserCart = (props) => {
    const [loading,setLoading] = useState(false);
    const notifications = useSelector(state=>state.notifications);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const removeItem = (position) => {
        dispatch(removeFromCart(position))
    }


    const calculateTotal = () => {
        let total = 0;
        props.users.cart.forEach(item=>{
            total += parseInt(item.price, 10);
        });
        return total;
    }

    const generateUnits =()=>(
        [{
            description: "Guitar and accesoris",
            amount: {
                currency_code: "USD",
                value: calculateTotal(),
                breakdown: {
                    item_total: {
                        currency_code: "USD",
                        value: calculateTotal()
                    }
                } 
            },
            items: generateItems()
        }]
    );
    const generateItems = () => {
        let items = props.users.cart.map((item)=>(
            {
                unit_amount:{
                    currency_code:"USD",
                    value: item.price
                },
                quantity:1,
                name: item.model
            }
        ));
        return items
    }

    useEffect(()=>{
        if(notifications && notifications.success) {
            navigate('/dashboard');
            setLoading(false);
        }
    }, [navigate, notifications])


    return(
        <DashboardLayout title="Your Cart">
            { props.users.cart && props.users.cart.length > 0 ?
                <>  
                    <CartDetail
                        products={props.users.cart}
                        removeItem={(position)=>removeItem(position)}
                    />
                    <div className="user_cart_sum">
                        <div>
                            Total amount: ${calculateTotal()}
                        </div>
                    </div>
                    {loading ? 
                    <Loader/> 
                    :
                    <>
                    {/* <div className='pp_button'>
                        <PayPalButton
                            options={{
                                clientId: 'AafF-ilgCw3zH_008annZos2hxDEIFZmCbsR2PsTGOTd69oc8YZtNEgtmh3Bm5uSqQPinfmwaQywbYU0',
                                currency: 'USD',
                                disableFunding: 'credit,card'
                            }}
                            createOrder={(data, actions)=> {
                                return actions.order.create({   
                                    purchase_units: generateUnits()
                                })
                            }}
                            onSuccess={(details, data)=> {
                                setLoading(true);
                                console.log(details);
                                dispatch(userPurchaseSuccess(details.id))
                            }}cd
                        />
                    </div> */}
                    <div className='pp_button'>
                           <PayPalButtons
                           style={{
                               color: 'silver',
                               layout: 'horizontal',
                               height: 48,
                               tagline: false,
                               shape: 'pill'
                           }}
                           createOrder={(data, actions)=> {
                               return actions.order.create({
                                   purchase_units: generateUnits()
                               })
                           }}
                           onApprove={async (data, actions)=> {
                               const order = await actions.order.capture();
                               setLoading(true);
                               dispatch(userPurchaseSuccess(order));
                           }}
                           />
                    </div>
                    </>

                    }
                </>
            :
                <div>
                    There is nothing in your cart
                </div>
            }
        </DashboardLayout>
    )

}

export default UserCart;