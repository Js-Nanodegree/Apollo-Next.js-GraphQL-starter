import React, { PureComponent } from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo';
import App from '../components/App'
import LoginContainer from '../containers/Login'

const LOGIN_MUTATION = gql`
mutation login($input: LoginInput){
  Login(input: $input){
    token
  }
}`

class LoginPage extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    return this.setState({ [name]: value })
  }

  // handleLogin = () => {

  //   this.setState({ loggingIn: true, error: '', message: '' })
  //   this.props.LOGIN_MUTATION({
  //     variables: {
  //       input: {
  //         email: this.state.email,
  //         password: this.state.password
  //       }
  //     },
  //     refetchQueries: POST_LOGIN_QUERIES ? [
  //       {
  //         query: POST_LOGIN_QUERIES
  //       }
  //     ] : []

  //   }).then((response) => {
  //     this.setState({
  //       token: response.data.Login.token,
  //       user: response.data.Login.user,
  //       error: '',
  //       message: 'Successfully logged in.',
  //       loggingIn: false
  //     })
  //     Router.push('/home', '/', { shallow: true })// Redirect to the index on successful login
  //   }).catch((error) => {
  //     console.error(error)
  //     this.setState({ error: error.message, message: '', loggingIn: false })
  //   })
  // }

  render() {
    const { email, password } = this.state
    return (
      <App
        showNavigation={false}
        title='Login'
      >
        <Mutation
          mutation={LOGIN_MUTATION}
          variabled={{
            input: {
              email,
              password
            }
          }}
        >
          {(login, { loading, error }) => {
            return <LoginContainer
              error={error}
              handleChange={this.handleChange}
              handleLogin={login}
              email={email}
              password={password}
              loading={loading}
            />
          }}
        </Mutation>
      </App>
    )
  }
}

export default LoginPage
