import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class viewProductItem extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:5000/product/delete/' +this.props.obj._id)
            .then(console.log("Product Deleted"))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.name}
                </td>
                <td>
                    {this.props.obj.quantity}
                </td>
                <td>
                    <Link to={"/update/"+this.props.obj._id}>Edit</Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default viewProductItem;
