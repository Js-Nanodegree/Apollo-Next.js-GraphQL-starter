import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import {
  array, func, string, bool
} from 'prop-types';

const LoginContainer = ({
  error,
  handleLogin,
  email,
  handleChange,
  password,
  loading
}) => (
  <>
    <div className='content-middle'>
      <form
        className='form-wrapper'
        onSubmit={(e) => {
          e.preventDefault();
          return handleLogin();
        }}
      >
        <Paper>
          <div className='form__inner'>
            <h1>Login</h1>
            {error && <h2>{JSON.stringify(error)}</h2>}
            {loading && <h2>Please wait...</h2>}

            <TextField
              name='email'
              type='email'
              fullWidth
              value={email}
              label='Email'
              onChange={handleChange}
              autoComplete='email'
            />
            <br />
            <TextField
              label='password'
              name='password'
              type='password'
              fullWidth
              value={password}
              onChange={handleChange}
              autoComplete='current-password'
            />
            <br />
            <br />
            <Button
              // disabled={!email || !password}
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
            <br />
            <Link href='/register'>
              <a>Register</a>
            </Link>
          </div>
        </Paper>
      </form>
    </div>
    <style jsx>
      {`
        .content-middle {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}
    </style>
  </>
);

LoginContainer.propTypes = {
  error: array,
  handleLogin: func.isRequired,
  email: string.isRequired,
  password: string.isRequired,
  handleChange: func.isRequired,
  loading: bool.isRequired
};

export default LoginContainer;
