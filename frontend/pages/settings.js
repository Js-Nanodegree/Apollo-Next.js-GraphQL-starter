import React, { Component } from 'react'

import { graphql } from 'react-apollo'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'
import App from '../components/App'
import Loading from '../components/Loading'
import withData from '../lib/withData'
import SettingsContainer from '../containers/Settings'
import { compose } from 'react-apollo'

class SettingsPage extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const {pathname, data: {loading, error, Me}} = this.props
    // if (error) {
    //   return (<h1>{error}</h1>)
    // }
    // if (loading) {
    //   return <Loading />
    // }
    //

    return (
      <App
        pathname={pathname}
        showNavigation
        title='Settings'
        Me={Me}
      >

        <SettingsContainer
          Me={Me}
        />
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

export default withRouter(
  withData(
    compose(
      graphql(QUERIES)
    )(SettingsPage)))

