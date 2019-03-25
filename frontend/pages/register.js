import React, { PureComponent } from 'react';

import App from '../components/App';
import { Mutation } from 'react-apollo';
import RegisterContainer from '../containers/Register';
import InviteContainer from '../containers/Invite';
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
  flex-direction: column;
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

const INVITE_MUTATION = gql`
  mutation Invite($input: InviteInput) {
    Invite(input: $input) {
      message
    }
  }
`;

const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput) {
    Register(input: $input) {
      token
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
      inviteToken: this.props.token,
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
      inviteToken,
      email,
      firstName,
      lastName,
      password,
      passwordRepeat
    } = this.state;

    if (_id && inviteToken) {
      return (
        <App showNavigation={false} title="Register">
          <Mutation
            mutation={REGISTER_MUTATION}
            variables={{
              input: {
                inviteToken,
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
                    loading={loading}
                    called={called}
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
        <Mutation mutation={INVITE_MUTATION} variables={{ input: { email } }}>
          {(invite, { loading, error, called }) => {
            return (
              <Wrapper>
                <InviteContainer
                  invite={invite}
                  handleChange={this.handleChange}
                  email={email}
                  loading={loading}
                  error={error}
                  called={called}
                />
              </Wrapper>
            );
          }}
        </Mutation>
      </App>
    );
  }
}

export default RegisterPage;
