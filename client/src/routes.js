import React, { useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainLayout from 'hoc/mainLayout';
import Header from 'components/navigation/header';
import Footer from 'components/navigation/footer';
import Home from 'components/home';
import RegisterLogin from 'components/auth';
import Loader from 'utils/loader';
import { useDispatch, useSelector } from 'react-redux';
import { userIsAuth, userSignOut } from 'store/actions/user.actions';
import authGuard from 'hoc/authGuard';
import Dashboard from './components/dashboard';
import UserInfo from 'components/dashboard/user/info';
import AdminProducts from 'components/dashboard/admin/products';
import AddProducts from 'components/dashboard/admin/products/add_edit/add';
import EditProduct from 'components/dashboard/admin/products/add_edit/edit';
import Shop from 'components/shop';
import ProductDetail from 'components/product';
import UserCart from './components/dashboard/user/cart';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const App = (props) => {
  const [loading, setLoading] = useState(true);
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  const MainDashboard = authGuard(Dashboard);
  const UserInfoGuard = authGuard(UserInfo);
  const AddProductGuard = authGuard(AddProducts);
  const EditProductGuard = authGuard(EditProduct);
  const AdminProductGuard = authGuard(AdminProducts);
  const UserCartGuard = authGuard(UserCart);

  useEffect(()=> {
    dispatch(userIsAuth());
  }, [dispatch]);

  useEffect(()=> {
    if(users.auth !== null){
      setLoading(false);
    }
  },[users])
  
  const signOutUser = () => {
   dispatch(userSignOut())
  }

    return (
      <PayPalScriptProvider
      options={{
        "client-id": 'AafF-ilgCw3zH_008annZos2hxDEIFZmCbsR2PsTGOTd69oc8YZtNEgtmh3Bm5uSqQPinfmwaQywbYU0',
        currency: 'USD'
    }}
      
      >
      <BrowserRouter>
      {loading ? <Loader full={true} /> :
      <>
        <Header 
          users={users} 
          signOutUser={signOutUser}
        />
        
        <MainLayout>
          <Routes>
            <Route path="/dashboard/user/user_cart" element={<UserCartGuard/>} />
            <Route path="/product_detail/:id" element={<ProductDetail/>} />
            <Route path="/dashboard/admin/add_products" element={<AddProductGuard/>} />
            <Route path="/dashboard/admin/edit_products/:id" element={<EditProductGuard/>} />
            <Route path="/dashboard/admin/admin_products" element={<AdminProductGuard/>} />
            <Route path="/dashboard/user/user_info" element={<UserInfoGuard/>} />
            <Route path="/dashboard" element={<MainDashboard/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/sign_in" element={<RegisterLogin/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
          </MainLayout>
          <Footer/>
      </>}
      
      </BrowserRouter>
      </PayPalScriptProvider>
    );
  };

export default App;
