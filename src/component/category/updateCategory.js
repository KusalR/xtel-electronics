import React,{Component} from "react";
import axios from 'axios';

//Update category

export default class updateCategory extends Component{
    constructor(props){
        super(props);

        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeCategoryImage = this.onChangeCategoryImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category:'',
            categoryImage:'',
        }
    }

    componentDidMount() {

        axios.get('http://localhost:5000/category/'+ this.props.match.params.id)
            .then(response => {
                this.setState({
                    category : response.data.category,
                    categoryImage : response.data.categoryImage,
                })
            }).catch(function (error) {
            console.log(error);
        })
    }

    onChangeCategory(e){
        this.setState({
            category:e.target.value
        });
    }

    onChangeCategoryImage(e){
        this.setState({
            categoryImage:e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log('Submitted');

        const obj = {

            category: this.state.category,
            categoryImage: this.state.categoryImage
        };

        axios.post('http://localhost:5000/category/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        this.props.history.push('/category');
    }



    render() {
        return(
            <>
                <div className='container'>
                    <div style={{marginTop: 10}}>
                        <h3>Update category</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>First Name : </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.category}
                                        onChange={this.onChangeCategory}
                                />
                            </div>
                            <div className="form-group">
                                <input type="submit" value=" Update category"  className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
