import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Routes from './routes';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {}

  render() {
    const { isAuthenticated } = this.state;

    return (
      <div className="App container">
        <Routes isAuthenticated={isAuthenticated} />
      </div>
    );
  }
}

export default withRouter(App);
