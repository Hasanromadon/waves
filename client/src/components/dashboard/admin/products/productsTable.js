import React from 'react'
import { Pagination, Table, Modal, Button } from 'react-bootstrap'
import Moment from 'react-moment'
import { LinkContainer } from 'react-router-bootstrap'
import Loader from 'utils/loader'
const ProductsTable = ({prods, prev, next, goToEdit, removeModal, handleClose, handleModal, handleRemove}) => {

    const goToPrevPage = (page)=> { 
       prev(page); 
    }
    const goToNextPage = (page)=> {
       next(page);
    }

    return (
        <>{
            prods && prods.docs ?
            <>
                <Table className="mt-3" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Created</th>
                            <th>Model</th>
                            <th>Available</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {prods.docs.map((item)=>(
                            <tr key={item._id}>
                                <td> <Moment to={item.date}></Moment></td>
                                <td>{item.model}</td>
                                <td>{item.available}</td>
                                <td className="action_btn remove_btn" onClick={()=>handleModal(item._id)} >Remove</td>
                                <td className="action_btn edit_btn" onClick={()=>goToEdit(item._id)} >Edit</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Pagination>
                    {prods.hasPrevPage ? 
                        <>
                        <Pagination.Prev onClick={()=> goToPrevPage(prods.prevPage)}/>
                        <Pagination.Item onClick={()=> goToPrevPage(prods.prevPage)}>{prods.prevPage}</Pagination.Item>
                        </> : null
                    }
                    <Pagination.Item active>{prods.page}</Pagination.Item>

                    {prods.hasNextPage ? 
                        <>
                        <Pagination.Item onClick={()=> goToNextPage(prods.nextPage)}>{prods.nextPage}</Pagination.Item>
                        <Pagination.Next onClick={()=> goToNextPage(prods.nextPage)}/>
                      
                        </> : null
                    }

                </Pagination>
                <hr/>
                <LinkContainer to={'/dashboard/admin/add_products'}>
                    <Button variant="secondary" >Add Product</Button>
                </LinkContainer>
            </> :
            <Loader/>
        }

        <Modal show={removeModal} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    Are You Sure?
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Thre is going back
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>Opps Close This Now</Button>
                    <Button variant="danger" onClick={handleRemove} >DELETE</Button> 
            </Modal.Footer>
        </Modal>


        </>
    )
}

export default ProductsTable

