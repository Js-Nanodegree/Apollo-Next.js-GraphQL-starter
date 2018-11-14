import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'
import App from '../components/App'
import Loading from '../components/Loading'
import withData from '../lib/withData'
import HomeContainer from '../containers/Home'
import { compose } from 'react-apollo'

class HomePage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {

    // if (error) {
    //   return (<h1>{error}</h1>)
    // }
    // if (loading) {
    //   return <Loading />
    // }
    return (
      <App
        showNavigation
        title='Home'
      >

        <h1>Home</h1>
      </App>
    )
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
`

export default HomePage;

