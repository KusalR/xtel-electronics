import React,{Component} from "react";
import axios from 'axios';
import {form} from 'react-bootstrap';

//update product

export default class updateProduct extends Component{
    constructor(props){
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangeproductImage = this.onChangeproductImage.bind(this);
        this.onChangeproductCategory = this.onChangeproductCategory.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name:'',
            productImage:'',
            productCategory:'',
            description:'',
            quantity:''
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/product/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                    name : response.data.name,
                    productImage : response.data.productImage,
                    productCategory : response.data.productCategory,
                    description : response.data.description,
                    quantity : response.data.quantity

                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    onChangename(e){
        this.setState({
            name:e.target.value
        });
    }

    onChangeproductImage(e){
        this.setState({
            productImage:e.target.value
        });
    }

    onChangeproductCategory(e){
        this.setState({
            productCategory: e.target.value
        });
    }

    onChangedescription(e){
        this.setState({
            description: e.target.value
        });
    }

    onChangequantity(e){
        this.setState({
            quantity: e.target.value
        });
    }


    onSubmit(e){
        e.preventDefault();
        console.log('Submitted');

        const obj = {

            name: this.state.name,
            productImage: this.state.productImage,
            productCategory: this.state.productCategory,
            description: this.state.description,
            quantity: this.state.quantity,

        };

        axios.post('http://localhost:5000/product/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        this.props.history.push('/');
    }



    render() {
        return(
            <>

                <div className='container'>
                    <div style={{marginTop: 10}}>
                        <h3>Update Product Details</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Product Title : </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={this.onChangename}
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Category : </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.productCategory}
                                        onChange={this.onChangeproductCategory}
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Description : </label>
                                <textarea
                                        type="text"
                                        className="form-control"
                                        value={this.state.description}
                                        onChange={this.onChangedescription}
                                />
                            </div>
                            <div className="form-group">
                                <label>Product Price : </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.quantity}
                                        onChange={this.onChangequantity}
                                />
                            </div>
                            <div className="form-group">
                                <input type="submit" value="Update Doctor details" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
