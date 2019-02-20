import React, { Component } from 'react';

import App from '../components/App';
import { CurentUserConsumer } from './_app';
import HomeContainer from '../containers/Home';
import Loading from '../components/Loading';
import { compose } from 'react-apollo';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import withData from '../lib/withData';
import { withRouter } from 'next/router';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Me } = this.props;
    return (
      <App showNavigation title="Home">
        <div>
          <h1>Home</h1>
        </div>
      </App>
    );
  }
}

const QUERIES = gql`
  query {
    Me {
      _id
      firstName
      lastName
      email
    }
  }
`;

export default HomePage;
