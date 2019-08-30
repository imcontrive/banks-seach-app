import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from './Loading';
import {fetchData} from '../actions'
import ShowBookmark from './ShowBookmark';



var listArr = [], favBanksId = [];

class Home extends Component {
  state = {
    query: "",
    city:"NAINITAL",
    isLoading: true,
    currentPage: 1,
    isBookmarked: false
  }

  componentDidMount() {
    var banksData = JSON.parse(localStorage.getItem("banksInfo"));
    if(!banksData){
      this.props.dispatch(fetchData(this.state.city)).then(res => this.setState({isLoading: false}))
    }
    else {
     this.props.dispatch({ type: "GET_BANKS_INFO", payload: banksData })
     this.setState({isLoading: false})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.city !== this.state.city){
      this.props.dispatch(fetchData(this.state.city)).then(res => this.setState({isLoading: false}))
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };


  // Logic for BookmarkHandler

  handleBookmark = (bank) => {
    const id = bank.ifsc;
    const {banksInfo} = this.props;
    var modifiedData = banksInfo.map((bank,i) => {
      if(bank.ifsc === id){
        bank.isFavourite = !bank.isFavourite;
      }
      return {...bank};
    })
    favBanksId.push(bank);
    localStorage.setItem("FavbanksInfo",JSON.stringify(favBanksId));
    this.props.dispatch({type:"FAV_BANKS_DATA", payload: modifiedData });
  }
  
  //SHOW BOOKMARK
  showBookmark = () => {
    this.setState({isBookmarked : !this.state.isBookmarked});
  }


  // Generate random pages for Pagitation
  createListsArr = (displayArr) => {
    listArr = []
    for(let i = 0; i<displayArr.length/10;i++){
      listArr.push(i+1)
    }
  }

  // Handle pagePerItems for Paginantion
  handlePageChange = (pageNum) => {
    this.setState({currentPage: pageNum})
  }

  render() {
    const { banksInfo } = this.props;
    const cities = [{name:"DHARAMSHALA",id: 1},{name:"DALHOUSIE",id: 2}, {name:"PALAMPUR",id: 3},{name:"SHIMLA",id: 4},{name:"MANALI",id: 5}];
    var { query} = this.state;
    
    let displayArr = [];
    // search implementation code
    if (query) {
      const regexp = new RegExp(query, 'i')
      displayArr = banksInfo.filter(bank => (regexp.test(bank.bank_name) || regexp.test(bank.branch) || regexp.test(bank.ifsc) || regexp.test(bank.city) || regexp.test(bank.district) || regexp.test(bank.address)));
      this.createListsArr(displayArr);
    }else {
      displayArr = banksInfo
      this.createListsArr(displayArr);
    }
     
    displayArr = displayArr.slice((query ? 1 : this.state.currentPage) * 10 -10, (query ? 1 : this.state.currentPage)*10);
    


    return (
      <React.Fragment>
        <h2>Bank's Search Application</h2>
        <div className="isHeader">
          <div>
            <div>
              <select className="select" name="city" value={this.state.city}  onChange={this.handleChange}>
                <option  key="defaults" value="NAINITAL" className="option">Select your City</option>
                {
                  cities.map((city,index) => 
                    <option key={index} value={city.name} >{city.name}</option>
                  )
                }
              </select>
            </div>
          </div>

          <div className="search-bar">
            <i className="fas fa-search"/>
            <input className="input" name="query" value={this.state.query} placeholder="Search" onChange={this.handleChange} />
            {
              this.state.query ? <p className="search-msg">{
                displayArr ? `${displayArr.length} results found` : "No results found"
              }</p>:""
            }
            
          </div>
          <button className="is-fav-btn" onClick={this.showBookmark}>Show Favourites</button>
        </div>
        {
          !this.state.isLoading && !this.state.isBookmarked ?
          <>
            <table className="isWrapper">
              <thead> 
                <tr>
                  <th className="table-head">Bank</th>
                  <th className="table-head">Branch</th>
                  <th className="table-head">IFSC</th>
                  <th className="table-head">City</th>
                  <th className="table-head">District</th>
                  <th className="table-head">Address</th>
                  <th className="table-head">Bookmark</th>
                </tr>
              </thead>
              <tbody>
                {
                  displayArr.map((bank, index) => (
                    <tr key={index}>
                      <th className="table-data">{bank.bank_name}</th>
                      <th className="table-data">{bank.branch}</th>
                      <th className="table-data">{bank.ifsc}</th>
                      <th className="table-data">{bank.city}</th>
                      <th className="table-data">{bank.district}</th>
                      <th className="table-data">{bank.address}</th>
                      <th className="table-data isFavFlag">
                        <i className={bank.isFavourite ? "isMarked fa fa-bookmark":"far fa-bookmark" } onClick={(e) => this.handleBookmark(bank)}/>
                      </th>
                    </tr>
                  ))
                }
              </tbody>
            </table> 
            {
              listArr && listArr.length > 2 ?

             <div className="pagination">
             {
               listArr ? listArr.map((pageNum,index) => 
               <button key={index} className={this.state.currentPage === pageNum ? "activePageBtn btn":"page-btn btn"} onClick={()=> this.handlePageChange(pageNum)} >{pageNum}</button>
               ):""
             }
            </div>:""
            }
          </> : this.state.isBookmarked ? <ShowBookmark /> : <Loading />
          }        
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    banksInfo: state.banksInfo.banksInfo
  }
}

export default connect(mapStateToProps)(Home);