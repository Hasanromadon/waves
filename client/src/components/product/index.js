import React, { useEffect, useState } from 'react';
import ProdNfo from './prodNfo';

import { useDispatch, useSelector } from 'react-redux';
import { productsById } from 'store/actions/product.actions';
import { clearCurrentProduct } from 'store/actions'
import Loder from 'utils/loader';
import { useParams } from 'react-router-dom';
import { renderCardImage } from 'utils/tools';
import { Modal } from 'react-bootstrap';
import Slider from 'react-slick';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const ProductDetail = () => {
    const products = useSelector(state=> state.products);
    const dispatch = useDispatch();
    const params = useParams('id');
    const [modal, setModal ] = useState(false);
    const sliderSetting = {
        dot:false,
        infinite:true,
        speed:500,
        slidesToShow:1,
        slidesToScroll:1
    };
    const handleClose = () => setModal(false);
    const handleCarrousel = () => {
        if(products.byId.images.length > 0){
            setModal(true);
        }
    }

    useEffect(()=>{
        dispatch(productsById(params.id))
    },[dispatch, params.id]);


    useEffect(()=>{
        return()=>{
            dispatch(clearCurrentProduct())
        }
    },[dispatch])


    return(
        <div className="page_container">
            <div className="page_top">
                <div className="container">
                    Product detail
                </div>
            </div>
            <div className="container">
                { products && products.byId ?
                    <div className="product_detail_wrapper">
                        <div className="left">
                            <div>
                                <img 
                                    alt={products.byId.model}
                                    src={renderCardImage(products.byId.images)}
                                    onClick={()=> handleCarrousel()}
                                />
                            </div>
                        </div>
                        <div className="right">
                            <ProdNfo
                                detail={products.byId}
                            />
                        </div>
                    </div>
                :
                    <Loder/>
                }

            <Modal show={modal} onHide={handleClose} dialogClassName="modal-90w">
                    <Modal.Header closeButton></Modal.Header>      
                    <Modal.Body>
                        <Slider {...sliderSetting}>
                                    { products.byId && products.byId.images ?
                                        products.byId.images.map((item)=>(
                                            <div key={item} style={{margin:'0 auto'}}>
                                                <div className="img-block"
                                                    style={{
                                                        background:`url(${item}) no-repeat`
                                                    }}
                                                ></div>
                                            </div>
                                        ))
                                    :null
                                    }
                        </Slider>
                    </Modal.Body>           
            </Modal>
            </div>
        </div>
    )
}

export default ProductDetail;