import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import viewAllProducts from "./component/homepage/viewAllProducts";
import NavigationBar from "./component/homepage/navigationBar";
import userRegister from "./component/user/userRegister";
import UserLogin from "./component/user/userLogin";
import updateProduct from "./component/product/UpdateProduct";
import createProduct from "./component/product/createProduct";
import createCategory from "./component/category/createCategory";
import updateCategory from "./component/category/updateCategory";
import viewAllCategory from "./component/homepage/viewAllCategory";
import viewProduct from "./component/product/viewProduct";
import CategorizedProduct from "./component/homepage/categorizedProduct";
import productView from "./component/homepage/productView";

function App() {
  return (
      <Router>
        <div className="App">
          <NavigationBar/>
          <Switch>
            <Route path="/" exact component={viewAllProducts}/>
            <Route path="/update/:id" component={updateProduct}/>
            <Route path="/create" component={createProduct}/>
            <Route path="/category" component={createCategory}/>
            <Route path="/updatecategory/:id" component={updateCategory}/>
            <Route path='/Viewcategory' component={viewAllCategory}/>
            <Route path='/catergorizedProducts/:id' component={CategorizedProduct}/>
            <Route path='/getAllproduct' component={viewAllProducts}/>
            <Route path='/Register' component={userRegister}/>
            <Route path='/Login' component={UserLogin}/>
            <Route path='/viewproduct' component={viewProduct}/>
            <Route path='/product/:id' exact component={productView} />

          </Switch>
        </div>
        <div className="jumbotron text-center margin-bottom:0">
          <p>IT18018042 -  Rathnakumara G.G.K.M</p>
        </div>
      </Router>

  );
}

export default App;
