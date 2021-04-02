import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from "react-hook-form";
const AddProduct = () => {
    const [imageURL, setimgeURL] = useState(null)
    const [addProduct, setProduct] = useState({
        success: ''
    })
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
        console.log(data)
        const eventData = {
            productname: data.productname,
            wight: data.wight,
            price: data.price,
            imageURL: imageURL
        }
        console.log("img", eventData)
        fetch('https://rhubarb-crumble-96713.herokuapp.com/addProduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventData)
        })
            .then(res => res.json())
            .then(data => {
                //alert("Product added successfully")
                const succesMessage = { ...addProduct }
                succesMessage.success = true
                setProduct(data)
                setProduct(succesMessage)

            })
    };
    const imageHandler = (event) => {
        console.log("img envet", event.target.files[0])
        const imageData = new FormData();
        imageData.set('key', 'a29eac8576e54e0e158dcc9af18268c4')
        imageData.append('image', event.target.files[0])

        axios.post('https://api.imgbb.com/1/upload', imageData)
            .then(function (response) {
                console.log("img url", response.data.data.display_url)
                setimgeURL(response.data.data.display_url);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <div className="bg-light p-5">
            {addProduct.success && <div className="alert alert-success" role="alert">New product added Successfully.</div>}
            <form onSubmit={handleSubmit(onSubmit)}>
                <Container>
                    <h3>Add product</h3>
                    <Row>
                        <Col sm={6}>
                            <Form.Group >
                                <Form.Label>Product Name</Form.Label>
                                <Form.Control name="productname" type="text" placeholder="Product Name" ref={register({ required: true })} />
                                <Form.Text className="text-muted">
                                    {errors.productname && <span>Product Name field is required</span>}
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group >
                                <Form.Label>Wight</Form.Label>
                                <Form.Control type="text" placeholder="Wight" name="wight" ref={register({ required: true })} />
                                <Form.Text className="text-muted">
                                    {errors.wight && <span>This field is required</span>}
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <Form.Group >
                                <Form.Label>Add Price</Form.Label>
                                <Form.Control name="price" type="number" placeholder="Enter Price" ref={register({ required: true })} />
                                <Form.Text className="text-muted">
                                    {errors.price && <span>This field is required</span>}
                                </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col sm={6}>
                            <Form.Group >
                                <Form.Label>Add Photo</Form.Label>
                                <Form.Control type="file" name="image" onChange={imageHandler} />
                                <Form.Text className="text-muted">
                                    {errors.image && <span>This field is required</span>}
                                </Form.Text>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="text-right">
                        <Col>
                            <Button variant="primary" type="submit" size="sm" block>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </form>
        </div>
    );
};

export default AddProduct;