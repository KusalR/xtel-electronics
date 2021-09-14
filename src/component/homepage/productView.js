import React, {Component} from 'react';
import axios from "axios";

//product view

class productView extends Component {
    constructor(props) {
        super(props);
        const productId = props.match.params.id
        this.state={
            product:'',
            pid:productId
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/product/'+this.state.pid)
            .then(res=>{
                this.setState({
                    product:res.data
                },()=>{
                    console.log(this.state.product)
                })
            }).catch(err=>{
            console.log(err)
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row" >
                    <div className="col-sm">
                        <img src={this.state.product.url} className="rounded w-100 mh-100"></img>
                    </div>
                    <div className="col-sm">
                        <div className=" flex-column">
                            <div className="card-body">
                                <h5 className="card-title">{this.state.product.name}</h5>
                            <br/>
                                <p className="card-text mb-0">
                                    <strong>Product Description</strong>
                                    <br/>{this.state.product.description}
                                </p>
                                    <br/>
                                <p>
                                    <strong>Product Quantity :
                                    {this.state.product.quantity}</strong>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default productView;
