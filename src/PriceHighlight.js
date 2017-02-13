import React, { Component } from 'react';

export default class PriceHighlight extends Component {
  render() {

    let discountPercent   = this.props.showDiscount   ? <div className="priceHighlight-discountPercentage">{this.props.discountPercent}</div> : "";
    let value             = this.props.showValue      ? <div className="priceHighlight-value">{this.props.value}</div> : "";
    //let price             = this.props.showPrice      ? <div className="priceHighlight-price">{this.props.price}</div> : "";
    let price             = this.props.price      ?     <div className="priceHighlight-price">CHF {this.props.price}</div> : "";

    return (
      <div className="molecule-priceHighlight">
          {discountPercent}
          {value}
          {price}
      </div>
    );
  }
}
