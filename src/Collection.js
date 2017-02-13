import React, { Component } from 'react';
import PriceHighlight from './PriceHighlight.js';

class Collection extends Component {
  figureHoverOver = (event)=> {
    let parent = event.target.parentElement;
    parent.className += ' has-hoverImage';
  }

  figureHoverOut= (event)=> {
    let parent = event.target.parentElement;
    parent.className = 'collectionBox-coverImageWrapper';
  }
  render() {

    var coverImage = {backgroundImage: 'url(' + this.props.coverImage + ')'}

    return (
      <article className="organism-collectionBox">
        <a className="collectionBox-fullLinkWrapper" href="#">

          <div className="collectionBox-coverImageWrapper">
            <figure className="collectionBox-coverImage" style={coverImage} onMouseOver={this.figureHoverOver} onMouseOut={this.figureHoverOut} ></figure>
            <img src={this.props.coverImage} alt={this.props.title}  width='300' className="collectionBox-hoverImage"/>
          </div>

          <div className="collectionBox-content">
            <h2 className="collectionBox-title">{this.props.title}</h2>
            <h3 className="collectionBox-subtitle">{this.props.secondaryTitle}</h3>
            <div className="collectionBox-priceAndRating">
              <div className="collectionBox-pricingWrapper">
                <PriceHighlight showPrice={this.props.showPrice}  showDiscount={this.props.showDiscount} showValue={this.props.showValue} discountPercent={this.props.discountPercent} price={this.props.price}/>
              </div>
            </div>
          </div>
        </a>
      </article>
    );
  }
}

export default Collection;
