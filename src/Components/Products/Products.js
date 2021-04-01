
import React from 'react';
import { CardDeck, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Products = (props) => {
    const { productname, price, imageURL, _id } = props.pd;
    console.log("Props", props.pd)

    return (

        <div className="col-md-4 mt-2">
            <CardDeck>
                <Card>
                    <Card.Img variant="top" src={imageURL} />
                    <Card.Body>
                        <Card.Title>{productname}</Card.Title>
                        <Card.Text>
                           
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>

                        <div className="d-flex example-parent">
                            <div className="mr-auto p-2 col-example">
                                <h3>${price}</h3>
                            </div>
                            <div className="p-2 col-example"><Button ><Link className="text-light" to={`/product/`+_id}>Buy Now</Link> </Button></div>
                        </div>
                    </Card.Footer>
                </Card>

            </CardDeck>
        </div>

    );
};

export default Products;