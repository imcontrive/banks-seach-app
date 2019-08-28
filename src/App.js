import React, { Component } from 'react'; 
import {connect} from 'react-redux';
import Home from './components/Home';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path='/' component={Home} />
      </Router>
    )
  }
}

export default connect()(App);
