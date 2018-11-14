import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'
import Router from 'next/router'
import App from '../components/App'
import Loading from '../components/Loading'
import withData from '../lib/withData'

import LoginContainer from '../containers/Login'

class LoginPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      token: '',
      user: {},
      error: '',
      loggingIn: false
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleLogin = () => {

    this.setState({ loggingIn: true, error: '', message: '' })
    this.props.LOGIN_MUTATION({
      variables: {
        input: {
          email: this.state.email,
          password: this.state.password
        }
      },
      refetchQueries: POST_LOGIN_QUERIES ? [
        {
          query: POST_LOGIN_QUERIES
        }
      ] : []

    }).then((response) => {
      this.setState({
        token: response.data.Login.token,
        user: response.data.Login.user,
        error: '',
        message: 'Successfully logged in.',
        loggingIn: false
      })
      Router.push('/home', '/', { shallow: true })// Redirect to the index on successful login
    }).catch((error) => {
      console.error(error)
      this.setState({ error: error.message, message: '', loggingIn: false })
    })
  }

  render() {
    const { email, password, message, error, loggingIn } = this.state
    return (
      <App
        showNavigation={false}
        title='Login'
      >

        <LoginContainer
          message={message}
          error={error}
          handleChange={this.handleChange}
          handleLogin={this.handleLogin}
          email={email}
          password={password}
          loggingIn={loggingIn}
        />

      </App>
    )
  }
}

const LOGIN_MUTATION = gql`
    mutation login($input: LoginInput) {
        Login(input: $input) {
            token
        }
    }
`

const POST_LOGIN_QUERIES = gql`
    query {
        Me {
            _id
            firstName
            lastName
            email
        }
    }`




export default LoginPage
