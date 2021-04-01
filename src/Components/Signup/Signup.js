
import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
import { UserContext } from '../../App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


const Signup = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)
    console.log("text user email", LoggedInUser.email)
    const [user, setUser] = useState({
        error: '',
        success: ''
    })

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const { register, handleSubmit, watch, errors } = useForm();

    const onSubmit = data => {
        console.log(data.name, data.email, data.password)
        // Create account
        firebase.auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(res => {
                const user = res.user;
                const succesMessage = { ...user }
                succesMessage.success = true
                // alert("New Create account  successfully")
                setUser(user)
                setUser(succesMessage)
                setLoggedInUser(user)
                history.replace(from)
            })
            .catch(error => {
                const errorMessage = { ...user }
                errorMessage.error = error.message;
                errorMessage.success = false
                console.log(errorMessage)
                setUser(errorMessage)
            });
    };



    const HandelGoogleSignin = () => {
        console.log("click hero")
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                const user = result.user;
                setUser(user)
                setLoggedInUser(user)
                history.replace(from);

            }).catch((error) => {
                const errorMessage = error.message;

            });

    }
    return (
        <div className="p-5 container">
            <div className="row d-flex justify-content-center">

                <div className="col-example p-5 bg-light">
                    {user.error && <div className="alert alert-danger" role="alert">The email address is already in use by another account.</div>}
                    {user.success && <div className="alert alert-success" role="alert">New Create account  successfully.</div>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Container>
                            <h3 className="text-center mb-4">Create account</h3>
                            <Row>
                                <Col>
                                    <Form.Group >
                                        <Form.Control name="name" type="text" placeholder="Full Name" ref={register({ required: true })} />
                                        <Form.Text className="text-muted">
                                            {errors.name && <span>This field is required</span>}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group >

                                        <Form.Control name="email" type="email" placeholder="Your Email" ref={register({ required: true })} />
                                        <Form.Text className="text-muted">
                                            {errors.email && <span>This field is required</span>}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group >

                                        <Form.Control name="password" type="text" placeholder="Your password" ref={register({ required: true })} />
                                        <Form.Text className="text-muted">
                                            {errors.password && <span>This field is required</span>}
                                        </Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="primary" type="submit" size="sm" block>
                                        Create an account
                                    </Button>
                                    <span>Already Have a account ? <Link to="/login">Login account</Link></span>
                                </Col>
                            </Row>
                            <hr />
                            <Row>
                                <Col>
                                    <Button variant="primary" size="sm" block onClick={HandelGoogleSignin}>
                                        <FontAwesomeIcon icon={['fab', 'google']} /> Continue with Google
                                </Button>
                                </Col>
                            </Row>
                        </Container>
                    </form>

                </div>



            </div>
        </div>
    );
};

export default Signup;