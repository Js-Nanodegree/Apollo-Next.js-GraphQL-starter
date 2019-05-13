import React from 'react';
import {
  bool, func, string, array
} from 'prop-types';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Form from '../components/Form';
import Container from '../components/Container';

const PreRegisterContainer = ({
  handleChange,
  invite,
  email,
  loading,
  error,
  called
}) => {
  if (called && !error && !loading) {
    return (
      <>
        <h1>Thank you</h1>
        <p>
          An email has been sent to {email}. Please click the link to complete
          your registration.
        </p>
      </>
    );
  }
  return (
    <Container>
      {error && JSON.stringify(error)}
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          return invite();
        }}
      >
        <h1>Register</h1>
        <p>Enter your email address and click submit</p>
        <TextField
          fullWidth
          name='email'
          value={email}
          label='Email address'
          onChange={handleChange}
          disabled={loading}
          required
        />
        <br />
        <br />
        <Button fullWidth type='submit' variant='contained' color='primary'>
          {loading ? <CircularProgress size={5} /> : 'SUBMIT'}
        </Button>

        <p>
          <Link href='/login'>
            <a>Login</a>
          </Link>
        </p>
      </Form>
    </Container>
  );
};

PreRegisterContainer.propTypes = {
  handleChange: func.isRequired,
  invite: func.isRequired,
  email: string.isRequired,
  loading: bool.isRequired,
  error: array,
  called: bool.isRequired
};

export default PreRegisterContainer;
