import React, { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Link, useHistory, useLocation } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import { UserContext } from "../../App";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(fab)

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

const Login = () => {

    const [LoggedInUser, setLoggedInUser] = useContext(UserContext)

    let history = useHistory();
    let location = useLocation();


    let { from } = location.state || { from: { pathname: "/" } };


    const [user, setUser] = useState({
        success: '',
        error: ''
    })
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data)
        firebase.auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then(res => {
                const user = res.user;
                alert("Login Successfully")
                const succesMessage = { ...user }
                succesMessage.success = true
                setUser(succesMessage)
                setLoggedInUser(user)
                history.replace(from);
            })
            .catch((error) => {
                const errorMessage = {...user}
                errorMessage.error = error.message;
                console.log(errorMessage)
                setUser(errorMessage)
            });

    };
    console.log("user check", LoggedInUser)

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
                    {user.success && <div className="alert alert-success" role="alert">Login successfully.</div>}
                    {user.error && <div className="alert alert-danger" role="alert">The password is invalid or the user does not have a password</div>}
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Container>
                            <h3 className="text-center mb-4">Login</h3>

                            <Row>
                                <Col >
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
                                        Login
                                        </Button>
                                    <span>Don't Have a account ? <Link to="/signup">Create an account</Link></span>
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

export default Login;