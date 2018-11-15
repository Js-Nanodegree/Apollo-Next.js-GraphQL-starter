import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link';
import gql from 'graphql-tag';
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class LoginContainer extends PureComponent {

  static propTypes = {}

  render() {
    const { error, handleLogin, email, handleChange, password, loading } = this.props;
    return (
      <Fragment>
        <div className="content-middle">
          <form className="login-form-wrapper"
            onSubmit={(e) => {
              e.preventDefault();
              return handleLogin();
            }}
          >
            <Paper>
              <div className="login-form__inner">
                <h1>Login</h1>
                {error && <h2>{JSON.stringify(error)}</h2>}
                {loading && <h2>Please wait...</h2>}

                <TextField
                  name='email'
                  type='email'
                  fullWidth
                  value={email}
                  label="Email"
                  onChange={handleChange}
                  autoComplete="email"
                />
                <br />
                <TextField
                  label="password"
                  name='password'
                  type='password'
                  fullWidth
                  value={password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                <br />
                <br />
                <Button
                  // disabled={!email || !password}
                  fullWidth
                  onClick={handleLogin}
                >Login
                </Button>
              </div>
              <Link
                href='/register'
              >
                <a>Register</a>
              </Link>

            </Paper>
          </form>

        </div>
        <style jsx>{`
      .content-middle{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .login-form-wrapper {
        width: 100%;
        max-width: 450px;
        margin: 0 auto;

      }
      .login-form__inner{
        padding: 1rem
      }
    `}</style>
      </Fragment>
    )
  }
}

export default LoginContainer