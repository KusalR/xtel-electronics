import React, {Component} from 'react';

const viewAllProductItem = props => {

    return(
        <>
            <div className="col-sm-4 p-2">
                <a href={`product/${props.ViewAllProductItem._id}`}>
                    <div className="card border-primary mb-3">
                        <div className="card-body">
                            <img src={props.ViewAllProductItem.url} className="img-thumbnail" ></img>
                            <h5 className="card-title">{props.ViewAllProductItem.name}</h5>
                            <strong><p className="card-text alert-danger">Quantity : {props.ViewAllProductItem.quantity}</p></strong>
                        </div>
                    </div>
                </a>
            </div>
        </>
    )
};

export default viewAllProductItem;
