import React, { Component } from 'react';

import { graphql, compose } from 'react-apollo';
import { withRouter } from 'next/router';
import gql from 'graphql-tag';
import App from '../components/App';
import Loading from '../components/Loading';
import withData from '../lib/withData';
import SettingsContainer from '../containers/Settings';


class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      pathname,
      data: { loading, error, Me }
    } = this.props;

    return (
      <App pathname={pathname} showNavigation title='Settings' Me={Me}>
        <SettingsContainer Me={Me} />
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

export default withRouter(withData(compose(graphql(QUERIES))(SettingsPage)));
