import React, { Component } from 'react';
import axios from 'axios';
import {Modal} from "react-bootstrap";

//User register
class UserRegister extends Component {
    constructor(props) {
        super(props);

        this.onChangefirst_name = this.onChangefirst_name.bind(this);
        this.onChangelast_name = this.onChangelast_name.bind(this);
        this.onChangephone = this.onChangephone.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onchangeUserName = this.onchangeUserName.bind(this);
        this.onchangeemail = this.onchangeemail.bind(this);
        this.onchangepassword = this.onchangepassword.bind(this);
        this.onchangeCpassword = this.onchangeCpassword.bind(this);
        this.handleCloseAdd = this.handleCloseAdd.bind(this);
        this.handleShowAdd = this.handleShowAdd.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            first_name:'',
            last_name:'',
            phone:'',
            Address:'',
            UserName: '',
            email: '',
            password: '',
            Cpassword:'',
            error:'',
            isError:false,
        }

    }

    onChangefirst_name(e){
        this.setState({
            first_name: e.target.value
        })
    }

    onChangelast_name(e){
        this.setState({
            last_name: e.target.value
        })
    }
    onChangephone(e){
        this.setState({
            phone: e.target.value
        })
    }

    onChangeAddress(e){
        this.setState({
            Address: e.target.value
        })
    }

    onchangeUserName(e) {
        this.setState({
            UserName: e.target.value
        })
    }

    onchangeemail(e) {
        this.setState({
            email: e.target.value
        })
    }

    onchangepassword(e) {
        this.setState({ password: e.target.value });
    }

    onchangeCpassword(e) {
        this.setState({ Cpassword: e.target.value });
    }

    handleCloseAdd(){
        this.setState({
            show:false

        })
    }
    handleShowAdd(){
        this.setState({
            show:true
        })
    }



    onSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.Cpassword){
            const newUser = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                phone: this.state.phone,
                Address: this.state.Address,
                UserName: this.state.UserName,
                email: this.state.email,
                password: this.state.password,

            }


            this.setState(
                {
                    first_name:'',
                    last_name:'',
                    phone:'',
                    Address:'',
                    UserName: '',
                    email: '',
                    password: '',
                    Cpassword:''

                }
            )


            axios.post('http://localhost:5000/user/add'
                , newUser).then(res => {

                console.log(res.data)
                console.log(res.data.msg)
                this.setState({
                    error: res.data.msg,
                    isError:true
                })
                this.handleShowAdd()
            });
        }else{
            this.setState({error:"passwords are not matching",
                isError:true
            });
            this.handleShowAdd()
        }
    }



    render() {
        return (

            <div className="first">

                <br /><br />
                <div className="container">

                    <div className="row justify-content-center">
                        <div className="col-12 col-md-8 col-lg-6 pb-5">

                            <form onSubmit={this.onSubmit}>
                                <div className="card  rounded">

                                    <div className="card-header rounded p-0">
                                        <div className="bg-primary text-white text-center py-2">
                                            <h3> Create User Accounts</h3>

                                        </div>
                                    </div>
                                    <div className="card-body rounded p-3">
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" id="name" name="username" value={this.state.first_name} onChange={this.onChangefirst_name}
                                                       placeholder="Enter First Name" required></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" id="name" name="username" value={this.state.last_name} onChange={this.onChangelast_name}
                                                       placeholder="Enter Last Name" required></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" id="name" name="username" value={this.state.phone} onChange={this.onChangephone}
                                                       placeholder="Enter phone number" required></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" id="name" name="username" value={this.state.Address} onChange={this.onChangeAddress}
                                                       placeholder="Enter Address" required></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text">
                                                    </div>
                                                </div>
                                                <input type="text" className="form-control" id="name" name="username" value={this.state.UserName} onChange={this.onchangeUserName}
                                                       placeholder="Enter Name" required></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"></div>
                                                </div>
                                                <input type="email" className="form-control" id="email" name="email" value={this.state.email} onChange={this.onchangeemail}
                                                       placeholder="Enter the email" required></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"></div>
                                                </div>
                                                <input type="password" className="form-control" id="email" name="password" value={this.state.password} onChange={this.onchangepassword}
                                                       placeholder="Enter the password" required></input>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="input-group mb-2">
                                                <div className="input-group-prepend">
                                                    <div className="input-group-text"></div>
                                                </div>
                                                <input type="password" className="form-control" id="email" name="confirm password" value={this.state.Cpassword} onChange={this.onchangeCpassword}
                                                       placeholder="confirm password" required></input>
                                            </div>
                                        </div>

                                        <div className="text-center">
                                            <input type="submit" value="Submit" className="btn btn-primary btn-block rounded py-2"></input>
                                        </div>
                                    </div>

                                </div>
                            </form>
                            <Modal show={this.state.show} onHide={this.handleCloseAdd}>
                                <Modal.Header closeButton>
                                    <h6>{this.state.error}</h6>
                                </Modal.Header>
                            </Modal>
                        </div>
                    </div>
                </div>
                <br />
            </div>

        );
    }
}

export default UserRegister;
