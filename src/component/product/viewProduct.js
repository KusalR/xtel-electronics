import React,{Component} from "react";
import axios from 'axios';
import ViewProductItem from "./viewProductItem";

//products view

export default class viewProduct extends Component{
    constructor(props) {
        super(props);
        this.getAllProducts = this.getAllProducts.bind(this);

        this.state = {
            product : []
        };
    }

    getAllProducts(){
        axios.get('http://localhost:5000/product/')
            .then(response => {
                this.setState({product: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        setInterval(this.getAllProducts,2000)
    }

    viewProductItem(){
        return this.state.product.map(function(object, i){
            return <ViewProductItem obj={object} key={i}  />;
        });
    }
    render() {


        return (
            <div>

                <h3 align="center">product List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Product Stock Quantity</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.viewProductItem()}
                    </tbody>
                </table>
            </div>
        );
    }

}
