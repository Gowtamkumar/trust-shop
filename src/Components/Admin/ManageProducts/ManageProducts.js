import DeleteIcon from '../../Photo/delete.png'
import LoaddingSpnner from '../../Photo/Homepageloadingspnner.gif';
import React, { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';

const ManageProducts = () => {
    const [manageProducts, setManageProducts] = useState([])
    useEffect(() => {
        fetch('https://rhubarb-crumble-96713.herokuapp.com/products')
            .then(res => res.json())
            .then(data => setManageProducts(data))
    }, [])
    const productDelete = (id) => {
        console.log(id)
        fetch(`https://rhubarb-crumble-96713.herokuapp.com/deleteproduct/${id}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(result => alert("Delete Successfully"))
    }
    return (
        <Container>
            <Row>
                <h2>Manage Products</h2>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th style={{ width: 600 }}>Product Name</th>
                            <th>Wight</th>
                            <th>Price</th>
                            <th>Photo</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            manageProducts.length === 0 && <img src={LoaddingSpnner} alt="" />
                        }
                        {
                            manageProducts.map(mp =>
                                <tr>
                                    <td>{mp.productname}</td>
                                    <td>{mp.wight}</td>
                                    <td>${mp.price}</td>
                                    <td>
                                        <img src={mp.imageURL} alt="" className="img-fluid" style={{ width: 40 }} />
                                    </td>
                                    <td>
                                        <button className="btn btn-warning">Edit</button> <button className="btn btn-danger" onClick={() => productDelete(mp._id)}> <img src={DeleteIcon} alt="" style={{width:20}}/></button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>

    );
};

export default ManageProducts;