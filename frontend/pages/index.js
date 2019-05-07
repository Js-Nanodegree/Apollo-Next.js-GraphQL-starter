import React, { Component } from 'react';
import App from '../components/App';

class HomePage extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <App showNavigation title='Home'>
        <div>
          <h1>Home</h1>
        </div>
      </App>
    );
  }
}

export default HomePage;
