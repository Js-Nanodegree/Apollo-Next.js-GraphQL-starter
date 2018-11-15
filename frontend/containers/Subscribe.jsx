import React, { PureComponent, Fragment } from 'react'
import { func, string, bool } from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

class SubscribeContainer extends PureComponent {
  static propTypes = {
    handleChange: func.isRequired,
    subscribe: func.isRequired,
    email: string.isRequired,
    loading: bool
  }

  render() {
    const { handleChange, subscribe, email, loading, error, called } = this.props


    if (called && !error && !loading) {
      return <p>Called</p>
    }
    return (
      <Fragment>
        <p>Enter your email</p>
        {error && JSON.stringify(error)}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            return subscribe()
          }}
        >
          <TextField
            name='email'
            value={email}
            label='Email address'
            onChange={handleChange}
            disabled={loading}
          />

          <Button
            type='submit'
          >
            {loading ? <CircularProgress size={5} /> : 'SUBMIT'}
          </Button>
        </form>
      </Fragment>
    )
  }
}

export default SubscribeContainer