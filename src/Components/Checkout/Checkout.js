import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { useParams } from 'react-router';
import { UserContext } from '../../App';

const Checkout = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    const [product, setProduct] = useState([])
    const { productID } = useParams();
    console.log("productid", productID)
    useEffect(() => {
        fetch(`https://rhubarb-crumble-96713.herokuapp.com/product/${productID}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [productID])
    console.log("chekout data", product)
    const HeandleCheckout = () => {
        console.log('Checked')
        const CheckoutData = {
            productname: product.productname,
            price: product.price,
            wight: product.wight,
            photo: product.imageURL,
            quaintity: 1,
            displayName: LoggedInUser.displayName,
            email: LoggedInUser.email,
            orderTime: new Date()
        }

        fetch('https://rhubarb-crumble-96713.herokuapp.com/addOrder', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(CheckoutData)
        })
            .then(res => res.json())
            .then(data => alert("Order successfully"))
    }

    return (
        <div>
            <Container>
                <Row>
                    <h2>Checkout</h2>
                    <Table striped bordered hover className="text-center">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Wight</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{product.productname}</td>
                                <td>{product.wight}</td>
                                <td>1</td>
                                <td>${product.price}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <button className="btn btn-warning" onClick={HeandleCheckout}>Checkout</button>
                </Row>
            </Container>
        </div>
    );
};

export default Checkout;