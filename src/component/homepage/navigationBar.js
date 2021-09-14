import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";
import { navbar, Nav, Form, Button, FormControl } from 'react-bootstrap';

//navigation bar

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        const user = sessionStorage.user && JSON.parse(sessionStorage.user);

        this.logout = this.logout.bind(this);
        this.onNavBarClick = this.onNavBarClick.bind(this);

        this.state = {
            user: {
                UserName: (user && user.UserName),
                page: '',
            }
        }
    }



    onNavBarClick(eventKey, event) {

        this.setState({
            page: eventKey
        })
    }

    logout = () => {

        sessionStorage.removeItem('user');
        sessionStorage.removeItem('auth-token');
        window.location = '/';
    }

    render() {
        const user = this.state.user && this.state.user.UserName
        const role = this.state.user && this.state.user.role


        const guestView =
            <React.Fragment>
                <li className="navbar-item">
                    <Link to="/Register" className="nav-link">Sign Up</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/Login" className="nav-link">Sign In</Link>
                </li>
                <li>
                    <p>{this.state.user.UserName}</p>
                </li>
            </React.Fragment>

        const userView =
            <React.Fragment>
                <li className="navbar-item">
                    <Link to="/viewproduct" className="nav-link">View Products</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create" className="nav-link">Create Products</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/category" className="nav-link">Create Category</Link>
                </li>

                <button className="btn btn-outline-primary my-2 my-sm-0" onClick={this.logout}>Logout</button>

            </React.Fragment>


        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar display-1 text-decoration-none" href="/">Xtel Electronics</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="navbar-item">
                                <Link to="/" className="nav-link">View Product</Link>
                            </li>
                            <li className="navbar-item">
                                <Link to="/viewcategory" className="nav-link">View All categories</Link>
                            </li>
                            {user ? userView : guestView}
                        </ul>
                    </div>
                </nav>
            </div>
        )
    }

}

export default NavigationBar;
