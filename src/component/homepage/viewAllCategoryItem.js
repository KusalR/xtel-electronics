import React, {Component} from 'react';

const viewAllCategoryItem = props => {

    return(
        <>
            <div className="card border-primary mb-3 col-lg-4 col-md-6 text-center">
                <div className="single-product">
                    <div className="product-btm">
                        <a href={`/catergorizedProducts/${props.ViewAllcategoryitem._id}`} className="d-block text-decoration-none">
                            <h4 >{props.ViewAllcategoryitem.category}</h4>
                            <img src={props.ViewAllcategoryitem.url} className="img-thumbnail img-responsive "></img>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
};

export default viewAllCategoryItem;
