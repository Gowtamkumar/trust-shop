import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './Components/Home/Home';
import Admin from './Components/Admin/Admin';
import Orders from './Components/Orders/Orders';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import { createContext, useState } from 'react';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import Checkout from './Components/Checkout/Checkout';
import { Col, Row } from 'react-bootstrap';

export const UserContext = createContext();

function App() {

  const [LoggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[LoggedInUser, setLoggedInUser]}>
      <Router>
        <nav className="navbar navbar-expand-md  navbar-light bg-light menustyle">
          <Link to="/" className="navbar-brand logo text-primary" >TRUST SHOP</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/" className="nav-link text-primary menu">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link text-primary menu">Orders</Link>
                </li>
               
                <li className="nav-item">
                  <Link to="/admin" className="nav-link text-primary menu">Admin</Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-primary menu">Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/" className="nav-link text-primary menu">
                    {LoggedInUser.displayName}
                    {/* displayName */}
                  </Link>
                </li>
              </ul>
            </div>
        </nav>
          <div>
            <hr />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>

              <PrivateRoute path="/orders">
                <Orders />
              </PrivateRoute>
              <PrivateRoute path="/admin">
                <Admin />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <PrivateRoute path="/product/:productID">
                <Checkout />
              </PrivateRoute>
            </Switch>
          </div>
          <div className="container-fluid bg-dark mt-5">
            <Row>
              <Col>
                <p className="text-light text-center p-1" >&#169; Reserved by Gowtam kumar</p>
              </Col>
            </Row>
          </div>
      </Router>
    </UserContext.Provider>

  );
}

export default App;
