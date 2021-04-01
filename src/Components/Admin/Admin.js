import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import AddProduct from './AddProduct/AddProduct';
import EditProduct from './EditProduct/EditProduct';
import ManageProducts from './ManageProducts/ManageProducts';

const Admin = () => {
    return (

        <div>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                    <h2> Dashboard</h2>
                        <Router>
                            <div>
                                <ul>
                                    <li>
                                        <Link to="/manageproducts">Manage Products</Link>
                                    </li>
                                    <li>
                                        <Link to="/addproduct">Add Product</Link>
                                    </li>
                                    <li>
                                        <Link to="/editproduct">Edit Product</Link>
                                    </li>
                                </ul>
                                <hr />
                                <Switch>
                                    <PrivateRoute exact path="/manageproducts">
                                        <ManageProducts />
                                    </PrivateRoute>
                                    <PrivateRoute path="/addproduct">
                                        <AddProduct />
                                    </PrivateRoute>
                                    <PrivateRoute path="/editproduct">
                                         <EditProduct />   
                                    </PrivateRoute>
                                </Switch>
                            </div>
                        </Router>
                    </div>
                    
                </div>
            </div>
            

        </div>
    );
};

export default Admin;