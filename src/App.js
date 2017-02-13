
import React, { Component } from 'react';
import Collection from './Collection.js';
import { browserHistory } from 'react-router'

import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      results: [],
      pagination: {},
      loading: true
    };
  }
  loadData = (pageNumber = 1) => {
    // pageNumber is the page to load
    // by default pageNumber 1 to load first page
    // url to fetch from
    let url = [
      'http://www.deindeal.ch/api/public/v2/data/search?p=',
      pageNumber,
      '&q=rot'
    ].join("");

    // start loading show loader
    this.setState({loading: true});
    // fetch from url and force-cache to ehance performance
    fetch(url, {cache: "force-cache"})
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        // update the state with fetched data
        this.setState({
          results: json.results,
          pagination: json.pagination
        });
        // end loading hide loader
        this.setState({loading: false});
        // set browser url to match current page
        browserHistory.push('/' + this.state.pagination.page);
      }).catch(function (error) {
        console.log('error', error)
      });
  };

  componentDidMount = () => {
    //first time load, if page id provided in URL load required page
    if ( this.props.routeParams.id ) {
      this.loadData(this.props.routeParams.id);
    }else {
      // load first page
      this.loadData();
    }
    // on back button load the right page Data from the url
    window.onpopstate = ()=> {
      this.loadData(this.props.routeParams.id);
    }
  }

  nextResults = () => {
    // saving totalPages var
    let maxPage = this.state.pagination.totalPages;
    // copy state.pagination to new object
    let paginationObj = this.state.pagination;
    // overiding the page property with the next page
    paginationObj.page = this.state.pagination.page + 1;
    // activating the button Previous
    paginationObj.showPrevious = true;

    // on/off next button
    if(  this.state.pagination.page ===  maxPage ){
      // incase it is the last page disable the Next button
      paginationObj.showNext = false;
    }
    else{
      // otherwise keep it active
      paginationObj.showNext = true;
    }
    // update state only if not overPassed last page.
    if( this.state.pagination.page <= maxPage ){
      this.setState({pagination:paginationObj});
    }
    // load new page
    this.loadData(this.state.pagination.page);
  }

  prevResults = () => {
    // copy property from the state to New object
    let paginationObj = this.state.pagination;
    // overiding the page property with the pervious page
    paginationObj.page = this.state.pagination.page - 1;

    // on/off prev button
    if(  this.state.pagination.page === 1 ){
      // if on the first page
      // disable Previous button
      paginationObj.showPrevious = false;
      // enable Next button
      paginationObj.showNext = true;

    }else{
      // otherwise enable Previous button
      paginationObj.showPrevious = true;
    }

    // don't update state for any page less than first page.
    if( this.state.pagination.page >= 1 ){
      this.setState({pagination:paginationObj});
    }
    // load new page
    this.loadData(this.state.pagination.page);
  }


  render = () => {
    var collectionBoxes = this.state.results.map(function (result, index) {

    return <Collection key={index}
              title={result.formatted.title}
              secondaryTitle={result.formatted.secondaryTitle}
              coverImage={result.images.cover}
              price={result.formatted.price}
              value={result.formatted.value}
              discountPercent={result.discountPercentage + "%"}
              showPrice={result.showPrice}
              showDiscount={result.showDiscount}
              showValue={result.showValue} />
    });

    return (
      <div className="App">
        <h2 className="heading">Search Results</h2>
        {/* pagination active if state.showPagination = true  */}
        { this.state.pagination.showPagination &&
          <div className="nav">
            {/* disable button Prev if pagination.showPrev= false  */}
            <button className="nav-item" onClick={this.prevResults} disabled={!this.state.pagination.showPrevious}>Prev</button>
            <div className="nav-item">|</div>
            {/* disable button next if pagination.showNext = false  */}
            <button className="nav-item" onClick={this.nextResults} disabled={!this.state.pagination.showNext}>Next</button>
          </div>
        }
        {/* css loader is active if state.loading = true  */}
        { this.state.loading &&
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        }
        {/* collection Component active if state.loading = false  */}
        { !this.state.loading &&
          <div className="collections">
            {collectionBoxes}
          </div>
        }
      </div>
    );
  }
}

export default App;
