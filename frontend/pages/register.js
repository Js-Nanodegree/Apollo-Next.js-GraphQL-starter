import React, { PureComponent } from 'react';

import App from '../components/App';
import Loading from '../components/Loading';
import { Mutation } from 'react-apollo';
import RegisterContainer from '../containers/Register';
import SubscribeContainer from '../containers/Subscribe';
import gql from 'graphql-tag';
import withData from '../lib/withData';

const SUBSCRIBE_MUTATION = gql`
  mutation Subscribe($input: SubscribeInput) {
    Subscribe(input: $input) {
      message
    }
  }
`;

class RegisterPage extends PureComponent {
  static getInitialProps({ query }) {
    return { _id: query ? query._id : null, token: query ? query.token : null };
  }

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordRepeat: '',
      subscribeToken: this.props.token,
      _id: this.props._id
    };
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const {
      _id,
      subscribeToken,
      email,
      firstName,
      lastName,
      password,
      passwordRepeat
    } = this.state;

    if (_id && subscribeToken) {
      return (
        <App showNavigation={false} title="Login">
          <Mutation
            mutation={REGISTER_MUTATION}
            variables={{
              input: {
                subscribeToken,
                firstName,
                lastName,
                password,
                passwordRepeat,
                _id
              }
            }}
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
        </App>
      );
    }

    return (
      <App showNavigation={false} title="Register">
        <Mutation
          mutation={SUBSCRIBE_MUTATION}
          variables={{ input: { email } }}
        >
          {(subscribe, { loading, error, called }) => {
            return (
              <SubscribeContainer
                subscribe={subscribe}
                handleChange={this.handleChange}
                email={email}
                loading={loading}
                error={error}
                called={called}
              />
            );
          }}
        </Mutation>
      </App>
    );
  }
}

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput) {
    Register(input: $input) {
      token
    }
  }
`;

export default RegisterPage;
