import React,{Component} from "react";
import axios from 'axios';
import {storage} from '../../firebase'
import ViewCategory from './viewCategory'

//Create category

export default class createCategory extends Component{
    constructor(props) {
        super(props);

        this.onChangecategory= this.onChangecategory.bind(this);
        this.onchangeMaterial = this.onchangeMaterial.bind(this);
        // this.onChangecategoryImage = this.onChangecategoryImage.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            category:'',
            // categoryImage:'',
            isMessage:false,
            material:null,
            url:'',
            file:null
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/posts/').then(res =>{
            this.setState({
                Posts:res.data.map(posts => posts),
                posts:res.data[0]
            });
            console.log(res.data)
        })
            .catch((err) => {
                console.log(err);
            })
        setInterval(this.setMessage,5000)
    }

    onChangecategory(e){
        this.setState({
            category:e.target.value
        });
    }

    // onChangecategoryImage(e){
    //     this.setState({
    //         categoryImage:e.target.value
    //     });
    // }
    setMessage = () => {
        this.setState({
            isMessage:false
        })
    }

    onchangeMaterial(e) {
        if(e.target.files[0]){
            //     let reader = new FileReader();
            //     reader.onload = (e) =>{
            this.setState({
                file: e.target.result
            })

            // reader.readAsDataURL(e.target.files[0])
            const material = e.target.files[0];
            console.log(material)
            this.setState(() => ({material}))}}
    //     }
    // }

    onSubmit(e){
        e.preventDefault();
        const {material} = this.state;
        const name = material.name
        console.log('Submitted');

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

        const newcategory = {

            category: this.state.category,
            // categoryImage: this.state.categoryImage
            url:url

        };
                    console.log(this.state.topic)
                    this.setState(
                        {
                            topic:'',
                            description:'',
                            url:''
                        }
                    )

        axios.post('http://localhost:5000/category/add', newcategory)
            .then(res => console.log(res.data));

        this.setState({

            category:'',
            categoryImage:'',
            isMessage:true

    //     })
    // }

                });
            })
    });
}

    render() {
        return (
            <>

                <div className='container'>
                    <div style={{marginTop: 10}}>
                        <h3>Create new category</h3>
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label>Category : </label>
                                <input  type="text"
                                        className="form-control"
                                        value={this.state.category}
                                        onChange={this.onChangecategory}
                                />
                                {/*Firebase file upload*/}
                                <div className="form-group">
                                    <label className="control-label col-xs-4">File</label>
                                    <div className="col-xs-8">
                                        <a href={this.state.file} >{this.state.file}</a>
                                        <input type="file" className="form-control" id="material"  required="required"  onChange={this.onchangeMaterial}></input>

                                    </div>
                                </div>
                            <div className="form-group">
                                <input type="submit" value="Create new category" className="btn btn-primary" />
                            </div>
                            </div>
                        </form>
                    </div>

                    <ViewCategory/>
                </div>
            </>
        );
    }
}
