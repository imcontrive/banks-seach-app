import React, { Component } from 'react'

export default class Loading extends Component {
  render() {
    return (
      <div className="isLoading">
        <div className="lds-facebook">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }
}
