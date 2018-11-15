import React, { PureComponent } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag'
import App from '../components/App'
import Loading from '../components/Loading'
import withData from '../lib/withData'

import RegisterContainer from '../containers/Register';
import SubscribeContainer from '../containers/Subscribe';

const SUBSCRIBE_MUTATION = gql`
    mutation Subscribe($input: SubscribeInput) {
        Subscribe(input: $input) {
            message
        }
    }
`


class RegisterPage extends PureComponent {
  static getInitialProps({ query }) {
    return { _id: query ? query._id : null, token: query ? query.token : null };
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordRepeat: '',
      subscribeToken: this.props.token,
      _id: this.props._id
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  // handleSubscribe = () => {
  //   this.setState({ isSubmitting: true, error: '', message: '' })
  //   this.props.SUBSCRIBE_MUTATION({
  //     variables: {
  //       input: {
  //         email: this.state.email
  //       }
  //     }
  //   }).then((response) => {

  //     return this.setState({ message: response.data.Subscribe.message, isSubmitting: false })
  //   }).catch((error) => {
  //     this.setState({ isSubmitting: false })
  //     console.error(error)
  //   })
  // }

  // handleRegister = () => {
  //   this.setState({ isSubmitting: true, error: '', message: '' })
  //   this.props.REGISTER_MUTATION({
  //     variables: {
  //       input: {
  //         subscribeToken: this.state.subscribeToken,
  //         firstName: this.state.firstName,
  //         lastName: this.state.lastName,
  //         _id: this.state._id,
  //         password: this.state.password,
  //         passwordRepeat: this.state.passwordRepeat
  //       }
  //     }
  //   }).then((response) => {

  //     return this.setState({ message: response.data.Register.message, isSubmitting: false })
  //   }).catch((error) => {
  //     return this.setState({ isSubmitting: false, error })
  //   })
  // }

  render() {
    const { _id, subscribeToken, email, firstName, lastName, password, passwordRepeat } = this.state

    if (_id && subscribeToken) {
      return (
        <App
          showNavigation={false}
          title='Login'
        >
          <Mutation
            mutation={REGISTER_MUTATION}
            variables={{ input: { subscribeToken, firstName, lastName, password, passwordRepeat, _id } }}
          >
            {(register, { loading, error, called }) => {
              return (
                <RegisterContainer
                  register={register}
                  handleChange={this.handleChange}
                  email={email}
                  error={error}
                  firstName={firstName}
                  lastName={lastName}
                  password={password}
                  passwordRepeat={passwordRepeat}
                />
              );

            }}
          </Mutation>
        </App >
      );

    }

    return (
      <App
        showNavigation={false}
        title='Register'
      >



        <Mutation
          mutation={SUBSCRIBE_MUTATION}
          variables={{ input: { email } }}
        >

          {(subscribe, { loading, error, called }) => {
            return <SubscribeContainer
              subscribe={subscribe}
              handleChange={this.handleChange}
              email={email}
              loading={loading}
              error={error}
              called={called}
            />

          }}

        </Mutation>

      </App>
    )
  }
}



const REGISTER_MUTATION = gql`
    mutation Register($input: RegisterInput) {
        Register(input: $input) {
            token
        }
    }
`

export default RegisterPage
