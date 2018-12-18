import React, { Fragment, PureComponent } from 'react';
import { bool, func, string } from 'prop-types';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

class SubscribeContainer extends PureComponent {
  static propTypes = {
    handleChange: func.isRequired,
    subscribe: func.isRequired,
    email: string.isRequired,
    loading: bool
  };

  render() {
    const {
      handleChange,
      subscribe,
      email,
      loading,
      error,
      called
    } = this.props;

    if (called && !error && !loading) {
      return <p>Called</p>;
    }
    return (
      <div className="fullHeight fullWidth  align-items__center align-content__center display__flex">
        {error && JSON.stringify(error)}
        <div className="margin__zero-auto">
          <Paper>
            <form
              className="form-wrapper"
              onSubmit={e => {
                e.preventDefault();
                return subscribe();
              }}
            >
              <div className="form__inner">
                <TextField
                  name="email"
                  value={email}
                  label="Email address"
                  onChange={handleChange}
                  disabled={loading}
                />

                <Button type="submit">
                  {loading ? <CircularProgress size={5} /> : 'SUBMIT'}
                </Button>
              </div>
            </form>
          </Paper>
        </div>
      </div>
    );
  }
}

export default SubscribeContainer;
