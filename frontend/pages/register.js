import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { withRouter } from 'next/router'
import gql from 'graphql-tag'
import App from '../components/App'
import Loading from '../components/Loading'
import withData from '../lib/withData'

import RegisterContainer from '../containers/Register'

class RegisterPage extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      message: '',
      error: '',
      isSubmitting: false,
      firstName: '',
      lastName: '',
      password: '',
      passwordRepeat: '',
      subscribeToken: '',
      _id: ''
    }
  }

  componentDidMount () {
    const {router: {query}} = this.props
    if (query && query._id && query.token) {
      this.setState({subscribeToken: query.token, _id: query._id})
    }
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({[name]: value})
  }

  handleSubscribe = () => {
    this.setState({isSubmitting: true, error: '', message: ''})
    this.props.SUBSCRIBE_MUTATION({
      variables: {
        input: {
          email: this.state.email
        }
      }
    }).then((response) => {

      return this.setState({message: response.data.Subscribe.message, isSubmitting: false})
    }).catch((error) => {
      this.setState({isSubmitting: false})
      console.error(error)
    })
  }

  handleRegister = () => {
    this.setState({isSubmitting: true, error: '', message: ''})
    this.props.REGISTER_MUTATION({
      variables: {
        input: {
          subscribeToken: this.state.subscribeToken,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          _id: this.state._id,
          password: this.state.password,
          passwordRepeat: this.state.passwordRepeat
        }
      }
    }).then((response) => {

      return this.setState({message: response.data.Register.message, isSubmitting: false})
    }).catch((error) => {
      return this.setState({isSubmitting: false, error})
    })
  }

  render () {
    const {router: {pathname, query}} = this.props

    const {email, isSubmitting, message, firstName, lastName, password, passwordRepeat} = this.state
    return (
      <App
        showNavigation={false}
        title='Login'
        pathname={pathname}
      >
        <RegisterContainer
          query={query}
          handleChange={this.handleChange}
          handleSubscribe={this.handleSubscribe}
          email={email}
          isSubmitting={isSubmitting}
          message={message}
          firstName={firstName}
          lastName={lastName}
          password={password}
          passwordRepeat={passwordRepeat}
          handleRegister={this.handleRegister}
        />
      </App>
    )
  }
}

const SUBSCRIBE_MUTATION = gql`
    mutation Subscribe($input: SubscribeInput) {
        Subscribe(input: $input) {
            message
        }
    }
`

const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput) {
        Register(input: $input) {
            token
        }
    }
`

export default withRouter(
  withData(
    compose(
      graphql(SUBSCRIBE_MUTATION,
        {name: 'SUBSCRIBE_MUTATION'}
      ),
      graphql(REGISTER_MUTATION,
        {name: 'REGISTER_MUTATION'}
      )
    )(RegisterPage)))
