import React, { useState } from 'react'
import {Modal, Button} from 'react-bootstrap';
const PicViewer = ({formik, deletePic}) => {
    const [idToDelete, setIdToDelete] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
            setIdToDelete(id);
            setShow(true);
    }
    const confirmDelete = () => {
            deletePic(idToDelete);
            handleClose();
            setIdToDelete(null);
    }


    return (
            <>
            {formik.values && formik.values.images ? 
            formik.values.images.map((item, i)=> (
                <div
                    key={i} 
                    className="pic_block"
                    onClick={()=> handleShow(i)}
                    style={{background: `url(${item})`}}
                    >       
                </div>
            ))
            : null}
                <Modal show={show} onHide={handleClose} >
                          <Modal.Header closeButton >
                            <Modal.Title>Confirm Delete</Modal.Title>
                         </Modal.Header>
                        <Modal.Body>
                            Are you sure want to delete this?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose} >
                                Close
                            </Button>
                            <Button variant="danger" onClick={confirmDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                </Modal>
            </>
            
    )
}

export default PicViewer
