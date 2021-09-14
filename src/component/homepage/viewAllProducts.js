import React, {Component} from 'react';

import axios from 'axios';

import ViewAllProductItem from "./viewAllProductItem";

//View all products

class ViewAllProducts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Product:[]
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/product/').then(res =>{
            this.setState({Product:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }

    //
    // Selectcatego(id){
    //     axios.get('http://localhost:5000/category/'+id)
    //         .then(res => console.log(res.data));
    //     this.setState({
    //         Specialization: this.state.Specialization.filter(el => el._id !== id)
    //     })
    //     alert(id);
    // }


    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        {
                            this.state.Product.map(product => {
                                return(
                                    <ViewAllProductItem ViewAllProductItem = {product}  key = {product._id}/>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default ViewAllProducts;
