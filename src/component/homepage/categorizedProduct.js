import React, {Component} from 'react';

import axios from 'axios';
import CategorizedProductItem from './categorizedProductItem';



class CategorizedProduct extends Component {
    constructor(props) {
        super(props);
        const categoryIds = props.match.params.id
        this.state = {
            Products:[],
            Catid:categoryIds
        }
    }

// +this.props.match.params.category
    componentDidMount() {
        console.log(this.state.Catid);
        const Id = this.props.match.params.id
        axios.get(`http://localhost:5000/product/catProduct/product_by_id?id=${this.state.Catid}&type=single`).then(res =>{
            this.setState({Products:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }


    // SelectSubcategory(id){
    //     axios.get('http://localhost:5000/Subcategory/'+id)
    //         .then(res => console.log(res.data));
    //     this.setState({
    //         Subcategory: this.state.Subcategory.filter(el => el._id !== id)
    //     })
    //     alert(id);
    // }


    render() {
        return (
            <>
                <div className="container pt-5">
                    <div className="row">
                        <div className="container pt-5">
                            <div className="row">
                                {
                                    this.state.Products.map(product => {
                                        return(
                                            <CategorizedProductItem categorizedProductItem = {product}  key = {product._id}/>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}

export default CategorizedProduct;
