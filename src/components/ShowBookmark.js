import React, { Component } from 'react';

export default class ShowBookmark extends Component {

  componentDidMount() {
    // this.findUnique();
  }
  
  findUnique = (banksData) => {
    if(banksData){
      banksData=[...new Set(banksData)]
    }
  }
  
  render() {    
    var banksData = JSON.parse(localStorage.getItem("FavbanksInfo"));
    this.findUnique(banksData);

    return (
      <div>
        {
          banksData ?
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
                banksData.map((bank, index) => (
                  <tr key={index}>
                    <th className="table-data">{bank.bank_name}</th>
                    <th className="table-data">{bank.branch}</th>
                    <th className="table-data">{bank.ifsc}</th>
                    <th className="table-data">{bank.city}</th>
                    <th className="table-data">{bank.district}</th>
                    <th className="table-data">{bank.address}</th>
                    <th className="table-data isFavFlag">
                      <i className="fa fa-bookmark"/>
                    </th>
                  </tr>
                ))
              }
            </tbody>
          </table>:<p className="displayMsg">You haven't bookmark data</p>
        }
      </div>
    )
  }
}
