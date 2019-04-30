import React, { Component } from 'react';
import App from '../components/App';
import { user } from '../constants/props';

class HomePage extends Component {
  static propTypes = {
    Me: user
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Me } = this.props;
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
