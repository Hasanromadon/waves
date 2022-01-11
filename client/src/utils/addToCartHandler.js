import React, { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

const AddToCartHandler =({modal, errorType, handleClose})=>{
    return(
        <>
            <Modal show={modal} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title> Sorry: </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorType === 'auth'? <div>Sorry, need register or sign in to continue</div> : 
                    <div>Sorry, need to verify account</div> }
                </Modal.Body>
                <Modal.Footer>
                    {errorType === 'auth' ? 
                    <LinkContainer to="/sign_in">
                        <Button>Go To Register or Sign in</Button>
                    </LinkContainer> :
                    <Button variant='primary' onClick={()=> alert('ok')}>
                        Send email verification
                    </Button>
                    }
                </Modal.Footer>
            </Modal>
        </>
    )


}

export default AddToCartHandler;