import React, { PureComponent } from 'react';
import {
  bool, func, string, array
} from 'prop-types';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';

class PreRegisterContainer extends PureComponent {
  static propTypes = {
    handleChange: func.isRequired,
    invite: func.isRequired,
    email: string.isRequired,
    loading: bool.isRequired,
    error: array,
    called: bool.isRequired
  };

  render() {
    const {
      handleChange, invite, email, loading, error, called
    } = this.props;

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
      <>
        {error && JSON.stringify(error)}

        <form
          className='form-wrapper'
          onSubmit={(e) => {
            e.preventDefault();
            return invite();
          }}
        >
          <div className='form__inner'>
            <h1>Register</h1>
            <p>Enter your email address and click submit</p>
            <TextField
              fullWidth
              name='email'
              value={email}
              label='Email address'
              onChange={handleChange}
              disabled={loading}
            />
            <br />
            <br />
            <Button fullWidth type='submit'>
              {loading ? <CircularProgress size={5} /> : 'SUBMIT'}
            </Button>
          </div>
        </form>
      </>
    );
  }
}

export default PreRegisterContainer;
