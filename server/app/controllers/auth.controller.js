import crypto from 'crypto'
import nJwt from 'njwt'
import axios from 'axios'
import User from '../models/user.model'
import Subscribe from '../models/subscribe.model'
import { DEV_URL, PROD_URL } from '../config/settings'
import { IS_DEBUG, SESSION_DURATION } from '../config/env'
import { SIGNING_KEY } from '../config/secrets'

import { subscribeMailer } from '../mailers'

function generateToken (_, {_id}) {
  const claims = {
    iss: IS_DEBUG ? DEV_URL : PROD_URL,  // The URL of your service - update paths in ../config/settings
    sub: _id  // The UID of the user in your system - MongoDB _id
  }

  // This is our internal representation of the token, this is not what you'll send to your end user
  const jwt = nJwt.create(claims, SIGNING_KEY)
  jwt.setExpiration(new Date().getTime() + SESSION_DURATION)

  // Base64 URL encoded string that is safe to pass to the browser
  return jwt.compact()
}

function deactivateSubscribeToken (_, {email}) {
  return Subscribe.findOneAndUpdate({email}, {
    $set: {
      active: false
    }
  }).then(() => {
    return true
  }).catch((error) => {
    return error
  })
}

async function register (_, {subscribeToken, firstName, lastName, _id, password, passwordRepeat}, context) {
  if (password !== passwordRepeat) {
    return Error('Passwords do not match')
  }

  const subscription = await Subscribe.findById(_id)
    .then((data) => {
      return data
    }).catch((error) => {
      throw error
    })

  if (!subscription) {
    return Error('You don\'t exist.')
  }

  if (!subscription.active) {
    return Error('You have already registered. Please login.')
  }

  // Check the subscribeToken to make sure it is valid
  if (subscription.token !== subscribeToken) {
    return Error('Invalid token.')
  }

  // Make sure you already use create here so the password is hashed with Mongoose's pre save middleware
  return User.create({email: subscription.email, firstName, lastName, password})
    .then(async (user) => {
      const _id = user._id
      const token = await generateToken(null, {_id})

      // Change the active param to false on the subscribe token
      deactivateSubscribeToken(_, {email: user.email})

      // Set the token in a cookie
      context.res.cookie('token', token, {maxAge: 3.154e+10, httpOnly: true})

      return {token}
    }).catch((error) => {
      return error
    })
}

async function login (_, {email, password}, context) {
  const user = await User.findOne({email})
    .then((data) => {
      return data
    }).catch((error) => {
      throw error
    })

  // You can change the message to something more descriptive but you risk exposing emails
  if (!user) {
    return {message: 'Invalid mail or password.', valid: false}
  }

  const isMatch = await user.comparePassword(password)
    .then((data) => {
      return data
    }).catch((error) => {
      throw error
    })

  if (!isMatch) {
    return Error('Invalid email or password')
  }

  const token = await generateToken(_, {_id: user._id});

  context.res.cookie('token', token, {maxAge: SESSION_DURATION, httpOnly: true})

  return {token}
}

async function subscribe (_, {email}) {

  const subscriber = await Subscribe.findOne({email})
    .then((data) => {
      return data
    }).catch((error) => {
      throw error
    })

  if (subscriber) {
    return new Error('You have already subscribed. Please activate your account.')
  }

  const token = crypto.randomBytes(18).toString('hex')

  return Subscribe.create({email, token})
    .then((data) => {
      // Send a verification email to the user
      subscribeMailer({email, id: data._id, token})

      return {message: 'Successfully subscribed'}
    }).catch((error) => {
      return error
    })
}

export async function getGithubToken (githubCode) {
  const endpoint = 'https://github.com/login/oauth/access_token'

  const data = await axios.post(endpoint, {
    client_id: 'Iv1.d276ac6dd35b269e',
    client_secret: 'e32d9f6fff0aff198a2f2721ae1013e6a77528b1',
    code: githubCode,
  }).then((response) => {
    return response.data
  })

  if (data.error) {
    throw new Error(data.error)
  }

  return data.access_token
}

export async function getGithubUser (githubToken) {
  const endpoint = `https://api.github.com/user?access_token=${githubToken}`
  return await axios.get(endpoint)
    .then(response => {
      return response.data
    })
    .catch(error => {
      throw error
    })
}

async function gitHubAuth (_, {GitHubCode}, context) {
  console.log({GitHubCode})
  const githubToken = await getGithubToken(GitHubCode)
  console.log('githubToken', githubToken)
  if (!githubToken) {
    throw new Error('Could not get a the token from GitHub.')
  }

  const githubUser = await getGithubUser(githubToken)

  console.log({githubToken})

  console.log({githubUser})

  return {
    // token: jwt.sign({userId: user.id}, SIGNING_KEY),
    //   user
    token: 'token!',
    user: {
      _id: '123'
    }
  }
}

export default {
  register,
  subscribe,
  login,
  gitHubAuth
}
