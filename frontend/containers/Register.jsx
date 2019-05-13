import React from 'react';
import Button from '@material-ui/core/Button';
import {
  bool, string, func, array
} from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Form from '../components/Form';
import Container from '../components/Container';

const RegisterContainer = ({
  handleChange,
  register,
  loading,
  firstName,
  lastName,
  password,
  passwordRepeat,
  error,
  called
}) => {
  if (called && !error) {
    return (
      <>
        <h1>Thank you</h1>
        <p>Your account is now active.</p>
        <br />
        <p className='text-align__center'>
          <a href='/'>HOME</a>
        </p>
      </>
    );
  }

  if (error && error.graphQLErrors) {
    return error.graphQLErrors.map(err => (
      <p className='error-message'>{err.message}</p>
    ));
  }

  return (
    <Container>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          return register();
        }}
      >
        <h1>Complete your registration</h1>
        <TextField
          fullWidth
          onChange={handleChange}
          name='firstName'
          value={firstName}
          label='First name'
          autoComplete='first-name'
        />
        <br />
        <TextField
          fullWidth
          onChange={handleChange}
          name='lastName'
          value={lastName}
          label='Last name'
          autoComplete='last-name'
        />
        <br />
        <TextField
          fullWidth
          onChange={handleChange}
          name='password'
          value={password}
          label='Password'
          type='password'
          autoComplete='new-password'
        />
        <br />
        <TextField
          fullWidth
          error={!!password && !!passwordRepeat && password !== passwordRepeat}
          onChange={handleChange}
          name='passwordRepeat'
          value={passwordRepeat}
          label='Repeat password'
          type='password'
          autoComplete='repeat-password'
        />
        <br />
        <br />
        <Button
          fullWidth
          disabled={
            !firstName
            || !lastName
            || !password
            || !passwordRepeat
            || !(password === passwordRepeat)
            || loading
          }
          type='submit'
        >
          {loading ? 'REGISTERING' : 'REGISTER'}
        </Button>
      </Form>
    </Container>
  );
};

RegisterContainer.propTypes = {
  called: bool.isRequired,
  firstName: string.isRequired,
  lastName: string.isRequired,
  loading: bool.isRequired,
  password: string.isRequired,
  passwordRepeat: string.isRequired,
  handleChange: func.isRequired,
  register: func.isRequired,
  error: array
};

export default RegisterContainer;
