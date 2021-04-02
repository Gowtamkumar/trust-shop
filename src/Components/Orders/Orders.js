import LoaddingSpnner from '../Photo/Homepageloadingspnner.gif';
import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { UserContext } from '../../App';

const Orders = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(LoggedInUser)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        fetch('https://rhubarb-crumble-96713.herokuapp.com/Orders?email=' + LoggedInUser.email)
            .then(res => res.json())
            .then(ordersData => setOrders(ordersData))
    }, [])
    console.log(orders)
    return (
        <Container>
            <Row>
                <h2>Orders</h2>
                <Table striped bordered hover className="text-center">
                    <thead>
                        <tr>
                            <th style={{ width: 600 }}>Items</th>
                            <th>Wight</th>
                            <th>Price</th>
                            <th>Photo</th>
                            <th>Quantity</th>
                            <th>Order Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.length === 0 && <img src={LoaddingSpnner} alt="" />
                        }
                        {
                            orders.map(order =>
                                <tr>
                                    <td>{order.productname}</td>
                                    <td>{order.wight}</td>
                                    <td>${order.price}</td>
                                    <td>
                                        <img src={order.photo} className="img-fluid" style={{ width: 40 }} alt="" />
                                    </td>
                                    <td>{order.quaintity}</td>
                                    <td>{(new Date(order.orderTime).toDateString('dd/MM/yyyy'))}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
};

export default Orders;