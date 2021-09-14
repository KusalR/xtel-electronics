import React, {Component} from 'react';

import axios from 'axios';

import ViewAllCategoryItem from "./viewAllCategoryItem";


// view all category
class ViewAllCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Category:[]
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/category/').then(res =>{
            this.setState({Category:res.data});
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
    }


    SelectCategory(id){
        axios.get('http://localhost:5000/category/'+id)
            .then(res => console.log(res.data));
        this.setState({
            Category: this.state.Category.filter(el => el._id !== id)
        })
        alert(id);
    }


    render() {
        return (
            <>
                <div className="container">
                    <div className="row">
                        {
                            this.state.Category.map(category => {
                                return(
                                    <ViewAllCategoryItem ViewAllcategoryitem = {category}  key = {category._id}/>
                                )
                            })
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default ViewAllCategory;
