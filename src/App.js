import React, { Component } from "react";
import Pagination from "react-js-pagination";
import axios from 'axios';
import "bootstrap-less" 

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      pagesList:[],
      startPage:0,
      pageCount:0,
      page: 0
    };
  }
  
  componentDidMount() {
    axios.get(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${this.state.page}`)
      .then(res => {
        this.setState({ pagesList : this.state.pagesList.concat(res.data.hits) });
        if (res.data.hits.length != 0) {
          this.setInterval()
        }
      })
  }


  setInterval = () => {
      this.setState({
        page: this.state.page + 1
      })
      this.componentDidMount()
  }

  
  handlePageChange = (pageNumber) => {
    // console.log(`active page is ${pageNumber}`);
    this.setState({startPage: pageNumber});
  }
  
  getRenderData = () => { 
    let visible_data = [],
    itemsPerPage =  10

    let offset = Math.ceil(this.state.startPage * itemsPerPage);
    for (var i = 0; i < this.state.pagesList.length; i++) {
      if (i >= offset && i < offset + itemsPerPage) {
        visible_data.push(this.state.pagesList[i]);
      }
    }
    return visible_data
  }
  
  render() {
    
    let tabledata = this.getRenderData().map((item) => {
    return <div>{item.title}{item.url}{item.created_at}{item.author}</div>
    });

    return (
      <div className="ju">
        { tabledata }
        <Pagination className="pagination"
          itemsCountPerPage={10}
          totalItemsCount={this.state.pagesList.length - 10}
          pageRangeDisplayed={10}
          activePage={this.state.startPage}
          initialPage={this.state.startPage}
          pageCount={this.state.pageCount}
          onChange={this.handlePageChange}
        />
      </div>
    );
  }
}

export default App;