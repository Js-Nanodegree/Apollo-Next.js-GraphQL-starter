import React from 'react';
import Button from '@material-ui/core/Button';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import {
  array, func, string, bool
} from 'prop-types';
import Container from '../components/Container';
import Form from '../components/Form';

const LoginContainer = ({
  error,
  handleLogin,
  email,
  handleChange,
  password,
  loading
}) => (
  <Container>
    <div className='content-middle'>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          return handleLogin();
        }}
      >
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
          required
        />
        <br />
        <br />
        <TextField
          label='password'
          name='password'
          type='password'
          fullWidth
          value={password}
          onChange={handleChange}
          autoComplete='current-password'
          required
        />
        <br />
        <br />
        <Button
          disabled={!email || !password}
          variant='contained'
          color='primary'
          fullWidth
          onClick={handleLogin}
          type='submit'
          id='submit'
        >
          Login
        </Button>
        <br />
        <p>
          <Link href='/register'>
            <a>Register</a>
          </Link>
        </p>
      </Form>
    </div>
  </Container>
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
