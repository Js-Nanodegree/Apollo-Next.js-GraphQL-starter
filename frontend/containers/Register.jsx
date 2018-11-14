// React PureComponent
// Created by TomNagle
// Date created: 28/09/2018
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

class RegisterContainer extends PureComponent {

  static propTypes = {}

  render () {
    const {handleChange, handleRegister, handleSubscribe, email, isSubmitting, message, query, firstName, lastName, password, passwordRepeat} = this.props

    if (message) {
      return <p>{message}</p>
    }

    if (query && query._id && query.token) {
      return <form>
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
          error={(!!password && !!passwordRepeat) && (password !== passwordRepeat)}
          onChange={handleChange}
          name="passwordRepeat"
          value={passwordRepeat}
          label="Repeat password"
          type="password"
          autoComplete="repeat-password"
        />
        <Button
          disabled={!firstName || !lastName || !password || !passwordRepeat || !(password === passwordRepeat)}
          onClick={handleRegister}
        >SUBMIT</Button>
      </form>
    }

    return (
      <Fragment>


        <TextField
          name="email"
          value={email}
          onChange={handleChange}
          disabled={isSubmitting}
        />

        <Button
          onClick={handleSubscribe}
        >
          {isSubmitting ? <CircularProgress size={5} /> : 'SUBMIT'}
        </Button>

      </Fragment>
    )
  }
}

export default RegisterContainer