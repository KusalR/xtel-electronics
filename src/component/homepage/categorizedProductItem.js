import React, {Component} from 'react';


const categorizedProductItem = props => {

    return(
        <>
            <div className="col-sm-4">
                <a href={`product/${props.categorizedProductItem._id}`}>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{props.categorizedProductItem.name}</h5>
                        <img src={props.categorizedProductItem.url} className="img-thumbnail"></img>
                        <p><strong>Product Quantity : {props.categorizedProductItem.quantity}</strong></p>
                    </div>
                </div>
              </a>
            </div>
        </>
    )
}

export default categorizedProductItem






















