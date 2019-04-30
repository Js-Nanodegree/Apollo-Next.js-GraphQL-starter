/*
 * There are two parts to registration
 * 1) The user must enter their email address and click on the link in their inbox. This forces them to confirm their email address.
 * 2) The user lands back on this page with their invite object _id and their invite token. They then get the rest of the registration form.
 */
import React, { PureComponent } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import {
  node, oneOfType, arrayOf, string
} from 'prop-types';
import PreRegisterContainer from '../containers/PreRegister';
import RegisterContainer from '../containers/Register';
import App from '../components/App';

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
  static propTypes = {
    token: string,
    _id: string
  };

  static getInitialProps({ query }) {
    return { _id: query ? query._id : null, token: query ? query.token : null };
  }

  constructor(props) {
    super(props);
    const { token, _id } = this.props;
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordRepeat: '',
      inviteToken: token,
      _id
    };
  }

  handleChange = (event) => {
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
        <App showNavigation={false} title='Register'>
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
            {(register, { loading, error, called }) => (
              <Wrapper>
                <RegisterContainer
                  loading={loading}
                  called={called}
                  register={register}
                  handleChange={this.handleChange}
                  error={error}
                  firstName={firstName}
                  lastName={lastName}
                  password={password}
                  passwordRepeat={passwordRepeat}
                />
              </Wrapper>
            )}
          </Mutation>
        </App>
      );
    }

    return (
      <App showNavigation={false} title='Register'>
        <Mutation mutation={INVITE_MUTATION} variables={{ input: { email } }}>
          {(invite, { loading, error, called }) => (
            <Wrapper>
              <PreRegisterContainer
                invite={invite}
                handleChange={this.handleChange}
                email={email}
                loading={loading}
                error={error}
                called={called}
              />
            </Wrapper>
          )}
        </Mutation>
      </App>
    );
  }
}

Wrapper.propTypes = {
  children: oneOfType([arrayOf(node), node]).isRequired
};

export default RegisterPage;
