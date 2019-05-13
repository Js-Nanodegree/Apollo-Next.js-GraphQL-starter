import React, { Component } from 'react';
import App from '../components/App';
import Container from '../components/Container';

class HomePage extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <App showNavigation title='Home'>
        <Container>
          <h1>Home</h1>
        </Container>
      </App>
    );
  }
}

export default HomePage;
