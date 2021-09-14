import React, { Component } from 'react';
import axios from "axios";
import { BrowserRouter, Switch, Route, Link, Redirect, useHistory, useLocation } from "react-router-dom";

//user Login
class UserLogin extends Component {
    constructor(props) {
        super(props);

        this.onchangeemail = this.onchangeemail.bind(this);
        this.onchangepassword = this.onchangepassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        const user = sessionStorage.user && JSON.parse(sessionStorage.user);
        this.state = {
            first_name:'',
            last_name:'',
            phone:'',
            Address:'',
            email:'',
            password:'',
            errors: {
                email: '',
                password: '',
                other: ''
            },
            user: {
                UserName: (user && user.UserName),
                page: '',
            }
        }
    }



    onchangepassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    onchangeemail(e) {
        this.setState({
            email: e.target.value
        })
    }

    validateForm() {
        let error = false
        if (this.state.email === '') {
            error = true
            this.setState({
                errors: {
                    ...this.state.errors,
                    email: 'Email cannot be empty',
                }
            })
        }



        return error
    }

    onSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {

            const newUser = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone: this.state.phone,
                Address: this.state.Address,
                password: this.state.password,
                email: this.state.email
            }

            this.setState(
                {
                    first_name:'',
                    last_name:'',
                    phone:'',
                    Address:'',
                    password: '',
                    email: '',
                    errors: {
                        email: '',
                        password: '',
                        other: ''
                    }
                }
            );

            axios.post('http://localhost:5000/user/login', newUser).then(res => {
                console.log(res.data)

                const user = {
                    _id: res.data.user._id,
                    first_name: res.data.user.first_name,
                    last_name: res.data.last_name,
                    phone: res.data.phone,
                    Address: res.data.Address,
                    email: res.data.user.email,
                    UserName: res.data.user.UserName
                }

                console.log(user)

                sessionStorage.setItem("auth-token", res.data.token);
                sessionStorage.setItem('user', JSON.stringify(user));
                sessionStorage.setItem('id',JSON.stringify(user._id));
                window.location.reload();
                // console.log(res.data && res.data.adminUser && res.data.adminUser.firstLogin)


                // this.props.history.push('/')

            })
                .catch((err) => {
                    console.log(err.response);
                    this.setState({
                        errors: {
                            ...this.state.errors,
                            other: err.response.data.msg,
                        }
                    })
                })
        }

    }
    render() {
        const {  errors, user } = this.state;
        if (user.UserName)
            this.props.history.push('/');
        return (
            <div>
                <div className="container">
                    <div className="login-form">
                        <form onSubmit={this.onSubmit}>
                            <h2 className="text-center">Log in</h2>
                            <div className="form-group">
                                {errors.other.length > 0 &&
                                <span className='error'>{errors.other}</span>}
                            </div>

                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Email" required="required" value={this.state.email} onChange={this.onchangeemail}></input>
                                {errors.email.length > 0 &&
                                <span className='error'>{errors.email}</span>}
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" placeholder="Password" required="required" value={this.state.password} onChange={this.onchangepassword}></input>
                                {errors.password.length > 0 &&
                                <span className='error'>{errors.password}</span>}
                            </div>
                            <div className="form-group">

                                <button type="submit" className="btn btn-primary btn-block">Log in</button>
                            </div>
                            <div className="clearfix">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserLogin;
