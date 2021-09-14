import React,{Component} from "react";
import axios from 'axios';
import CategoryItem from './categoryItem';


//View category
export default class ViewCategory extends Component{
    constructor(props) {
        super(props);
        this.getAllCategory = this.getAllCategory.bind(this);

        this.state = {
            Category:[]
        };
    }

    getAllCategory(){
        axios.get('http://localhost:5000/category/')
            .then(response => {
                this.setState({Category: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    componentDidMount() {
        setInterval(this.getAllCategory,2000)
    }

    categoryItem(){
        return this.state.Category.map(function(object, i){
            return <CategoryItem obj={object} key={i}  />;
        });
    }
    render() {


        return (
            <div>
                <h3 align="center">Category List List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }}>
                    <thead>
                    <tr>
                        <th>Category</th>
                        <th colSpan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    { this.categoryItem() }
                    </tbody>
                </table>
            </div>
        );
    }

}
