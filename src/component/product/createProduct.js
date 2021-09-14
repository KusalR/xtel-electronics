import React,{Component} from "react";
import axios from 'axios';
import {storage} from '../../firebase'


//product create

export default class createProduct extends Component{

    constructor(props) {
        super(props);

        const user = sessionStorage.user._id && JSON.parse(sessionStorage.user._id);

        //setting up functions
        this.onChangename = this.onChangename.bind(this);
        this.onChangeproductCategory = this.onChangeproductCategory.bind(this);
        this.onChangedescription = this.onChangedescription.bind(this);
        this.onChangequantity = this.onChangequantity.bind(this);
        this.onChangeuser_id = this.onChangeuser_id.bind(this);
        this.onchangeMaterial = this.onchangeMaterial.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //setting up state
        this.state = {
            name:'',
            productCategory:'',
            description:'',
            quantity:'',
            user_id:'',
            isMessage:false,
            url:'',
            material:null,
            file:null,
            Category:[]
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/category/').then(res =>{
            this.setState({
                Category:res.data.map(productCategory => productCategory),
                productCategory:res.data[0]
            });
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
        setInterval(this.setMessage,5000)
    }

    onChangename(e){
        this.setState({
            name:e.target.value
        });
    }


    onchangeMaterial(e) {
        if(e.target.files[0]){

            this.setState({
                file: e.target.result
            })

            const material = e.target.files[0];
            console.log(material)
            this.setState(() => ({material}))}}



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


    onChangeuser_id(e){
        this.setState({
            user_id: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        console.log('Submitted');
        const {material} = this.state;
        const name = material.name


        console.log(name)
        const uploadtask =  storage.ref("files/"+material.name).put(material);
        uploadtask.on('state_changed',
            (snapshot) =>{

            },
            (error) =>{
                console.log(error)
            },
            () =>{
                storage.ref('files').child(material.name).getDownloadURL().then(url =>{
                    console.log(url);




        const newProduct = {

            name: this.state.name,
            isMessage:this.state.isMessage,
            url:url,
            productCategory: this.state.productCategory,
            description: this.state.description,
            quantity: this.state.quantity,
            user_id: this.state.user_id

        };
                    console.log(this.state.topic)
                    this.setState(
                        {
                            topic:'',
                            description:'',
                            url:''
                        }
                    )

                    axios.post('http://localhost:5000/product/add'
                        , newProduct).then(res =>{ console.log(res.data)

        this.setState({
                name:'',
                productCategory:'',
                description:'',
                quantity:'',
                user_id:'',
                message: res.data.msg,
                isMessage:true

                            }
                         )

                    });
                })
            });
         }

    render() {
        return (
            <>
                <div className='container'>
                    <div style={{marginTop: 10}}>
                        <h3>Create new Product</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Product Name : </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.name}
                                        onChange={this.onChangename}
                                />
                            </div>
                            {/*Firebase file upload */}
                            <div className="form-group">
                                <label className="control-label col-xs-4">File</label>
                                <div className="col-xs-8">
                                    <a href={this.state.file} >{this.state.file}</a>
                                    <input type="file" className="form-control" id="material"  required="required"  onChange={this.onchangeMaterial}></input>

                                </div>
                            </div>
                            <div className="form-group">
                                <label>Product Description: </label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    value={this.state.description}
                                    onChange={this.onChangedescription}
                                />
                            </div>
                            <div className="form-group">
                                <label  className="bmd-label-floating">Product category</label>
                                <select ref="userInput"
                                        className="form-control rounded"
                                        value={this.state.Category._id}
                                        onChange={this.onChangeproductCategory}>
                                    {
                                        this.state.Category.map(function(productCategory) {
                                            return <option
                                                key={productCategory}
                                                value={productCategory._id}>{productCategory.category}
                                            </option>;
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                            <label>Quantity : </label>
                            <input  type="text"
                                    className="form-control"
                                    value={this.state.quantity}
                                    onChange={this.onChangequantity}
                            />
                            </div>
                            <div className="form-group">
                                <input  type="hidden"
                                        className="form-control"
                                        value={sessionStorage.getItem("id")}
                                        onChange={this.onChangeuser_id}

                                />

                            </div>

                            <div className="form-group">
                                <input type="submit" value="Create Product" className="btn btn-primary" />
                            </div>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}
