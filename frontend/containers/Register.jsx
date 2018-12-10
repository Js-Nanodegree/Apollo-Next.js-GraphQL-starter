import React, { Fragment, PureComponent } from 'react';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

class RegisterContainer extends PureComponent {
  static propTypes = {};

  render() {
    const {
      handleChange,
      register,
      loading,
      firstName,
      lastName,
      password,
      passwordRepeat,
      error
    } = this.props;

    return (
      <Fragment>
        {error && JSON.stringify(error)}
        <div className="content-middle">
          <form
            className="form-wrapper"
            onSubmit={e => {
              e.preventDefault();
              return register();
            }}
          >
            <div className="form__inner">
              <h1>Complete your registration</h1>
              <TextField
                fullWidth
                onChange={handleChange}
                name="firstName"
                value={firstName}
                label="First name"
                autoComplete="first-name"
              />
              <br />
              <TextField
                fullWidth
                onChange={handleChange}
                name="lastName"
                value={lastName}
                label="Last name"
                autoComplete="last-name"
              />
              <br />
              <TextField
                fullWidth
                onChange={handleChange}
                name="password"
                value={password}
                label="Password"
                type="password"
                autoComplete="new-password"
              />
              <br />
              <TextField
                fullWidth
                error={
                  !!password && !!passwordRepeat && password !== passwordRepeat
                }
                onChange={handleChange}
                name="passwordRepeat"
                value={passwordRepeat}
                label="Repeat password"
                type="password"
                autoComplete="repeat-password"
              />
              <Button
                disabled={
                  !firstName ||
                  !lastName ||
                  !password ||
                  !passwordRepeat ||
                  !(password === passwordRepeat) ||
                  loading
                }
                type="submit"
              >
                SUBMIT
              </Button>
            </div>
          </form>
        </div>
        <style jsx>{`
          .content-middle {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .form-wrapper {
            width: 100%;
            max-width: 450px;
            margin: 0 auto;
          }
          .form__inner {
            padding: 1rem;
          }
        `}</style>
      </Fragment>
    );
  }
}

export default RegisterContainer;
