import React, { PureComponent } from 'react';

import App from '../components/App';
import { Mutation } from 'react-apollo';
import RegisterContainer from '../containers/Register';
import SubscribeContainer from '../containers/Subscribe';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';

const Outer = styled.div`
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  align-content: center;
  align-items: center;
`;

const Inner = styled(Paper)`
  width: 100%;
  max-width: 50rem;
  margin: 0 auto;
  padding: 1.5rem;
`;

const Wrapper = ({ children }) => (
  <Outer>
    <Inner>{children}</Inner>
  </Outer>
);

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
        <App showNavigation={false} title="Register">
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
                <Wrapper>
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
                </Wrapper>
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
              <Wrapper>
                <div className="fullHeight fullWidth  align-items__center align-content__center display__flex">
                  <SubscribeContainer
                    subscribe={subscribe}
                    handleChange={this.handleChange}
                    email={email}
                    loading={loading}
                    error={error}
                    called={called}
                  />
                </div>
              </Wrapper>
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
