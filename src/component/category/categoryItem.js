import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class categoryItem extends Component {

    constructor(props) {
        super(props);
        this.delete = this.delete.bind(this);
    }
    delete() {
        axios.get('http://localhost:5000/category/delete/' +this.props.obj._id)
            .then(console.log("category Deleted"))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <tr>
                <td>
                    {this.props.obj.category}
                </td>
                <td>
                    <Link to={"/updatecategory/"+this.props.obj._id}>Edit</Link>
                </td>
                <td>
                    <button onClick={this.delete} className="btn btn-danger">Delete</button>
                </td>
            </tr>
        );
    }
}

export default categoryItem;
