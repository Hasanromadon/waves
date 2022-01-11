import React, { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { userAddToCart } from 'store/actions/user.actions';
import AddToCartHandler from 'utils/addToCartHandler';
import { renderCardImage, WavesButton } from 'utils/tools'
const Card = ({grid, item}) => {
    const [modal, setModal] = useState(false);
    const [errorType, setErrorType] = useState(null);
    const user = useSelector(state => state.users);
    const dispatch = useDispatch();

    const handleClose =()=> setModal(false);

    const handleAddToCart =(item)=> {
        if(!user.auth) {
            setModal(true);
            setErrorType('auth')
            return false;
        }
        if(!user.data.verified) {
            setModal(true);
            setErrorType('verified')
            return false
        }
        dispatch(userAddToCart(item));

    }
    return (
        <div className={`card_item_wrapper ${grid ? 'grid_bars' : ''}`}>
            <div className="image" style={{
                background : `url(${renderCardImage(item.images)})`
            }}></div>
            <div className="action_container">
                <div className="tags">
                    <div className="brand">{item.brand.name}</div>
                    <div className="name">{item.model}</div>
                    <div className="name">${item.price}</div>
                </div>
                {grid ? <div className="description">{item.description}</div> :null}
                <div className="actions">
                    <div className="button_wrapp">
                        <WavesButton
                            type="default"
                            altClass="card_link"
                            title="View product"
                            linkTo={`/product_detail/${item._id}`}
                            style={{
                                fontWeight:'bold'
                            }}
                        />
                    </div>
                    <div className="button_wrapp">
                        <WavesButton
                            type="bag_link"
                            runAction={ ()=> handleAddToCart(item) }
                            iconSize="23"
                        />
                    </div>
                </div>
            </div>

            <AddToCartHandler 
                modal={modal}
                errorType={errorType}
                handleClose={handleClose}
            />

        </div>
    )
}

export default Card
