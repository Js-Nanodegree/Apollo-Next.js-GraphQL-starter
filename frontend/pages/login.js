import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import React, { PureComponent } from 'react';
import Router from 'next/router';
import App from '../components/App';
import LoginContainer from '../containers/Login';

import { CURRENT_USER_QUERY } from '../constants/queries';

const LOGIN_MUTATION = gql`
  mutation login($input: LoginInput) {
    Login(input: $input) {
      token
    }
  }
`;

class LoginPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    return this.setState({ [name]: value });
  };

  handleSuccess = () => {
    Router.push('/');
  };

  render() {
    const { email, password } = this.state;
    return (
      <App showNavigation={false} title='Login'>
        <Mutation
          mutation={LOGIN_MUTATION}
          onCompleted={() => this.handleSuccess()}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
          variables={{
            input: {
              email,
              password
            }
          }}
        >
          {(login, { loading, error }) => (
              <LoginContainer
                error={error}
                handleChange={this.handleChange}
                handleLogin={login}
                email={email}
                password={password}
                loading={loading}
              />
          )}
        </Mutation>
      </App>
    );
  }
}

export default LoginPage;
